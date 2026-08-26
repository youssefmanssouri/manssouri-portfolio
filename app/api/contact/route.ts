import { NextResponse } from "next/server";
import { prisma, ensureDbSchema } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";
import { sendContactNotificationEmail } from "@/lib/email";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST for contact submissions." },
    { status: 405 }
  );
}

export async function POST(request: Request) {
  try {
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

    const body = await request.json();

    // 1. Zod Validation
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || "Invalid contact form input.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { name, email, company, projectType, budget, message, website_confirm, language } = validationResult.data;

    // 2. Honeypot check for automated spambots
    if (website_confirm && website_confirm.trim() !== "") {
      console.warn(`[Anti-Spam] Honeypot triggered by IP ${getClientIp(request)}`);
      return NextResponse.json(
        { success: true, message: "Inquiry received successfully." },
        { status: 200 }
      );
    }

    // 3. Save to Database via Prisma (Mandatory Source of Truth)
    let savedMessage;
    try {
      await ensureDbSchema();
      savedMessage = await prisma.contactMessage.create({
        data: {
          name,
          email,
          company: company || null,
          projectType,
          budgetRange: budget || null,
          message,
          language: language || "en",
          status: "NEW",
        },
      });

      await prisma.analyticsEvent.create({
        data: {
          event: "CONTACT_SUBMIT",
          path: "/#contact",
          meta: JSON.stringify({ projectType, language }),
        },
      }).catch(() => {});
    } catch (dbErr: any) {
      console.error("[Database Error] Failed to persist contact message:", dbErr?.message || dbErr);
      return NextResponse.json(
        { error: "Unable to process inquiry at this time. Please try again later." },
        { status: 500 }
      );
    }

    // 4. Send Email Notification with await so Vercel Serverless Function completes delivery before returning
    let emailDelivered = false;
    try {
      emailDelivered = await sendContactNotificationEmail({
        name,
        email,
        company: company || undefined,
        projectType,
        budgetRange: budget || undefined,
        message,
        language: language || "en",
        submittedAt: savedMessage.createdAt,
      });
    } catch (emailErr) {
      console.error("[Email Dispatch Warning] Exception during notification dispatch:", emailErr);
    }

    // 5. Return Success Response (Database write is preserved even if email fails)
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received successfully.",
        id: savedMessage.id,
        emailDelivered,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to process contact submission:", error);
    return NextResponse.json(
      { error: "Internal server error while processing your inquiry." },
      { status: 500 }
    );
  }
}
