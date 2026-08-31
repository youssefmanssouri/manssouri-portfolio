/**
 * Instance-local in-memory rate limiter for Next.js App Router.
 * 
 * ARCHITECTURAL SCOPE & LIMITATIONS:
 * 1. Scope: Stores counters in process memory (Map<string, RateLimitEntry>).
 * 2. Serverless Concurrency: On Vercel, each serverless container / edge isolate
 *    maintains an independent memory map. Under horizontal traffic scaling or across
 *    multiple edge regions, limits apply per runtime isolate.
 * 3. Purpose: Serves as lightweight, low-latency defense against single-instance
 *    bursts, script loops, and automated spambots without requiring external network calls.
 * 4. Global Protection: For globally distributed DDoS rate limiting, platform-level
 *    WAF / Vercel Edge Firewall or an external distributed data store (e.g. Upstash Redis)
 *    is required.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Cleanup expired entries periodically to prevent memory leaks in long-lived instances
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
 * Extracts client IP address safely from proxy headers.
 * Prioritizes headers injected/overwritten by trusted edge infrastructure (Vercel edge proxy).
 */
export function getClientIp(request: Request): string {
  // 1. Real IP header set by Vercel edge proxy
  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp && xRealIp.trim()) {
    return xRealIp.trim();
  }

  // 2. Vercel edge forwarded-for header
  const xVercelForwardedFor = request.headers.get("x-vercel-forwarded-for");
  if (xVercelForwardedFor && xVercelForwardedFor.trim()) {
    return xVercelForwardedFor.split(",")[0].trim();
  }

  // 3. Standard Forwarded header (take first non-empty client IP)
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor && xForwardedFor.trim()) {
    const firstIp = xForwardedFor.split(",")[0].trim();
    if (firstIp) return firstIp;
  }

  return "127.0.0.1";
}

/**
 * Checks if an incoming request exceeds the specified rate limit.
 * 
 * @param request The incoming HTTP Request
 * @param prefix Identifier namespace for the endpoint (e.g., "auth_login", "contact")
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
