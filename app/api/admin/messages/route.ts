import { NextResponse } from "next/server";
import { prisma, ensureDbSchema } from "@/lib/prisma";
import { getAdminSessionFromCookie } from "@/lib/auth";
import { validateOrigin, isOversized } from "@/lib/security";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ALLOWED_STATUSES = new Set(["NEW", "READ", "REPLIED", "ARCHIVED"]);

export async function GET(request: Request) {
  const session = await getAdminSessionFromCookie(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  try {
    await ensureDbSchema();
    const whereClause: any = {};
    if (status && status !== "ALL" && ALLOWED_STATUSES.has(status)) {
      whereClause.status = status;
    }
    if (search && search.trim() !== "") {
      const sanitizedSearch = search.trim().slice(0, 100);
      whereClause.OR = [
        { name: { contains: sanitizedSearch } },
        { email: { contains: sanitizedSearch } },
        { company: { contains: sanitizedSearch } },
        { message: { contains: sanitizedSearch } },
      ];
    }

    const messages = await prisma.contactMessage.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      { messages },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error) {
    console.error("[Admin API] Messages fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch messages." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  if (isOversized(request, 16384)) {
    return NextResponse.json({ error: "Request payload too large." }, { status: 413 });
  }

  const session = await getAdminSessionFromCookie(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  // Admin write rate limit (60 ops / 1 min)
  const rateLimitResult = await checkRateLimit(request, "admin_write", `admin:${session.userId}`);
  if (rateLimitResult.limited) {
    return NextResponse.json(
      { error: "Too many admin requests. Please slow down." },
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

  try {
    let rawBody: any;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
    }

    const { id, status } = rawBody;

    if (!id || typeof id !== "string" || !status || typeof status !== "string") {
      return NextResponse.json({ error: "Valid message ID and status are required." }, { status: 400 });
    }

    if (!ALLOWED_STATUSES.has(status)) {
      return NextResponse.json(
        { error: "Invalid status value. Allowed: NEW, READ, REPLIED, ARCHIVED." },
        { status: 400 }
      );
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, message: updated });
  } catch (error) {
    console.error("[Admin API] Message status update error:", error);
    return NextResponse.json({ error: "Failed to update message status." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const session = await getAdminSessionFromCookie(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  // Admin write rate limit (60 ops / 1 min)
  const rateLimitResult = await checkRateLimit(request, "admin_write", `admin:${session.userId}`);
  if (rateLimitResult.limited) {
    return NextResponse.json(
      { error: "Too many admin requests. Please slow down." },
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

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Valid message ID is required." }, { status: 400 });
    }

    await prisma.contactMessage.delete({ where: { id } });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("[Admin API] Message delete error:", error);
    return NextResponse.json({ error: "Failed to delete message." }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
