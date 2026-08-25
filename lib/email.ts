import { Resend } from "resend";

interface SendNotificationParams {
  name: string;
  email: string;
  company?: string;
  projectType: string;
  budgetRange?: string;
  message: string;
  language?: string;
  submittedAt: Date;
}

export async function sendContactNotificationEmail(data: SendNotificationParams): Promise<boolean> {
  const subject = `[Portfolio Contact] New Inquiry from ${data.name} (${data.projectType})`;
  const dateFormatted = data.submittedAt.toLocaleString("en-US", { timeZone: "Africa/Casablanca" });

  const textBody = `
New Contact Submission on Youssef Manssouri Portfolio:

--------------------------------------------------
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || "N/A"}
Project Type: ${data.projectType}
Budget Range: ${data.budgetRange || "Not specified"}
Language: ${data.language || "en"}
Submitted At: ${dateFormatted}

Message:
${data.message}
--------------------------------------------------
`;

  try {
    const rawApiKey = process.env.RESEND_API_KEY;
    const resendApiKey =
      rawApiKey && rawApiKey.trim() !== "" && !rawApiKey.includes("[SENSITIVE]")
        ? rawApiKey.trim()
        : null;

    const contactDestination = process.env.CONTACT_EMAIL || "manssouriyoussef33@gmail.com";
    const emailFrom = process.env.EMAIL_FROM || "Portfolio Contact Form <onboarding@resend.dev>";

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const emailResult = await resend.emails.send({
        from: emailFrom,
        to: [contactDestination],
        replyTo: data.email,
        subject,
        text: textBody,
      });

      if (emailResult.error) {
        console.error("[Email Delivery Error] Resend returned API error:", emailResult.error);
        return false;
      }

      console.log(`[Email Notification] Email sent successfully to ${contactDestination} (ID: ${emailResult.data?.id})`);
      return true;
    } else {
      console.log(`[Email Notification (Console Fallback)] No valid RESEND_API_KEY set.\n${textBody}`);
      return true;
    }
  } catch (error) {
    console.error("[Email Notification Failed] Error sending email:", error);
    return false;
  }
}
