import { env } from "@/lib/env";

/**
 * Security helpers for Origin/Referer CSRF validation and input payload guards.
 */

const PRODUCTION_ALLOWED_HOSTS = new Set([
  "youssefmanssouri.site",
  "www.youssefmanssouri.site",
]);

const DEVELOPMENT_ALLOWED_HOSTS = new Set([
  "localhost:3000",
  "127.0.0.1:3000",
  "localhost",
  "127.0.0.1",
]);

function getTrustedHosts(): Set<string> {
  const hosts = new Set<string>();

  if (env.isProduction) {
    for (const h of PRODUCTION_ALLOWED_HOSTS) {
      hosts.add(h);
    }
  } else {
    for (const h of DEVELOPMENT_ALLOWED_HOSTS) {
      hosts.add(h);
    }
    for (const h of PRODUCTION_ALLOWED_HOSTS) {
      hosts.add(h);
    }
  }

  // Add explicit configured public site URL if present
  if (env.siteUrl) {
    try {
      const parsed = new URL(env.siteUrl.startsWith("http") ? env.siteUrl : `https://${env.siteUrl}`);
      if (parsed.host) hosts.add(parsed.host);
    } catch {
      // Ignore malformed URL
    }
  }

  // Add exact Vercel deployment URL if present (set by Vercel environment)
  if (env.vercelUrl) {
    try {
      const cleanVercelUrl = env.vercelUrl.replace(/^https?:\/\//, "");
      if (cleanVercelUrl) hosts.add(cleanVercelUrl);
    } catch {
      // Ignore malformed URL
    }
  }

  return hosts;
}

/**
 * Validates that state-changing requests (POST, PUT, PATCH, DELETE) originate
 * from trusted production domains or exact Vercel deployment host (strict CSRF defense).
 */
export function validateOrigin(request: Request): boolean {
  // In development, allow local requests
  if (!env.isProduction) {
    return true;
  }

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const trustedHosts = getTrustedHosts();

  // 1. Validate Origin header if present
  if (origin) {
    try {
      const url = new URL(origin);
      // Require https in production
      if (url.protocol !== "https:") return false;
      return trustedHosts.has(url.host);
    } catch {
      return false;
    }
  }

  // 2. Fall back to Referer header if Origin is not sent
  if (referer) {
    try {
      const url = new URL(referer);
      // Require https in production
      if (url.protocol !== "https:") return false;
      return trustedHosts.has(url.host);
    } catch {
      return false;
    }
  }

  // 3. Direct non-browser clients (e.g. curl / automated health checks)
  // Proceed to downstream authentication and payload validation
  return true;
}

/**
 * Checks if request Content-Length exceeds the maximum allowed bytes.
 */
export function isOversized(request: Request, maxBytes: number = 65536): boolean {
  const contentLength = request.headers.get("content-length");
  if (contentLength) {
    const bytes = parseInt(contentLength, 10);
    if (!isNaN(bytes) && bytes > maxBytes) {
      return true;
    }
  }
  return false;
}
