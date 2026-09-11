import { env } from "@/lib/env";

export interface NtfyInquiryData {
  name: string;
  projectType: string;
  budgetRange?: string | null;
  message: string;
  submittedAt?: Date;
}

export interface NtfyResult {
  sent: boolean;
  skipped?: boolean;
  error?: string;
}

/**
 * Dispatches an instant, privacy-conscious push notification via ntfy HTTP publishing API.
 * 
 * Data minimization:
 * - Sends ONLY: Client name, project category, budget range (if provided), and preview message.
 * - NEVER sends: Email address, phone number, company name, database IDs, IP address, cookies, or secrets.
 * - Truncates excessively long messages to prevent oversized push payloads.
 * 
 * Resilience & isolation:
 * - Fully isolated: Network, HTTP, or timeout errors NEVER throw.
 * - Guarded by a 5-second AbortSignal timeout.
 * - Never leaks topic names, auth tokens, or internal error traces to visitors or logs.
 */
export async function sendNtfyNotification(
  data: NtfyInquiryData
): Promise<NtfyResult> {
  if (!env.ntfyEnabled) {
    return { sent: false, skipped: true };
  }

  const topic = env.ntfyTopic;
  if (!topic) {
    console.warn("[ntfy] NTFY_ENABLED is true, but NTFY_TOPIC is not configured.");
    return { sent: false, error: "NTFY_TOPIC not configured" };
  }

  const serverUrl = (env.ntfyServerUrl || "https://ntfy.sh").replace(/\/+$/, "");
  const endpoint = `${serverUrl}/${encodeURIComponent(topic)}`;

  // Sanitize fields to prevent header injection or formatting issues
  const cleanName = data.name.replace(/[\r\n\t]/g, " ").trim();
  const cleanProjectType = data.projectType.replace(/[\r\n\t]/g, " ").trim();
  const cleanBudget = data.budgetRange?.replace(/[\r\n\t]/g, " ").trim();

  // Truncate long messages safely for notification preview (max 400 chars)
  const rawMessage = data.message.trim();
  const messagePreview =
    rawMessage.length > 400 ? `${rawMessage.slice(0, 397)}...` : rawMessage;

  // Build concise push body
  const lines: string[] = [
    `New Project Inquiry`,
    ``,
    `Name: ${cleanName}`,
    `Project: ${cleanProjectType}`,
  ];

  if (cleanBudget) {
    lines.push(`Budget: ${cleanBudget}`);
  }

  lines.push(``);
  lines.push(messagePreview);

  const body = lines.join("\n");

  // Determine click URL for authenticated admin inspection
  const baseUrl = env.siteUrl || (env.isProduction ? "https://www.youssefmanssouri.site" : "http://localhost:3000");
  const clickUrl = `${baseUrl.replace(/\/+$/, "")}/admin/messages`;

  const headers: Record<string, string> = {
    "Title": `New Project Inquiry: ${cleanName}`,
    "Priority": "high",
    "Tags": "briefcase,incoming_envelope",
    "Click": clickUrl,
    "Content-Type": "text/plain; charset=utf-8",
  };

  if (env.ntfyToken) {
    headers["Authorization"] = `Bearer ${env.ntfyToken}`;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body,
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`[ntfy Error] Server responded with HTTP status ${response.status}`);
      return { sent: false, error: `HTTP ${response.status}` };
    }

    console.log("[ntfy Success] Push notification sent successfully");
    return { sent: true };
  } catch (err: any) {
    if (err?.name === "TimeoutError" || err?.name === "AbortError") {
      console.error("[ntfy Error] Push notification request timed out after 5 seconds");
      return { sent: false, error: "Timeout after 5s" };
    }
    console.error("[ntfy Error] Failed to publish push notification:", err?.message || "Network exception");
    return { sent: false, error: err?.message || "Network exception" };
  }
}
