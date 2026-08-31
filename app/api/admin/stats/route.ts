import { NextResponse } from "next/server";
import { prisma, ensureDbSchema } from "@/lib/prisma";
import { getAdminSessionFromCookie } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const session = await getAdminSessionFromCookie(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    await ensureDbSchema();
    const totalMessages = await prisma.contactMessage.count();
    const newMessages = await prisma.contactMessage.count({ where: { status: "NEW" } });
    const readMessages = await prisma.contactMessage.count({ where: { status: "READ" } });
    const repliedMessages = await prisma.contactMessage.count({ where: { status: "REPLIED" } });
    
    const totalProjects = await prisma.project.count();
    const publishedProjects = await prisma.project.count({ where: { published: true } });
    const featuredProjects = await prisma.project.count({ where: { featured: true } });

    const recentSubmissions = await prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    const analyticsCount = await prisma.analyticsEvent.count();

    return NextResponse.json(
      {
        metrics: {
          totalMessages,
          newMessages,
          readMessages,
          repliedMessages,
          totalProjects,
          publishedProjects,
          featuredProjects,
          totalEvents: analyticsCount,
        },
        recentSubmissions,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error) {
    console.error("[Admin API] Admin stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats." }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
