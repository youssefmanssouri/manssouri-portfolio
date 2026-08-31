import { Resend } from "resend";
import nodemailer from "nodemailer";

export interface ContactNotificationData {
  id?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  budgetRange?: string;
  message: string;
  language?: string;
  submittedAt: Date;
}

export interface NotificationResult {
  delivered: boolean;
  provider?: "resend" | "smtp" | "webhook";
  providerId?: string;
  error?: string;
}

/**
 * Dispatches a notification for a new contact form inquiry.
 * Tries configured channels in order of priority:
 * 1. Resend API (if RESEND_API_KEY is provided)
 * 2. SMTP Transport (if SMTP credentials are provided)
 * 3. Webhook (if CONTACT_WEBHOOK_URL is provided)
 */
export async function sendContactNotificationEmail(
  data: ContactNotificationData
): Promise<NotificationResult> {
  const contactDestination = (process.env.CONTACT_EMAIL || "manssouriyoussef33@gmail.com").trim();
  const subject = `[Portfolio Inquiry] ${data.name} — ${data.projectType}`;
  const dateFormatted = data.submittedAt.toLocaleString("en-US", {
    timeZone: "Africa/Casablanca",
    dateStyle: "full",
    timeStyle: "short",
  });

  const textBody = `
NEW INQUIRY — YOUSSEF MANSSOURI PORTFOLIO
==================================================
Date & Time:  ${dateFormatted} (Morocco Time)
Inquiry ID:   ${data.id || "N/A"}
Language:     ${data.language?.toUpperCase() || "EN"}

CONTACT DETAILS:
- Name:         ${data.name}
- Email:        ${data.email}
- Company:      ${data.company || "Not specified"}
- Phone:        ${data.phone || "Not specified"}

PROJECT SCOPE:
- Category:     ${data.projectType}
- Budget Range: ${data.budgetRange || "Not specified"}

MESSAGE / PROJECT DETAILS:
--------------------------------------------------
${data.message}
--------------------------------------------------
Reply directly to this email to reach: ${data.email}
==================================================
`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #242222; background-color: #F3EFEA; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #FAF7F2; border: 1px solid #DED6CC; border-radius: 4px; overflow: hidden; }
    .header { background: #3A171C; color: #F3EFEA; padding: 24px; text-align: left; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #F3EFEA; }
    .header p { margin: 0; font-size: 12px; color: #DED6CC; font-family: monospace; }
    .content { padding: 24px; }
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; padding: 16px; background: #F3EFEA; border: 1px solid #DED6CC; border-radius: 4px; }
    .meta-item { font-size: 12px; }
    .meta-label { color: #A65F4B; font-weight: 600; text-transform: uppercase; font-size: 10px; font-family: monospace; margin-bottom: 2px; }
    .meta-value { color: #242222; font-weight: 600; }
    .message-box { background: #FFFFFF; border-left: 3px solid #A65F4B; border-top: 1px solid #DED6CC; border-right: 1px solid #DED6CC; border-bottom: 1px solid #DED6CC; padding: 18px; border-radius: 0 4px 4px 0; margin-top: 16px; }
    .message-title { font-size: 11px; font-weight: 700; color: #A65F4B; text-transform: uppercase; letter-spacing: 0.05em; font-family: monospace; margin-bottom: 8px; }
    .message-content { white-space: pre-wrap; font-size: 14px; color: #242222; margin: 0; }
    .footer { padding: 16px 24px; background: #EBE4DA; border-top: 1px solid #DED6CC; font-size: 11px; color: #666; font-family: monospace; }
    .button { display: inline-block; background: #3A171C; color: #F3EFEA !important; text-decoration: none; padding: 10px 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-radius: 2px; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Portfolio Inquiry</h1>
      <p>Source: youssefmanssouri.site · ${dateFormatted}</p>
    </div>
    <div class="content">
      <div class="meta-grid">
        <div class="meta-item">
          <div class="meta-label">Client Name</div>
          <div class="meta-value">${escapeHtml(data.name)}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Email Address</div>
          <div class="meta-value"><a href="mailto:${escapeHtml(data.email)}" style="color:#A65F4B;">${escapeHtml(data.email)}</a></div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Project Category</div>
          <div class="meta-value">${escapeHtml(data.projectType)}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Company / Org</div>
          <div class="meta-value">${escapeHtml(data.company || "N/A")}</div>
        </div>
      </div>

      <div class="message-box">
        <div class="message-title">Message / Project Details</div>
        <p class="message-content">${escapeHtml(data.message)}</p>
      </div>

      <div style="text-align: center; margin-top: 20px;">
        <a href="mailto:${escapeHtml(data.email)}?subject=Re:%20Inquiry%20from%20Youssef%20Manssouri%20Portfolio" class="button">
          Reply to ${escapeHtml(data.name)} &rarr;
        </a>
      </div>
    </div>
    <div class="footer">
      Inquiry ID: ${data.id || "N/A"} · Language: ${data.language?.toUpperCase() || "EN"} · Submission confirmed
    </div>
  </div>
</body>
</html>
`;

  // 1. Attempt Resend API
  const rawResendKey = process.env.RESEND_API_KEY;
  const resendApiKey =
    rawResendKey && rawResendKey.trim() !== "" && !rawResendKey.includes("[SENSITIVE]")
      ? rawResendKey.trim()
      : null;

  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const emailFrom = process.env.EMAIL_FROM || "Portfolio Contact <onboarding@resend.dev>";

      const emailResult = await resend.emails.send({
        from: emailFrom,
        to: [contactDestination],
        replyTo: data.email,
        subject,
        text: textBody,
        html: htmlBody,
      });

      if (emailResult.error) {
        console.error("[Email:Resend API Error]", emailResult.error);
      } else if (emailResult.data?.id) {
        console.log(`[Email:Resend Success] Sent to ${contactDestination} (ID: ${emailResult.data.id})`);
        return {
          delivered: true,
          provider: "resend",
          providerId: emailResult.data.id,
        };
      }
    } catch (err: any) {
      console.error("[Email:Resend Exception]", err?.message || err);
    }
  }

  // 2. Attempt SMTP Transport (e.g. Gmail / Brevo / Custom SMTP)
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if ((smtpHost || smtpUser) && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: (process.env.SMTP_SECURE || "true") === "true",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const info = await transporter.sendMail({
        from: `"${data.name} via Portfolio" <${smtpUser}>`,
        to: contactDestination,
        replyTo: data.email,
        subject,
        text: textBody,
        html: htmlBody,
      });

      if (info.messageId) {
        console.log(`[Email:SMTP Success] Sent to ${contactDestination} (ID: ${info.messageId})`);
        return {
          delivered: true,
          provider: "smtp",
          providerId: info.messageId,
        };
      }
    } catch (err: any) {
      console.error("[Email:SMTP Exception]", err?.message || err);
    }
  }

  // 3. Attempt Webhook Notification (e.g. Discord / Telegram / Custom endpoint)
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl && webhookUrl.startsWith("http")) {
    try {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `📬 **New Portfolio Inquiry from ${data.name}**\n**Email:** ${data.email}\n**Category:** ${data.projectType}\n**Message:**\n${data.message}`,
          embeds: [
            {
              title: `New Inquiry: ${data.projectType}`,
              description: data.message,
              color: 0x3A171C,
              fields: [
                { name: "Name", value: data.name, inline: true },
                { name: "Email", value: data.email, inline: true },
                { name: "Company", value: data.company || "N/A", inline: true },
                { name: "Date", value: dateFormatted, inline: false },
              ],
            },
          ],
        }),
      });

      if (webhookRes.ok) {
        console.log(`[Email:Webhook Success] Delivered notification to webhook`);
        return {
          delivered: true,
          provider: "webhook",
        };
      }
    } catch (err: any) {
      console.error("[Email:Webhook Exception]", err?.message || err);
    }
  }

  // Fallback log for local development/diagnosis
  console.warn(
    `[Email Warning] No external notification provider succeeded. Configure RESEND_API_KEY, SMTP credentials, or CONTACT_WEBHOOK_URL for automatic email alerts.\n${textBody}`
  );

  return {
    delivered: false,
    error: "No active notification provider succeeded.",
  };
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
