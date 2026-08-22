import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";
import { sendContactNotificationEmail } from "@/lib/email";

// Simple in-memory rate limiter
const ipMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);

  if (!entry) {
    ipMap.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    return false;
  }

  if (now > entry.expiresAt) {
    ipMap.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    return false;
  }

  if (entry.count >= 5) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many contact requests. Please wait a few minutes before trying again." },
        { status: 429 }
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

    // 2. Honeypot check
    if (website_confirm && website_confirm.trim() !== "") {
      console.warn(`[Anti-Spam] Honeypot triggered by IP ${ip}`);
      // Fake success response to spambots
      return NextResponse.json(
        { success: true, message: "Inquiry received successfully." },
        { status: 200 }
      );
    }

    // 3. Save to Prisma Database
    const savedMessage = await prisma.contactMessage.create({
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

    // 4. Send Email Notification
    sendContactNotificationEmail({
      name,
      email,
      company: company || undefined,
      projectType,
      budgetRange: budget || undefined,
      message,
      language: language || "en",
      submittedAt: savedMessage.createdAt,
    }).catch((err) => console.error("Async email notification error:", err));

    // 5. Track analytics event
    try {
      await prisma.analyticsEvent.create({
        data: {
          event: "CONTACT_SUBMIT",
          path: "/#contact",
          meta: JSON.stringify({ projectType, language }),
        },
      });
    } catch (e) {
      // Non-critical
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message stored successfully",
        id: savedMessage.id,
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
