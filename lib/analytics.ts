/**
 * Client-side non-blocking analytics helper.
 * Asynchronously posts conversion events to /api/analytics/track.
 * Uses navigator.sendBeacon when available with keepalive fetch fallback.
 * Guarantees zero delay or blocking on user actions, navigation, downloads, or external links.
 */
export function trackEvent(
  event: string,
  meta?: Record<string, any> | string,
  path?: string
) {
  if (typeof window === "undefined") return;

  const currentPath = path || window.location.pathname;
  const payload = JSON.stringify({
    event,
    path: currentPath,
    meta: meta ? (typeof meta === "string" ? meta : JSON.stringify(meta)) : undefined,
  });

  try {
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([payload], { type: "application/json" });
      const sent = navigator.sendBeacon("/api/analytics/track", blob);
      if (sent) return;
    }
  } catch {
    // Ignore error and fall through to fetch
  }

  // Non-blocking fire-and-forget fetch fallback
  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Fail quietly without interrupting user interaction
  });
}
