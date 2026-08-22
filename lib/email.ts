import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const contactDestination = process.env.CONTACT_EMAIL || "manssouriyoussef33@gmail.com";

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
    if (resend) {
      await resend.emails.send({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: [contactDestination],
        replyTo: data.email,
        subject,
        text: textBody,
      });
      console.log(`[Email Notification] Email sent successfully to ${contactDestination}`);
      return true;
    } else {
      console.log(`[Email Notification (Console Log Only)] No RESEND_API_KEY configured.\n${textBody}`);
      return true;
    }
  } catch (error) {
    console.error("[Email Notification Failed] Error sending email:", error);
    // Return true because database submission is the primary source of truth
    return false;
  }
}
