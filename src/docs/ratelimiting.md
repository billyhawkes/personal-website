---
title: Rate Limiting
guides:
    - ratelimiting-tss-sst
---

Rate limiting is a technique used to control the rate at which requests are made to a server. It is used to prevent abuse, overload, and to ensure fair usage of resources.

## Types

There are two main types of rate limiting:

### 1. Proxy Rate Limiting (Recommended)

General rate limiting often implemented by a proxy server, WAF, and/or CDN. The main benefit is the price reduction and ease of setup. It costs less as it will not call underlying functions (e.g. Lambda, Workers, VPS, etc.), that is why it is recommended over code rate limiting as a basis for rate limiting.

**Examples:**

-   Cloudflare WAF
-   AWS WAF

### 2. Application Rate Limiting

Rate limiting specific to an applications code. This is more flexible and allows for more control but is more difficult to setup and manage. It usually requires a redis database to store and retrieve rate limiting data.

Some common use cases are limiting an API key or user based on usage and limiting expensive functions separately.

> **Warning**: This method does not prevent ddos attacks as the function still has to run in order to block requests

**Examples:**

-   Limiting API Key to 100 requests a minute
-   Only allowing 1 expensive computation every 10 seconds
