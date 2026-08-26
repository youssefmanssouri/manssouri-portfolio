import { NextResponse } from "next/server";
import { prisma, ensureDbSchema } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    await ensureDbSchema();

    let body: any = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      const text = await request.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = {};
      }
    }

    const { event, path, meta } = body;

    if (!event) {
      return NextResponse.json({ error: "Event name is required." }, { status: 400 });
    }

    const createdEvent = await prisma.analyticsEvent.create({
      data: {
        event: String(event).substring(0, 50),
        path: path ? String(path).substring(0, 200) : null,
        meta: meta ? (typeof meta === "string" ? meta : JSON.stringify(meta)).substring(0, 500) : null,
      },
    });

    return NextResponse.json({ success: true, id: createdEvent.id });
  } catch (error) {
    // Fail quietly without throwing 500 to frontend for non-critical analytics
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
