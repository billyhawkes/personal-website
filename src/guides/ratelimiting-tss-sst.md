---
title: Rate Limiting Setup
stack:
    - Tanstack Start
    - AWS ElastiCache
    - SST
docs:
    - ratelimiting
---

This guide covers how you setup ratelimiting using SST, AWS ElastiCache and Tanstack Start.

### Step 1: Setup Redis

First you have to setup a redis (or valkey) cache. This cache will allow us to quickly store and retrieve the count of requests in a specified window (ex. 10 seconds). This can be setup on a service like Upstash, AWS ElastiCache, Cloudflare KV, etc.

```ts
// sst.config.ts

new sst.aws.Redis("Redis", { vpc, engine: "valkey" });

// redis.ts
import { Cluster } from "ioredis";
import { Resource } from "sst";

export const redis = new Cluster(
	[
		{
			host: Resource.Redis.host,
			port: Resource.Redis.port,
		},
	],
	{
		redisOptions: {
			tls: { checkServerIdentity: () => undefined },
			username: Resource.Redis.username,
			password: Resource.Redis.password,
			keyPrefix: `${process.env.TENANT_STAGE_NAME}:`,
		},
	}
);
```

### Step 2: Setup Rate Limiter

Next we can setup the rate limiter as a simple function that takes a key, limit and window. This can also be done using @upstash/ratelimit but it is simple enough that it is not needed.

```ts
// ratelimit.ts
const rateLimitByKey = async (
	key: string,
	{ limit, window }: { limit: number; window: number }
) => {
	// Get count result
	const result = await redis.get(key);

	// If no result create a new key value pair with the window expiration.
	if (result === null) {
		await redis.setex(key, window, 0);
	}

	// Increment the count
	const count = await redis.incr(key);
	// If count is over the limit return an error
	if (count > limit) {
		throw new Error("Too many requests");
	}

	// Optional: return helpful headers for limit
	const time = await redis.ttl(key);

	setResponseHeader("X-RateLimit-Remaining", limit - count);
	setResponseHeader("X-RateLimit-Limit", limit);
	setResponseHeader("X-RateLimit-Reset", time);
};
```

### Step 3: Use Rate Limiter In Middleware

Next, to apply this ratelimit you can add it to middleware (recommended) or directly inside an API call. If you have a user you can use the user ID as the key, if not you can use the IP address. User ID is the preferred method as it prevents abusing the limit on multiple devices with different IP addresses.

```ts
// middleware.ts
export const rateLimitMiddleware = (
	key: string,
	{ limit, window }: { limit: number; window: number }
) => {
	return (
		createMiddleware()
			// Use an auth middleware to get the user
			.middleware([authMiddleware])
			.server(async ({ next, context }) => {
				// If there is a user, authenticate based on user, if not use IP
				if (context.user) {
					await rateLimitByKey(`${key}:${context.user.id}`, { limit, window });
				} else {
					const ip = getRequestIP();

					if (!ip) {
						throw new Error("IP not found");
					}

					await rateLimitByKey(`${key}:${ip}`, { limit, window });
				}

				return next();
			})
	);
};
```

Now you can use this as a global middleware or specifically for seperate actions.

```ts
// Applies to every action
registerGlobalMiddleware({
	middleware: [rateLimitMiddleware("global", { limit: 100, window: 60 })],
});

// Or for specific server function
const customFn = createServerFn({ method: "POST" }).middleware([
	rateLimitMiddleware("custom", { limit: 100, window: 60 }),
]);
```
