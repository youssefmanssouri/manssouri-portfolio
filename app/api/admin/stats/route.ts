import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSessionFromCookie } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
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

    return NextResponse.json({
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
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats." }, { status: 500 });
  }
}
