"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";
import { ArrowLeft, ArrowRight, ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface ProjectCaseStudyClientProps {
  project: Project;
  nextProject: Project;
}

export function ProjectCaseStudyClient({ project, nextProject }: ProjectCaseStudyClientProps) {
  const { language, t } = useLanguage();
  const isFr = language === "fr";

  const shortDesc = isFr ? project.shortDescriptionFr : project.shortDescription;
  const longDesc = isFr ? project.longDescriptionFr : project.longDescription;
  const category = isFr ? project.categoryFr : project.category;
  const overview = isFr ? project.overviewFr : project.overview;
  const objective = isFr ? project.objectiveFr : project.objective;
  const features = isFr ? project.featuresFr : project.features;

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : project.galleryImages.length - 1));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % project.galleryImages.length : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, project.galleryImages.length]);

  return (
    <main className="min-h-screen pt-32 pb-24 bg-[#F3EFEA] text-[#242222]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Back Link */}
        <div>
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#242222]/70 hover:text-[#A65F4B] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t("caseStudy.backToWork")}</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <div className="space-y-4 pb-8 border-b border-[#DED6CC]">
          <div className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest font-bold">
            {category}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#242222]">
            {project.name}
          </h1>
          <p className="text-[#242222]/80 text-base sm:text-lg max-w-3xl leading-relaxed">
            {shortDesc}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {project.hasLiveDemo && project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#A65F4B] text-white px-4 py-2 rounded-xs text-xs font-medium uppercase tracking-wider hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                {t("work.visitLive")}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#3A171C] text-[#F3EFEA] px-4 py-2 rounded-xs text-xs font-medium uppercase tracking-wider hover:bg-[#542229] transition-colors active:scale-[0.98]"
            >
              {t("work.github")}
            </a>
          </div>
        </div>

        {/* Hero Visual Preview */}
        <div className="relative aspect-[16/9] rounded-xs overflow-hidden border border-[#DED6CC] bg-[#3A171C]">
          <Image
            src={project.heroImage}
            alt={project.name}
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>

        {/* Overview & Objective */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#242222]">
                {t("caseStudy.overview")}
              </h2>
              <p className="text-[#242222]/80 text-sm leading-relaxed">
                {overview}
              </p>
              <p className="text-[#242222]/80 text-sm leading-relaxed">
                {longDesc}
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#242222]">
                {t("caseStudy.objective")}
              </h2>
              <p className="text-[#242222]/80 text-sm leading-relaxed">
                {objective}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#242222]">
                {t("caseStudy.keyFeatures")}
              </h2>
              <ul className="space-y-2 text-sm text-[#242222]/80">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#A65F4B] font-mono text-xs mt-0.5">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 space-y-4">
              <h3 className="text-xs font-mono text-[#A65F4B] uppercase tracking-wider font-semibold">
                {t("caseStudy.technologies")}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-xs bg-[#F3EFEA]/10 border border-[#DED6CC]/20 text-[#F3EFEA] font-mono text-[11px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery with Lightbox */}
        {project.galleryImages.length > 0 && (
          <div className="space-y-4 pt-8 border-t border-[#DED6CC]">
            <h2 className="text-xl font-bold text-[#242222]">
              {t("caseStudy.gallery")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {project.galleryImages.map((imgSrc, index) => (
                <button
                  key={index}
                  onClick={() => setLightboxIndex(index)}
                  className="relative aspect-square rounded-xs overflow-hidden border border-[#DED6CC] bg-[#3A171C] group focus:outline-none focus:ring-2 focus:ring-[#A65F4B]"
                >
                  <Image
                    src={imgSrc}
                    alt={`${project.name} asset ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-[#3A171C]/95 backdrop-blur-sm flex items-center justify-center p-4">
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 text-[#F3EFEA] p-2 hover:text-[#A65F4B] transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            
            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null && prev > 0 ? prev - 1 : project.galleryImages.length - 1
                )
              }
              className="absolute left-4 text-[#F3EFEA] p-2 hover:text-[#A65F4B] transition-colors"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center">
              <Image
                src={project.galleryImages[lightboxIndex]}
                alt={`${project.name} enlarged preview`}
                width={1200}
                height={800}
                className="object-contain max-h-[85vh] w-auto rounded-xs border border-[#DED6CC]/20"
              />
            </div>

            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null ? (prev + 1) % project.galleryImages.length : 0
                )
              }
              className="absolute right-4 text-[#F3EFEA] p-2 hover:text-[#A65F4B] transition-colors"
              aria-label="Next Image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}

        {/* Next Project & Contact CTA */}
        <div className="pt-16 border-t border-[#DED6CC] space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-[#242222]/70 uppercase tracking-widest block mb-1">
                {t("caseStudy.nextProject")}
              </span>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="text-2xl font-bold text-[#242222] hover:text-[#A65F4B] transition-colors inline-flex items-center gap-2"
              >
                <span>{nextProject.name}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-1.5 bg-[#3A171C] text-[#F3EFEA] px-5 py-2.5 rounded-xs text-xs font-medium uppercase tracking-wider hover:bg-[#542229] transition-colors active:scale-[0.98]"
            >
              <span>{t("hero.startProject")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
