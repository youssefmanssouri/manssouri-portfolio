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

function sanitizeHeader(str: string): string {
  return str.replace(/[\r\n\t]/g, " ").trim();
}

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Dispatches an email/webhook notification for a new contact form inquiry.
 * Tries configured channels in order:
 * 1. Resend API (if RESEND_API_KEY is configured)
 * 2. SMTP Transport (if SMTP credentials are configured)
 * 3. Webhook (if CONTACT_WEBHOOK_URL is configured)
 */
export async function sendContactNotificationEmail(
  data: ContactNotificationData
): Promise<NotificationResult> {
  const contactDestination = sanitizeHeader(
    process.env.CONTACT_EMAIL || "manssouriyoussef33@gmail.com"
  );
  const safeName = sanitizeHeader(data.name);
  const safeProjectType = sanitizeHeader(data.projectType);
  const safeEmail = sanitizeHeader(data.email);

  const subject = `[Portfolio Inquiry] ${safeName} — ${safeProjectType}`;
  const dateFormatted = data.submittedAt.toLocaleString("en-US", {
    timeZone: "Africa/Casablanca",
    dateStyle: "full",
    timeStyle: "short",
  });

  const textBody = `
NEW INQUIRY — YOUSSEF MANSSOURI PORTFOLIO
==================================================
Date & Time:  ${dateFormatted} (Morocco Time)
Message ID:   ${data.id || "N/A"}
Language:     ${data.language?.toUpperCase() || "EN"}

CONTACT DETAILS:
- Name:         ${safeName}
- Email:        ${safeEmail}
- Company:      ${data.company ? sanitizeHeader(data.company) : "Not specified"}
- Phone:        ${data.phone ? sanitizeHeader(data.phone) : "Not specified"}

PROJECT SCOPE:
- Category:     ${safeProjectType}
- Budget Range: ${data.budgetRange ? sanitizeHeader(data.budgetRange) : "Not specified"}

MESSAGE / PROJECT DETAILS:
--------------------------------------------------
${data.message}
--------------------------------------------------
Reply directly to this email to reach: ${safeEmail}
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
          <div class="meta-value">${escapeHtml(safeName)}</div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Email Address</div>
          <div class="meta-value"><a href="mailto:${escapeHtml(safeEmail)}" style="color:#A65F4B;">${escapeHtml(safeEmail)}</a></div>
        </div>
        <div class="meta-item">
          <div class="meta-label">Project Category</div>
          <div class="meta-value">${escapeHtml(safeProjectType)}</div>
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
        <a href="mailto:${escapeHtml(safeEmail)}?subject=Re:%20Inquiry%20from%20Youssef%20Manssouri%20Portfolio" class="button">
          Reply to ${escapeHtml(safeName)} &rarr;
        </a>
      </div>
    </div>
    <div class="footer">
      Message ID: ${escapeHtml(data.id || "N/A")} · Language: ${data.language?.toUpperCase() || "EN"} · Direct Verified Submission
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
      const emailFrom = sanitizeHeader(
        process.env.EMAIL_FROM || "Portfolio Contact <onboarding@resend.dev>"
      );

      const emailResult = await resend.emails.send({
        from: emailFrom,
        to: [contactDestination],
        replyTo: safeEmail,
        subject,
        text: textBody,
        html: htmlBody,
      });

      if (emailResult.error) {
        console.error("[Email:Resend API Error]", emailResult.error.message || emailResult.error);
      } else if (emailResult.data?.id) {
        console.log(`[Email:Resend Success] Delivered to ${contactDestination} (ID: ${emailResult.data.id})`);
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

  // 2. Attempt SMTP Transport (Nodemailer)
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
        from: `"${safeName} via Portfolio" <${smtpUser}>`,
        to: contactDestination,
        replyTo: safeEmail,
        subject,
        text: textBody,
        html: htmlBody,
      });

      if (info.messageId) {
        console.log(`[Email:SMTP Success] Delivered to ${contactDestination} (ID: ${info.messageId})`);
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

  // 3. Attempt Webhook Notification
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl && webhookUrl.startsWith("http")) {
    try {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `📬 **New Portfolio Inquiry from ${safeName}**\n**Email:** ${safeEmail}\n**Category:** ${safeProjectType}\n**Message ID:** ${data.id || "N/A"}\n**Message:**\n${data.message}`,
          embeds: [
            {
              title: `New Inquiry: ${safeProjectType}`,
              description: data.message,
              color: 0x3a171c,
              fields: [
                { name: "Name", value: safeName, inline: true },
                { name: "Email", value: safeEmail, inline: true },
                { name: "Company", value: data.company || "N/A", inline: true },
                { name: "Message ID", value: data.id || "N/A", inline: false },
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

  console.warn(
    `[Email Notice] No active notification provider succeeded for inquiry ${data.id || "N/A"}. Database record preserved.`
  );

  return {
    delivered: false,
    error: "No active notification provider succeeded.",
  };
}
