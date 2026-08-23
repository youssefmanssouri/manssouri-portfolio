import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSessionFromCookie } from "@/lib/auth";

export async function GET() {
  const session = await getAdminSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const projects = await prisma.project.findMany({
      include: {
        features: true,
        technologies: true,
        challenges: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Projects fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch projects." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      slug,
      title,
      category,
      type,
      taglineEn,
      taglineFr,
      descriptionEn,
      descriptionFr,
      overviewEn,
      overviewFr,
      objectiveEn,
      objectiveFr,
      outcomeEn,
      outcomeFr,
      featured,
      published,
      editorialVariant,
      githubUrl,
      liveUrl,
      heroImage,
      technologies,
      features,
      challenges,
    } = body;

    if (!slug || !title || !descriptionEn || !descriptionFr) {
      return NextResponse.json(
        { error: "Slug, Title, and English & French Descriptions are required." },
        { status: 400 }
      );
    }

    const createdProject = await prisma.project.create({
      data: {
        slug,
        title,
        category: category || "WEB DEVELOPMENT",
        type: type || "PERSONAL PROJECT",
        taglineEn: taglineEn || "",
        taglineFr: taglineFr || "",
        descriptionEn,
        descriptionFr,
        overviewEn: overviewEn || "",
        overviewFr: overviewFr || "",
        objectiveEn: objectiveEn || "",
        objectiveFr: objectiveFr || "",
        outcomeEn: outcomeEn || "",
        outcomeFr: outcomeFr || "",
        featured: featured ?? true,
        published: published ?? true,
        editorialVariant: editorialVariant || "featured-large",
        githubUrl: githubUrl || "https://github.com/youssefmanssouri",
        liveUrl: liveUrl || null,
        heroImage: heroImage || "/images/projects/businessos-main.jpg",
        technologies: {
          create: (technologies || []).map((name: string) => ({ name })),
        },
        features: {
          create: (features || []).map((f: any) => ({
            titleEn: f.titleEn || f,
            titleFr: f.titleFr || f,
            descriptionEn: f.descriptionEn || null,
            descriptionFr: f.descriptionFr || null,
          })),
        },
        challenges: {
          create: (challenges || []).map((c: any) => ({
            textEn: c.textEn || c,
            textFr: c.textFr || c,
          })),
        },
      },
      include: {
        features: true,
        technologies: true,
        challenges: true,
      },
    });

    return NextResponse.json({ success: true, project: createdProject }, { status: 201 });
  } catch (error) {
    console.error("Project create error:", error);
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSessionFromCookie();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ error: "Project ID is required." }, { status: 400 });
    }

    // Extract nested arrays if provided
    const { technologies, features, challenges, ...fieldsToUpdate } = updateData;

    const updated = await prisma.project.update({
      where: { id },
      data: fieldsToUpdate,
      include: {
        features: true,
        technologies: true,
        challenges: true,
      },
    });

    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    console.error("Project update error:", error);
    return NextResponse.json({ error: "Failed to update project." }, { status: 500 });
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
      return NextResponse.json({ error: "Project ID is required." }, { status: 400 });
    }

    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Project delete error:", error);
    return NextResponse.json({ error: "Failed to delete project." }, { status: 500 });
  }
}
