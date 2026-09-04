import { NextResponse } from "next/server";
import { prisma, ensureDbSchema } from "@/lib/prisma";
import { getAdminSessionFromCookie } from "@/lib/auth";
import { validateOrigin, isOversized } from "@/lib/security";
import { checkRateLimit } from "@/lib/rate-limit";
import { createProjectSchema, updateProjectSchema } from "@/lib/validations/project";

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

    const validation = createProjectSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || "Invalid project data.";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const data = validation.data;

    await ensureDbSchema();

    // Check slug uniqueness
    const existing = await prisma.project.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return NextResponse.json({ error: "A project with this slug already exists." }, { status: 400 });
    }

    const createdProject = await prisma.project.create({
      data: {
        slug: data.slug,
        title: data.title,
        category: data.category,
        type: data.type,
        taglineEn: data.taglineEn,
        taglineFr: data.taglineFr,
        descriptionEn: data.descriptionEn,
        descriptionFr: data.descriptionFr,
        overviewEn: data.overviewEn,
        overviewFr: data.overviewFr,
        objectiveEn: data.objectiveEn,
        objectiveFr: data.objectiveFr,
        outcomeEn: data.outcomeEn,
        outcomeFr: data.outcomeFr,
        featured: data.featured,
        published: data.published,
        editorialVariant: data.editorialVariant,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl || null,
        heroImage: data.heroImage,
        technologies: {
          create: data.technologies.map((name: string) => ({ name })),
        },
        features: {
          create: data.features.map((f) => ({
            titleEn: f.titleEn,
            titleFr: f.titleFr,
            descriptionEn: f.descriptionEn || null,
            descriptionFr: f.descriptionFr || null,
          })),
        },
        challenges: {
          create: data.challenges.map((c) => ({
            textEn: c.textEn,
            textFr: c.textFr,
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

    const validation = updateProjectSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || "Invalid project update payload.";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { id, ...fieldsToUpdate } = validation.data;

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
