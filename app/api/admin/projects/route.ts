import { NextResponse } from "next/server";
import { prisma, ensureDbSchema } from "@/lib/prisma";
import { getAdminSessionFromCookie } from "@/lib/auth";
import { validateOrigin, isOversized } from "@/lib/security";
import { checkRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const session = await getAdminSessionFromCookie(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    await ensureDbSchema();
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
    console.error("[Admin API] Projects fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch projects." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  if (isOversized(request, 65536)) {
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
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
    }

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

    await ensureDbSchema();
    const createdProject = await prisma.project.create({
      data: {
        slug: String(slug).trim().slice(0, 100),
        title: String(title).trim().slice(0, 200),
        category: category ? String(category).trim().slice(0, 100) : "WEB DEVELOPMENT",
        type: type ? String(type).trim().slice(0, 100) : "PERSONAL PROJECT",
        taglineEn: taglineEn ? String(taglineEn).trim().slice(0, 300) : "",
        taglineFr: taglineFr ? String(taglineFr).trim().slice(0, 300) : "",
        descriptionEn: String(descriptionEn).trim(),
        descriptionFr: String(descriptionFr).trim(),
        overviewEn: overviewEn ? String(overviewEn).trim() : "",
        overviewFr: overviewFr ? String(overviewFr).trim() : "",
        objectiveEn: objectiveEn ? String(objectiveEn).trim() : "",
        objectiveFr: objectiveFr ? String(objectiveFr).trim() : "",
        outcomeEn: outcomeEn ? String(outcomeEn).trim() : "",
        outcomeFr: outcomeFr ? String(outcomeFr).trim() : "",
        featured: featured ?? true,
        published: published ?? true,
        editorialVariant: editorialVariant || "featured-large",
        githubUrl: githubUrl || "https://github.com/youssefmanssouri",
        liveUrl: liveUrl || null,
        heroImage: heroImage || "/images/projects/businessos-main.jpg",
        technologies: {
          create: (technologies || []).map((name: string) => ({ name: String(name).trim().slice(0, 50) })),
        },
        features: {
          create: (features || []).map((f: any) => ({
            titleEn: String(f.titleEn || f).slice(0, 200),
            titleFr: String(f.titleFr || f).slice(0, 200),
            descriptionEn: f.descriptionEn ? String(f.descriptionEn).slice(0, 1000) : null,
            descriptionFr: f.descriptionFr ? String(f.descriptionFr).slice(0, 1000) : null,
          })),
        },
        challenges: {
          create: (challenges || []).map((c: any) => ({
            textEn: String(c.textEn || c).slice(0, 500),
            textFr: String(c.textFr || c).slice(0, 500),
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
    console.error("[Admin API] Project create error:", error);
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!validateOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  if (isOversized(request, 65536)) {
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
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
    }

    const { id, ...updateData } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Valid Project ID is required." }, { status: 400 });
    }

    // Extract nested arrays if provided
    const { technologies, features, challenges, ...fieldsToUpdate } = updateData;

    await ensureDbSchema();
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
    console.error("[Admin API] Project update error:", error);
    return NextResponse.json({ error: "Failed to update project." }, { status: 500 });
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
      return NextResponse.json({ error: "Valid Project ID is required." }, { status: 400 });
    }

    await ensureDbSchema();
    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("[Admin API] Project delete error:", error);
    return NextResponse.json({ error: "Failed to delete project." }, { status: 500 });
  }
}
