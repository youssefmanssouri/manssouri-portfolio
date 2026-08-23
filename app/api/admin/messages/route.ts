import { NextResponse } from "next/server";
import { prisma, ensureDbSchema } from "@/lib/prisma";
import { getAdminSessionFromCookie } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await getAdminSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  try {
    await ensureDbSchema();
    const whereClause: any = {};
    if (status && status !== "ALL") {
      whereClause.status = status;
    }
    if (search && search.trim() !== "") {
      whereClause.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { company: { contains: search } },
        { message: { contains: search } },
      ];
    }

    const messages = await prisma.contactMessage.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Admin messages fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch messages." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getAdminSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Message ID and status are required." }, { status: 400 });
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, message: updated });
  } catch (error) {
    console.error("Admin message update error:", error);
    return NextResponse.json({ error: "Failed to update message status." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Message ID is required." }, { status: 400 });
    }

    await prisma.contactMessage.delete({ where: { id } });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Admin message delete error:", error);
    return NextResponse.json({ error: "Failed to delete message." }, { status: 500 });
  }
}
