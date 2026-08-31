import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { persistContactMessage } from "@/lib/contact-storage";
import { sendContactNotificationEmail } from "@/lib/email";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma";

// In-memory deduplication cache: hash -> timestamp (expires after 30 seconds)
const recentSubmissions = new Map<string, number>();

function cleanOldSubmissions() {
  const cutoff = Date.now() - 30 * 1000;
  for (const [key, timestamp] of recentSubmissions.entries()) {
    if (timestamp < cutoff) {
      recentSubmissions.delete(key);
    }
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST for contact submissions." },
    { status: 405 }
  );
}

export async function POST(request: Request) {
  try {
    const clientIp = getClientIp(request);

    // 1. Rate Limiting: Max 5 submissions per 15 minutes per IP
    const { limited, retryAfterSeconds } = checkRateLimit(request, "contact", 5, 15 * 60 * 1000);
    if (limited) {
      return NextResponse.json(
        { error: "Too many contact requests. Please wait a few minutes before trying again." },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSeconds),
          },
        }
      );
    }

    let rawBody: any;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
    }

    // 2. Server-side Zod Validation
    const validationResult = contactSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || "Invalid contact form input.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, company, phone, projectType, budget, message, website_confirm, language } =
      validationResult.data;

    // 3. Honeypot Anti-Spam Check
    if (website_confirm && website_confirm.trim() !== "") {
      console.warn(`[Anti-Spam] Honeypot triggered by IP ${clientIp}`);
      return NextResponse.json(
        { success: true, message: "Inquiry received successfully." },
        { status: 200 }
      );
    }

    // 4. Duplicate Submission Protection (30s window)
    cleanOldSubmissions();
    const submissionKey = `${clientIp}_${email}_${projectType}_${message.slice(0, 30)}`;
    if (recentSubmissions.has(submissionKey)) {
      return NextResponse.json(
        {
          success: true,
          message: "Your message has already been received. I will be in touch soon.",
          duplicate: true,
        },
        { status: 200 }
      );
    }
    recentSubmissions.set(submissionKey, Date.now());

    // 5. Persistent Message Storage (Prisma Database / Cloud Fallback)
    const storageResult = await persistContactMessage({
      name,
      email,
      company,
      phone,
      projectType,
      budgetRange: budget,
      message,
      language: language || "en",
    });

    const storedMessage = storageResult.message;

    // 6. Notification Dispatch (Resend API -> SMTP Transport -> Webhook)
    const notificationResult = await sendContactNotificationEmail({
      id: storedMessage.id,
      name,
      email,
      company: company || undefined,
      phone: phone || undefined,
      projectType,
      budgetRange: budget || undefined,
      message,
      language: language || "en",
      submittedAt: storedMessage.createdAt,
    });

    // 7. Track analytics event safely (isolated)
    try {
      await prisma.analyticsEvent.create({
        data: {
          event: "CONTACT_SUBMIT",
          path: "/#contact",
          meta: JSON.stringify({
            projectType,
            language,
            persisted: storageResult.persisted,
            emailDelivered: notificationResult.delivered,
            provider: notificationResult.provider || "none",
          }),
        },
      });
    } catch {
      // Analytics failure is non-blocking
    }

    // 8. Reliability Guard: If both persistence AND notification failed, report error to user
    if (!storageResult.persisted && !notificationResult.delivered) {
      console.error("[Contact Failure] Neither database persistence nor email notification succeeded.");
      return NextResponse.json(
        {
          error:
            "Something went wrong while delivering your message. Please try again or reach out directly at manssouriyoussef33@gmail.com or via WhatsApp.",
        },
        { status: 500 }
      );
    }

    // 9. Success Response
    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received successfully.",
        id: storedMessage.id,
        persisted: storageResult.persisted,
        emailDelivered: notificationResult.delivered,
        storageType: storageResult.storageType,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[Contact API Exception]", err?.message || err);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while processing your message. Please reach out directly via email or WhatsApp.",
      },
      { status: 500 }
    );
  }
}
