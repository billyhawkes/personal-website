---
title: Rate Limiting
---

Rate limiting is a technique used to control the rate at which requests are made to a server. It is used to prevent abuse, overload, and to ensure fair usage of resources.

## Types

There are two main types of rate limiting:

#### Proxy Rate Limiting (Recommended)

General rate limiting often implemented by a proxy server, WAF, and/or CDN.

**Benefits**

-   Cost effective: doesn't call underlying functions (e.g. Lambda, Workers, VPS, etc.)
-   Easier to manage: no code needed

Examples: Cloudflare WAF, AWS WAF, etc.

#### Code Rate Limiting

Rate limiting specific an applications code.

Examples: Rate limiting based on the user or api key.
