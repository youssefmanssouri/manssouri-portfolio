/**
 * Security helpers for Origin/Referer validation and input sanitization.
 */

const ALLOWED_HOSTS = new Set([
  "youssefmanssouri.site",
  "www.youssefmanssouri.site",
  "localhost:3000",
  "127.0.0.1:3000",
]);

/**
 * Validates that state-changing requests (POST, PUT, PATCH, DELETE) originate
 * from the trusted domain or approved preview deployments (CSRF defense-in-depth).
 */
export function validateOrigin(request: Request): boolean {
  // In development, allow localhost
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // Check Origin header first if present
  if (origin) {
    try {
      const url = new URL(origin);
      if (ALLOWED_HOSTS.has(url.host)) return true;
      if (url.host.endsWith(".vercel.app")) return true;
      return false;
    } catch {
      return false;
    }
  }

  // Check Referer header if Origin is not sent
  if (referer) {
    try {
      const url = new URL(referer);
      if (ALLOWED_HOSTS.has(url.host)) return true;
      if (url.host.endsWith(".vercel.app")) return true;
      return false;
    } catch {
      return false;
    }
  }

  // Non-browser or direct API clients (e.g. CLI tests) without Origin/Referer
  // rely on token/header authentication
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
