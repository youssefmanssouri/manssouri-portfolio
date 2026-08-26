/**
 * Lightweight in-memory rate limiter for Next.js App Router / Vercel Serverless.
 * No external dependencies, no database persistence, zero raw IP storage.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Cleanup expired entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap.entries()) {
      if (now > entry.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Extracts client IP address from proxy headers (x-forwarded-for, x-real-ip) safely.
 */
export function getClientIp(request: Request): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const firstIp = xForwardedFor.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp && xRealIp.trim()) {
    return xRealIp.trim();
  }

  return "127.0.0.1";
}

/**
 * Checks if an incoming request exceeds the specified rate limit.
 * 
 * @param request The incoming HTTP Request
 * @param prefix Identifier namespace for the endpoint (e.g., "login", "contact")
 * @param limit Maximum number of allowed requests per window
 * @param windowMs Time window in milliseconds (default: 15 minutes)
 */
export function checkRateLimit(
  request: Request,
  prefix: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000
): { limited: boolean; retryAfterSeconds: number; remaining: number } {
  const ip = getClientIp(request);
  const key = `${prefix}:${ip}`;
  const now = Date.now();

  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      limited: false,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
      remaining: limit - 1,
    };
  }

  if (entry.count >= limit) {
    const retryAfterSeconds = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));
    return {
      limited: true,
      retryAfterSeconds,
      remaining: 0,
    };
  }

  entry.count += 1;
  return {
    limited: false,
    retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    remaining: limit - entry.count,
  };
}
