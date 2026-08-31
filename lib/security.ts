/**
 * Security helpers for Origin/Referer validation and input sanitization.
 */

const STATIC_ALLOWED_HOSTS = new Set([
  "youssefmanssouri.site",
  "www.youssefmanssouri.site",
  "localhost:3000",
  "127.0.0.1:3000",
]);

function getAllowedHosts(): Set<string> {
  const hosts = new Set(STATIC_ALLOWED_HOSTS);
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      const parsed = new URL(process.env.NEXT_PUBLIC_SITE_URL);
      if (parsed.host) hosts.add(parsed.host);
    } catch {
      // Ignore malformed URL env
    }
  }
  return hosts;
}

/**
 * Validates that state-changing requests (POST, PUT, PATCH, DELETE) originate
 * from the trusted domain or approved preview deployments (CSRF defense-in-depth).
 */
export function validateOrigin(request: Request): boolean {
  // In non-production development, allow local requests
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const allowedHosts = getAllowedHosts();

  // 1. Check Origin header first if present (standard on browser fetch/XHR mutations)
  if (origin) {
    try {
      const url = new URL(origin);
      if (allowedHosts.has(url.host)) return true;
      if (url.host.endsWith(".vercel.app")) return true;
      return false;
    } catch {
      return false;
    }
  }

  // 2. Check Referer header if Origin is not sent
  if (referer) {
    try {
      const url = new URL(referer);
      if (allowedHosts.has(url.host)) return true;
      if (url.host.endsWith(".vercel.app")) return true;
      return false;
    } catch {
      return false;
    }
  }

  // 3. Fallback: If neither Origin nor Referer is present (e.g. non-browser direct clients, curls),
  // allow request to proceed to downstream authentication and payload validation
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
