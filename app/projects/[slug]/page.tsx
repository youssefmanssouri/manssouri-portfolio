import React from "react";
import { notFound } from "next/navigation";
import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { Metadata } from "next";
import { ProjectCaseStudyClient } from "./client";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "Project Not Found — Youssef Manssouri",
    };
  }

  const mainCategory = project.category.split("·")[0].trim();
  const pageTitle = `${project.name} — ${mainCategory} Case Study | Youssef Manssouri`;
  const pageDesc = `${project.shortDescription} Designed and developed by Youssef Manssouri using ${project.technologies.slice(0, 4).join(", ")}.`;
  const projectUrl = `https://www.youssefmanssouri.site/projects/${project.slug}`;
  const imageUrl = `https://www.youssefmanssouri.site${project.heroImage}`;

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: [
      project.name,
      "Youssef Manssouri",
      `${project.name} Case Study`,
      ...project.technologies,
      "Digital Product Builder",
      "Business Analytics",
    ],
    authors: [{ name: "Youssef Manssouri", url: "https://www.youssefmanssouri.site" }],
    creator: "Youssef Manssouri",
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: projectUrl,
      title: pageTitle,
      description: pageDesc,
      siteName: "Youssef Manssouri Portfolio",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: `${project.name} Case Study — Youssef Manssouri`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
      images: [imageUrl],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Find next project for bottom pagination
  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.youssefmanssouri.site"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Selected Work",
        "item": "https://www.youssefmanssouri.site/#work"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.name,
        "item": `https://www.youssefmanssouri.site/projects/${project.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProjectCaseStudyClient project={project} nextProject={nextProject} />
    </>
  );
}
