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
      title: "Project Not Found",
      description: "The requested project case study could not be found.",
    };
  }

  const rawTitle = project.seoTitle || `${project.name} Case Study`;
  const fullTitle = `${rawTitle} | Youssef Manssouri`;
  const pageDesc = project.seoDescription || project.shortDescription;
  const projectUrl = `https://www.youssefmanssouri.site/projects/${project.slug}`;
  const imageUrl = `https://www.youssefmanssouri.site${project.heroImage}`;

  return {
    title: rawTitle,
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
      alternateLocale: ["fr_FR"],
      url: projectUrl,
      title: fullTitle,
      description: pageDesc,
      siteName: "Youssef Manssouri",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: `${project.name} — ${project.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
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

  const schemaType = project.schemaType || "WebApplication";
  const projectUrl = `https://www.youssefmanssouri.site/projects/${project.slug}`;
  const imageUrl = `https://www.youssefmanssouri.site${project.heroImage}`;

  const projectPageGraphJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${projectUrl}#breadcrumb`,
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
            "item": projectUrl
          }
        ]
      },
      {
        "@type": schemaType,
        "@id": `${projectUrl}#software`,
        "name": project.name,
        "headline": project.title,
        "description": project.longDescription || project.shortDescription,
        "url": projectUrl,
        "image": imageUrl,
        "applicationCategory": project.applicationCategory || "BusinessApplication",
        "operatingSystem": "Web Browser",
        "author": {
          "@type": "Person",
          "@id": "https://www.youssefmanssouri.site/#identity",
          "name": "Youssef Manssouri",
          "url": "https://www.youssefmanssouri.site"
        },
        "creator": {
          "@type": "Person",
          "@id": "https://www.youssefmanssouri.site/#identity",
          "name": "Youssef Manssouri",
          "url": "https://www.youssefmanssouri.site"
        },
        ...(project.githubUrl ? { "codeRepository": project.githubUrl } : {}),
        ...(project.liveUrl && project.hasLiveDemo ? { "sameAs": project.liveUrl } : {}),
        "programmingLanguage": project.technologies,
        "featureList": project.features
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectPageGraphJsonLd) }}
      />
      <ProjectCaseStudyClient project={project} nextProject={nextProject} />
    </>
  );
}
