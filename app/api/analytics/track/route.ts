import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { event, path, meta } = await request.json();

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
