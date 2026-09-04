import { NextResponse } from "next/server";
import { prisma, ensureDbSchema } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { isOversized } from "@/lib/security";
import { z } from "zod";

const analyticsSchema = z.object({
  event: z.string().trim().min(1, "Event name is required").max(100, "Event name too long"),
  path: z.string().trim().max(200).optional().nullable(),
  meta: z.union([z.string().max(2000), z.record(z.string(), z.any())]).optional().nullable(),
});

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST for telemetry tracking." },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

export async function POST(request: Request) {
  try {
    // Guard: max 8KB for analytics event
    if (isOversized(request, 8192)) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    // Rate limit: max 60 tracking requests per minute per IP (Distributed Upstash)
    const rateLimitResult = await checkRateLimit(request, "analytics");
    if (rateLimitResult.limited) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded" },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimitResult.retryAfterSeconds),
            "X-RateLimit-Limit": String(rateLimitResult.limit),
            "X-RateLimit-Remaining": String(rateLimitResult.remaining),
          },
        }
      );
    }

    let body: any = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      try {
        body = await request.json();
      } catch {
        return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
      }
    } else {
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = {};
      }
    }

    const validation = analyticsSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues[0]?.message || "Invalid analytics event." }, { status: 400 });
    }

    const { event, path, meta } = validation.data;
    const metaString = meta ? (typeof meta === "string" ? meta : JSON.stringify(meta)) : null;

    await ensureDbSchema();
    const createdEvent = await prisma.analyticsEvent.create({
      data: {
        event: event.slice(0, 50),
        path: path ? path.slice(0, 200) : null,
        meta: metaString ? metaString.slice(0, 500) : null,
      },
    });

    return NextResponse.json({ success: true, id: createdEvent.id });
  } catch {
    // Fail quietly without throwing 500 to frontend for non-critical analytics
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
