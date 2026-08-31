import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

/**
 * Distributed Rate Limiter for Next.js App Router on Vercel Serverless.
 * 
 * ARCHITECTURE & CONCURRENCY MODEL:
 * 1. Primary Engine: Distributed Upstash Redis with sliding-window algorithms.
 *    Shared across all serverless isolates, edge regions, and container restarts.
 * 2. Fallback Engine: Hardened instance-local in-memory sliding-window limiter.
 *    Activated automatically if Redis is unavailable or credentials are not yet configured.
 * 3. Precedence & Fail-Safe:
 *    - Sensitive endpoints (contact, login, admin_write): Redis failure triggers local
 *      fallback throttling and emits structured security logs. Traffic is never unrestricted.
 *    - Telemetry (analytics): Throttled via Redis with local fallback.
 */

export type RateLimitPolicy = "contact" | "login" | "analytics" | "admin_write";

export interface RateLimitPolicyConfig {
  limit: number;
  windowMs: number;
  windowStr: `${number} ${"s" | "m" | "h" | "d"}`;
  prefix: string;
}

export const RATE_LIMIT_POLICIES: Record<RateLimitPolicy, RateLimitPolicyConfig> = {
  contact: {
    limit: 5,
    windowMs: 15 * 60 * 1000,
    windowStr: "15 m",
    prefix: "portfolio:ratelimit:contact",
  },
  login: {
    limit: 5,
    windowMs: 15 * 60 * 1000,
    windowStr: "15 m",
    prefix: "portfolio:ratelimit:login",
  },
  analytics: {
    limit: 60,
    windowMs: 60 * 1000,
    windowStr: "1 m",
    prefix: "portfolio:ratelimit:analytics",
  },
  admin_write: {
    limit: 60,
    windowMs: 60 * 1000,
    windowStr: "1 m",
    prefix: "portfolio:ratelimit:admin_write",
  },
};

export interface RateLimitResult {
  success: boolean;
  limited: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp in ms
  retryAfterSeconds: number;
  source: "upstash" | "fallback" | "dev_fallback";
}

// ==========================================
// 1. Client IP Resolution (Vercel-Compatible)
// ==========================================

/**
 * Extracts client IP address safely from proxy headers.
 * Respects trusted platform proxy precedence:
 * 1. x-real-ip (Injected/verified by Vercel edge proxy)
 * 2. x-vercel-forwarded-for (Vercel-specific forwarded chain)
 * 3. x-forwarded-for (First non-empty client IP in proxy chain)
 * 
 * Note: Application-level IP extraction relies on the hosting platform edge
 * stripping or sanitizing spoofed incoming client headers.
 */
export function getClientIp(request: Request): string {
  // 1. Real IP set by trusted edge proxy
  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp && xRealIp.trim()) {
    return xRealIp.trim();
  }

  // 2. Vercel Edge Forwarded-For
  const xVercelForwardedFor = request.headers.get("x-vercel-forwarded-for");
  if (xVercelForwardedFor && xVercelForwardedFor.trim()) {
    const firstVercelIp = xVercelForwardedFor.split(",")[0].trim();
    if (firstVercelIp) return firstVercelIp;
  }

  // 3. Standard Forwarded header (take first non-empty client IP)
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor && xForwardedFor.trim()) {
    const firstIp = xForwardedFor.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  return "127.0.0.1";
}

// ==========================================
// 2. Upstash Redis & RateLimiter Singletons
// ==========================================

let redisInstance: Redis | null = null;
let isRedisConfigured = false;
let hasLoggedMissingConfig = false;

const ratelimitInstances = new Map<RateLimitPolicy, Ratelimit>();

function getRedisClient(): Redis | null {
  if (redisInstance) return redisInstance;

  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (url && token && !url.includes("[SENSITIVE]") && !token.includes("[SENSITIVE]")) {
    try {
      redisInstance = new Redis({
        url,
        token,
      });
      isRedisConfigured = true;
      return redisInstance;
    } catch (err: any) {
      console.error("[Security:RateLimit] Failed to initialize Upstash Redis client:", err?.message || err);
      return null;
    }
  }

  if (!hasLoggedMissingConfig) {
    hasLoggedMissingConfig = true;
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[Security:RateLimit] WARNING: UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN missing in production environment. " +
        "Operating in degraded security mode using hardened local in-memory rate limiting fallback."
      );
    }
  }

  return null;
}

function getRatelimit(policy: RateLimitPolicy): Ratelimit | null {
  if (ratelimitInstances.has(policy)) {
    return ratelimitInstances.get(policy)!;
  }

  const redis = getRedisClient();
  if (!redis) return null;

  const config = RATE_LIMIT_POLICIES[policy];
  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(config.limit, config.windowStr),
    prefix: config.prefix,
    analytics: false,
  });

  ratelimitInstances.set(policy, ratelimit);
  return ratelimit;
}

// ==========================================
// 3. Hardened Local In-Memory Fallback
// ==========================================

interface LocalRateLimitEntry {
  count: number;
  resetAt: number;
}

const localRateLimitMap = new Map<string, LocalRateLimitEntry>();
const MAX_LOCAL_ENTRIES = 5000;

// Periodic cleanup of expired entries
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of localRateLimitMap.entries()) {
      if (now > entry.resetAt) {
        localRateLimitMap.delete(key);
      }
    }
  }, 3 * 60 * 1000);
}

function checkLocalFallback(policy: RateLimitPolicy, identifier: string): RateLimitResult {
  const config = RATE_LIMIT_POLICIES[policy];
  const key = `${config.prefix}:${identifier}`;
  const now = Date.now();

  // Guard against memory exhaustion
  if (localRateLimitMap.size >= MAX_LOCAL_ENTRIES && !localRateLimitMap.has(key)) {
    // Purge earliest entries
    const keysToDelete = Array.from(localRateLimitMap.keys()).slice(0, 500);
    for (const k of keysToDelete) {
      localRateLimitMap.delete(k);
    }
  }

  const entry = localRateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + config.windowMs;
    localRateLimitMap.set(key, {
      count: 1,
      resetAt,
    });
    return {
      success: true,
      limited: false,
      limit: config.limit,
      remaining: config.limit - 1,
      reset: resetAt,
      retryAfterSeconds: Math.ceil(config.windowMs / 1000),
      source: process.env.NODE_ENV === "production" ? "fallback" : "dev_fallback",
    };
  }

  if (entry.count >= config.limit) {
    const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return {
      success: false,
      limited: true,
      limit: config.limit,
      remaining: 0,
      reset: entry.resetAt,
      retryAfterSeconds,
      source: process.env.NODE_ENV === "production" ? "fallback" : "dev_fallback",
    };
  }

  entry.count += 1;
  const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
  return {
    success: true,
    limited: false,
    limit: config.limit,
    remaining: config.limit - entry.count,
    reset: entry.resetAt,
    retryAfterSeconds,
    source: process.env.NODE_ENV === "production" ? "fallback" : "dev_fallback",
  };
}

// ==========================================
// 4. Primary Distributed Rate Limit Check
// ==========================================

/**
 * Checks if a request exceeds the specified policy limit.
 * Uses Upstash Redis when configured; safely degrades to local in-memory fallback if Redis fails or is unconfigured.
 * 
 * @param requestOrIdentifier Incoming HTTP Request or string identifier
 * @param policy One of the predefined RateLimitPolicy namespaces ("contact" | "login" | "analytics" | "admin_write")
 * @param customIdentifier Optional custom identifier (e.g. user ID / compound key). Defaults to client IP.
 */
export async function checkRateLimit(
  requestOrIdentifier: Request | string,
  policy: RateLimitPolicy,
  customIdentifier?: string
): Promise<RateLimitResult> {
  const identifier =
    customIdentifier ||
    (typeof requestOrIdentifier === "string"
      ? requestOrIdentifier
      : getClientIp(requestOrIdentifier));

  const ratelimiter = getRatelimit(policy);

  if (ratelimiter) {
    try {
      const response = await ratelimiter.limit(identifier);

      const retryAfterSeconds = Math.max(1, Math.ceil((response.reset - Date.now()) / 1000));

      if (!response.success) {
        console.warn(
          `[Security:RateLimit] Rate limit exceeded on policy='${policy}' for identifier='${identifier.slice(0, 16)}...' (Distributed Upstash)`
        );
      }

      return {
        success: response.success,
        limited: !response.success,
        limit: response.limit,
        remaining: response.remaining,
        reset: response.reset,
        retryAfterSeconds,
        source: "upstash",
      };
    } catch (redisError: any) {
      console.error(
        `[Security:RateLimit] Upstash Redis rate limit check failed for policy='${policy}'. Falling back to local in-memory limiter. Reason:`,
        redisError?.message || "Unknown Redis error"
      );
      // Fall through to local fallback
    }
  }

  // Fallback limiter (ensures no unthrottled bypass when Redis is unreachable or unconfigured)
  const fallbackResult = checkLocalFallback(policy, identifier);

  if (fallbackResult.limited) {
    console.warn(
      `[Security:RateLimit] Rate limit exceeded on policy='${policy}' for identifier='${identifier.slice(0, 16)}...' (Local Fallback)`
    );
  }

  return fallbackResult;
}

/**
 * Returns standard rate-limit headers for HTTP responses.
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.reset),
  };

  if (result.limited) {
    headers["Retry-After"] = String(result.retryAfterSeconds);
  }

  return headers;
}
