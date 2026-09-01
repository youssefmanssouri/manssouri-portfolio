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
    const totalMessages = await prisma.contactMessage.count().catch(() => 0);
    const newMessages = await prisma.contactMessage.count({ where: { status: "NEW" } }).catch(() => 0);
    const readMessages = await prisma.contactMessage.count({ where: { status: "READ" } }).catch(() => 0);
    const repliedMessages = await prisma.contactMessage.count({ where: { status: "REPLIED" } }).catch(() => 0);
    
    const totalProjects = await prisma.project.count().catch(() => 3);
    const publishedProjects = await prisma.project.count({ where: { published: true } }).catch(() => 3);
    const featuredProjects = await prisma.project.count({ where: { featured: true } }).catch(() => 3);

    const recentSubmissions = await prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }).catch(() => []);

    const analyticsCount = await prisma.analyticsEvent.count().catch(() => 0);

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
    return NextResponse.json(
      {
        metrics: {
          totalMessages: 0,
          newMessages: 0,
          readMessages: 0,
          repliedMessages: 0,
          totalProjects: 3,
          publishedProjects: 3,
          featuredProjects: 3,
          totalEvents: 0,
        },
        recentSubmissions: [],
      },
      { status: 200 }
    );
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
