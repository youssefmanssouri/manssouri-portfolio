import { NextResponse } from "next/server";
import { prisma, ensureDbSchema } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { isOversized } from "@/lib/security";

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

    // Rate limit: max 60 tracking requests per minute per IP
    const { limited } = checkRateLimit(request, "analytics_track", 60, 60 * 1000);
    if (limited) {
      return NextResponse.json({ success: false, error: "Rate limit exceeded" }, { status: 429 });
    }

    await ensureDbSchema();

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

    const { event, path, meta } = body;

    if (!event || typeof event !== "string" || event.trim().length === 0) {
      return NextResponse.json({ error: "Event name is required." }, { status: 400 });
    }

    if (event.length > 100) {
      return NextResponse.json({ error: "Event name too long." }, { status: 400 });
    }

    const metaString = meta ? (typeof meta === "string" ? meta : JSON.stringify(meta)) : null;

    if (metaString && metaString.length > 2000) {
      return NextResponse.json({ error: "Oversized metadata payload." }, { status: 400 });
    }

    const createdEvent = await prisma.analyticsEvent.create({
      data: {
        event: event.substring(0, 50),
        path: path ? String(path).substring(0, 200) : null,
        meta: metaString ? metaString.substring(0, 500) : null,
      },
    });

    return NextResponse.json({ success: true, id: createdEvent.id });
  } catch (error) {
    // Fail quietly without throwing 500 to frontend for non-critical analytics
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
