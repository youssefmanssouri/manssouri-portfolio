"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Project } from "@/data/projects";
import { ArrowLeft, ArrowRight, ExternalLink, Mail, ShieldCheck, Layers, Eye } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics";
import { CaseStudyNav } from "@/components/projects/case-study-nav";

const ProjectLightbox = dynamic(
  () => import("@/components/projects/project-lightbox"),
  { ssr: false }
);

interface ProjectCaseStudyClientProps {
  project: Project;
  nextProject: Project;
}

export function ProjectCaseStudyClient({ project, nextProject }: ProjectCaseStudyClientProps) {
  const { language, t } = useLanguage();
  const isFr = language === "fr";

  const shortDesc = isFr ? project.shortDescriptionFr : project.shortDescription;
  const category = isFr ? project.categoryFr : project.category;
  const role = isFr ? project.roleFr : project.role;

  // Problem & Solution
  const ps = project.problemSolution;
  const problemTitle = isFr ? ps.problemTitleFr : ps.problemTitleEn;
  const problemDesc = isFr ? ps.problemDescFr : ps.problemDescEn;
  const solutionTitle = isFr ? ps.solutionTitleFr : ps.solutionTitleEn;
  const solutionDesc = isFr ? ps.solutionDescFr : ps.solutionDescEn;

  // Lightbox modal index
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Gallery image array for lightbox inspection
  const allImages = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : [project.heroImage];

  const handleOpenLightboxBySrc = (src: string) => {
    const idx = allImages.findIndex((img) => img === src);
    setLightboxIndex(idx !== -1 ? idx : 0);
  };

  // Track page view once per mount
  useEffect(() => {
    trackEvent("CASE_STUDY_VIEW", { slug: project.slug, name: project.name }, `/projects/${project.slug}`);
  }, [project.slug, project.name]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : allImages.length - 1));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, allImages.length]);

  return (
    <article className="min-h-screen pt-24 sm:pt-28 pb-20 sm:pb-28 bg-[#F3EFEA] text-[#242222]">
      {/* Sticky Table of Contents Sub-Navigation */}
      <CaseStudyNav hasLiveDemo={project.hasLiveDemo && Boolean(project.liveUrl)} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-12 sm:space-y-16">
        
        {/* 1. Back Link */}
        <div>
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#242222]/70 hover:text-[#A65F4B] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>{t("caseStudy.backToWork")}</span>
          </Link>
        </div>

        {/* Section 1: Overview */}
        <section id="overview" className="scroll-mt-36 space-y-12 sm:space-y-16">
          {/* Case Study Header & Action Bar */}
          <div className="space-y-4 pb-8 border-b border-[#DED6CC]">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#A65F4B] uppercase tracking-widest font-bold">
              <span>{category}</span>
              <span>·</span>
              <span className="text-[#242222]/60 font-medium lowercase tracking-normal">{role}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#242222] leading-[1.15]">
              {project.name}
            </h1>

            <p className="text-[#242222]/85 text-base sm:text-lg max-w-3xl leading-relaxed">
              {shortDesc}
            </p>

            {/* Action CTAs: Live Demo (Primary) vs GitHub (Secondary) */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {project.hasLiveDemo && project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent("LIVE_DEMO_CLICK", { slug: project.slug, name: project.name, source: "case_study_top" });
                  }}
                  className="inline-flex items-center gap-2 bg-[#A65F4B] text-[#F3EFEA] px-5 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.98] shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
                >
                  <span>{t("work.visitLive")}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent("GITHUB_CLICK", { slug: project.slug, source: "case_study_top" });
                }}
                className="inline-flex items-center gap-2 bg-transparent border border-[#3A171C] text-[#3A171C] px-5 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-[#3A171C]/5 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
              >
                <span>{t("work.github")}</span>
              </a>
            </div>
          </div>

          {/* Product Scope Strip */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 rounded-xs bg-[#FAF7F2] border border-[#DED6CC] shadow-xs">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="space-y-1.5 border-l-2 border-[#A65F4B] pl-3.5 break-words">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-[#3A171C] leading-none">
                    {m.value}
                  </div>
                  <div className="text-xs font-bold text-[#242222]">
                    {isFr ? m.labelFr : m.label}
                  </div>
                  {(m.detail || m.detailFr) && (
                    <div className="text-[11px] text-[#242222]/70 leading-snug">
                      {isFr ? m.detailFr : m.detail}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Personal Ownership & Build Scope Card */}
          {((isFr ? project.buildScopeFr : project.buildScopeEn) || project.features) && (
            <div className="p-6 sm:p-8 rounded-xs bg-[#FAF7F2] border border-[#DED6CC] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DED6CC] pb-3">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono text-[#A65F4B] uppercase tracking-widest font-bold block">
                    {t("caseStudy.buildScopeBadge")}
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-[#242222] tracking-tight">
                    {t("caseStudy.buildScopeTitle")}
                  </h2>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-xs bg-[#3A171C]/5 border border-[#3A171C]/15 text-[11px] font-mono text-[#3A171C] font-semibold">
                  {t("caseStudy.buildScopeRole")}
                </span>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {((isFr ? project.buildScopeFr : project.buildScopeEn) || (isFr ? project.featuresFr : project.features)).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#242222]/90 leading-relaxed font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A65F4B] mt-2 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Primary Hero Visual Showcase */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleOpenLightboxBySrc(project.heroImage)}
              className="w-full text-left relative aspect-[16/10] sm:aspect-[16/9] rounded-xs overflow-hidden border border-[#DED6CC] bg-[#3A171C] shadow-lg group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] cursor-pointer"
              aria-label={`${project.name} main interface preview - ${t("caseStudy.expandImage")}`}
            >
              <Image
                src={project.heroImage}
                alt={`${project.name} primary interface showcase`}
                fill
                className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-500"
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-xs bg-[#3A171C]/80 backdrop-blur-xs text-[#F3EFEA] text-[11px] font-mono flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-3.5 h-3.5 text-[#A65F4B]" />
                <span>{t("caseStudy.expandImage")}</span>
              </div>
            </button>
          </div>
        </section>

        {/* Section 2 & 3: The Business Problem vs The Solution (2-Column Editorial Grid) */}
        <section className="space-y-6 pt-4 border-t border-[#DED6CC]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            
            {/* The Business Challenge Card */}
            <div id="problem" className="scroll-mt-36 p-6 sm:p-8 rounded-xs bg-[#FAF7F2] border border-[#DED6CC] space-y-3.5 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest font-bold">
                  01 / {t("caseStudy.challengeTitle")}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#242222] tracking-tight">
                  {problemTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[#242222]/85 leading-relaxed">
                  {problemDesc}
                </p>
              </div>
            </div>

            {/* The Solution Card */}
            <div id="solution" className="scroll-mt-36 p-6 sm:p-8 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 space-y-3.5 flex flex-col justify-between shadow-md">
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest font-bold">
                  02 / {t("caseStudy.solutionTitle")}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#F3EFEA] tracking-tight">
                  {solutionTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[#DED6CC]/85 leading-relaxed">
                  {solutionDesc}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Section 4: Core Capabilities & Contextual Visual Walkthrough */}
        <section id="capabilities" className="scroll-mt-36 space-y-10 pt-8 border-t border-[#DED6CC]">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest font-bold">
              03 / {t("caseStudy.capabilitiesBadge")}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#242222]">
              {t("caseStudy.capabilitiesTitle")}
            </h2>
          </div>

          {/* Capabilities List with Alternating Visual Showcase */}
          <div className="space-y-12 sm:space-y-16">
            {project.capabilities.map((cap, idx) => {
              const capTitle = isFr ? cap.titleFr : cap.titleEn;
              const capSummary = isFr ? cap.summaryFr : cap.summaryEn;
              const capOutcome = isFr ? cap.practicalOutcomeFr : cap.practicalOutcomeEn;
              const capCaption = isFr ? cap.imageCaptionFr : cap.imageCaptionEn;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={cap.id}
                  className="border border-[#DED6CC] bg-[#FAF7F2] p-6 sm:p-8 lg:p-10 rounded-xs shadow-xs space-y-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Capability Narrative */}
                    <div className={`lg:col-span-5 space-y-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                      <div className="space-y-2">
                        <span className="text-xs font-mono text-[#A65F4B] uppercase tracking-wider font-bold">
                          MODULE 0{idx + 1}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#242222] tracking-tight">
                          {capTitle}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-[#242222]/85 leading-relaxed">
                        {capSummary}
                      </p>

                      {/* Practical Outcome Box */}
                      <div className="p-4 rounded-xs bg-[#242222]/5 border border-[#DED6CC] text-xs text-[#242222] space-y-1.5">
                        <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold block">
                          {t("caseStudy.practicalOutcome")}
                        </span>
                        <p className="text-[#242222]/90 leading-relaxed font-medium">
                          {capOutcome}
                        </p>
                      </div>
                    </div>

                    {/* Capability Contextual Screenshot */}
                    {cap.image && (
                      <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                        <button
                          type="button"
                          onClick={() => handleOpenLightboxBySrc(cap.image!)}
                          className="w-full text-left block relative aspect-[16/10] rounded-xs overflow-hidden border border-[#DED6CC] bg-[#3A171C] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] cursor-pointer shadow-sm"
                          aria-label={`${capTitle} - ${t("caseStudy.expandImage")}`}
                        >
                          <Image
                            src={cap.image}
                            alt={`${project.name} - ${capTitle}`}
                            fill
                            className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-500"
                            sizes="(max-width: 1024px) 100vw, 55vw"
                          />
                          <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-xs bg-[#3A171C]/80 backdrop-blur-xs text-[#F3EFEA] text-[10px] font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="w-3 h-3 text-[#A65F4B]" />
                            <span>{t("caseStudy.expandImage")}</span>
                          </div>
                        </button>
                        {capCaption && (
                          <p className="text-[11px] font-mono text-[#242222]/60 pt-2 px-1 leading-snug">
                            {capCaption}
                          </p>
                        )}
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5: Engineering Foundation & Architecture */}
        {project.engineeringPoints && project.engineeringPoints.length > 0 && (
          <section id="engineering" className="scroll-mt-36 space-y-8 pt-8 border-t border-[#DED6CC]">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest font-bold">
                04 / {t("caseStudy.engineeringBadge")}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#242222]">
                {t("caseStudy.engineeringTitle")}
              </h2>
            </div>

            {/* 4 Outcome-Oriented Engineering Decisions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.engineeringPoints.map((eng, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xs bg-[#FAF7F2] border border-[#DED6CC] space-y-2.5 shadow-xs"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A65F4B] font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#A65F4B]" />
                    <span>0{idx + 1}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#242222] tracking-tight">
                    {isFr ? eng.titleFr : eng.titleEn}
                  </h3>
                  <p className="text-xs text-[#242222]/80 leading-relaxed font-sans">
                    {isFr ? eng.descFr : eng.descEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Technologies Strip with Functional Implementation Purpose */}
            {project.techStackDetails && project.techStackDetails.length > 0 ? (
              <div className="p-6 sm:p-8 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 space-y-4 shadow-md">
                <div className="flex items-center justify-between border-b border-[#DED6CC]/20 pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#A65F4B] uppercase tracking-wider font-bold">
                    <Layers className="w-4 h-4 text-[#A65F4B]" />
                    <span>{t("caseStudy.technologies")}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#DED6CC]/60 hidden sm:inline">
                    {t("caseStudy.techPurposeBadge")}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {project.techStackDetails.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xs bg-[#F3EFEA]/5 border border-[#DED6CC]/15 space-y-1"
                    >
                      <div className="text-xs font-mono font-bold text-[#F3EFEA]">
                        {item.tech}
                      </div>
                      <div className="text-[11px] text-[#DED6CC]/75 leading-snug">
                        {isFr ? item.purposeFr : item.purposeEn}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 space-y-3.5 shadow-md">
                <div className="flex items-center gap-2 text-xs font-mono text-[#A65F4B] uppercase tracking-wider font-bold">
                  <Layers className="w-4 h-4 text-[#A65F4B]" />
                  <span>{t("caseStudy.technologies")}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xs bg-[#F3EFEA]/10 border border-[#DED6CC]/20 text-[#F3EFEA] font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Section 6: Live Sandbox Demo & Verifiable Proof */}
        <section id="demo" className="scroll-mt-36 space-y-8">
          
          {/* Verifiable Product Proof Micro-Strip */}
          <div className="p-6 sm:p-8 rounded-xs bg-[#FAF7F2] border border-[#DED6CC] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#DED6CC] pb-3">
              <span className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest font-bold">
                {t("caseStudy.proofBadge")}
              </span>
              <span className="text-[11px] font-mono text-[#242222]/60 hidden sm:inline">
                {t("caseStudy.proofTitle")}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              {/* Live Product */}
              {project.hasLiveDemo && project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xs bg-white border border-[#DED6CC] hover:border-[#A65F4B] transition-colors group space-y-1 block shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-[#242222]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{t("caseStudy.proofLiveProduct")}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#A65F4B] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-[#242222]/70 leading-snug">
                    {t("caseStudy.proofLiveProductDesc")}
                  </p>
                </a>
              ) : (
                <div className="p-3.5 rounded-xs bg-white border border-[#DED6CC] space-y-1 shadow-2xs">
                  <div className="text-xs font-mono font-bold text-[#242222]">
                    {t("caseStudy.proofLiveProduct")}
                  </div>
                  <p className="text-[11px] text-[#242222]/70 leading-snug">
                    {t("caseStudy.proofLiveProductDesc")}
                  </p>
                </div>
              )}

              {/* Source Code */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xs bg-white border border-[#DED6CC] hover:border-[#A65F4B] transition-colors group space-y-1 block shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#242222]">
                  <span>{t("caseStudy.proofSourceCode")}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#A65F4B] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <p className="text-[11px] text-[#242222]/70 leading-snug">
                  {t("caseStudy.proofSourceCodeDesc")}
                </p>
              </a>

              {/* Multi-Device Responsive */}
              <div className="p-3.5 rounded-xs bg-white border border-[#DED6CC] space-y-1 shadow-2xs">
                <div className="text-xs font-mono font-bold text-[#242222]">
                  {t("caseStudy.proofResponsive")}
                </div>
                <p className="text-[11px] text-[#242222]/70 leading-snug">
                  {t("caseStudy.proofResponsiveDesc")}
                </p>
              </div>

              {/* Built From Scratch */}
              <div className="p-3.5 rounded-xs bg-white border border-[#DED6CC] space-y-1 shadow-2xs">
                <div className="text-xs font-mono font-bold text-[#242222]">
                  {t("caseStudy.proofFromScratch")}
                </div>
                <p className="text-[11px] text-[#242222]/70 leading-snug">
                  {t("caseStudy.proofFromScratchDesc")}
                </p>
              </div>
            </div>
          </div>

          {/* Live Sandbox Demo Invitation */}
          {project.hasLiveDemo && project.liveUrl && (
            <div className="p-8 sm:p-10 rounded-xs bg-[#FAF7F2] border border-[#A65F4B]/50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl space-y-2">
                <span className="text-[11px] font-mono text-[#A65F4B] uppercase tracking-widest font-bold block">
                  {t("caseStudy.liveDemoBadge")}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#242222]">
                  {t("caseStudy.liveDemoTitle")}
                </h3>
                <p className="text-xs sm:text-sm text-[#242222]/80 leading-relaxed">
                  {t("caseStudy.liveDemoDesc")}
                </p>
                <p className="text-[11px] font-mono text-[#242222]/60 pt-1">
                  🔒 {t("caseStudy.liveDemoDisclaimer")}
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent("LIVE_DEMO_CLICK", { slug: project.slug, name: project.name, source: "case_study_sandbox_banner" });
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-[#A65F4B] text-[#F3EFEA] px-6 py-3 rounded-xs text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.98] shadow-xs"
                >
                  <span>{t("work.visitLive")}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </section>

        {/* 9. Lightbox Modal */}
        {lightboxIndex !== null && allImages.length > 0 && (
          <ProjectLightbox
            images={allImages}
            currentIndex={lightboxIndex}
            projectName={project.name}
            onClose={() => setLightboxIndex(null)}
            onPrev={() =>
              setLightboxIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : allImages.length - 1
              )
            }
            onNext={() =>
              setLightboxIndex((prev) =>
                prev !== null ? (prev + 1) % allImages.length : 0
              )
            }
          />
        )}

        {/* 10. Next Project & Case Study Conversion CTA Banner */}
        <div className="pt-12 sm:pt-16 border-t border-[#DED6CC] space-y-12">
          
          {/* Editorial Case Study Conversion Banner */}
          <div className="p-8 sm:p-12 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 space-y-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest font-bold">
                  {t("caseStudy.nextStepsBadge")}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F3EFEA]">
                  {t("caseStudy.nextStepsHeading")}
                </h3>
                <p className="text-sm sm:text-base text-[#DED6CC]/80 leading-relaxed font-sans">
                  {t("caseStudy.nextStepsSubheading")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <Link
                  href="/#contact"
                  onClick={() => {
                    trackEvent("CTA_START_PROJECT", {
                      source: "case_study",
                      destination: "contact",
                      project: project.slug,
                    });
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-[#F3EFEA] text-[#3A171C] px-6 py-3 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all active:scale-[0.98]"
                >
                  <span>{t("caseStudy.startProject")}</span>
                  <ArrowRight className="w-4 h-4 text-[#A65F4B]" />
                </Link>
              </div>
            </div>

            {/* Direct Channel Actions: WhatsApp & Email */}
            <div className="pt-6 border-t border-[#DED6CC]/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <span className="text-[#DED6CC]/60 uppercase tracking-wider">
                {t("caseStudy.orDirect")}
              </span>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <a
                  href={`https://wa.me/212656682813?text=${encodeURIComponent(
                    isFr
                      ? `Bonjour Youssef, j'ai consulté l'étude de cas ${project.name} et j'aimerais discuter d'un projet similaire.`
                      : `Hello Youssef, I checked out the ${project.name} case study and would like to discuss a similar project.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent("WHATSAPP_CLICK", {
                      source: "case_study",
                      destination: "whatsapp",
                      project: project.slug,
                    });
                  }}
                  className="text-[#F3EFEA] hover:text-[#A65F4B] transition-colors inline-flex items-center gap-1.5 font-semibold"
                >
                  <span>WhatsApp (+212 6 56 68 28 13)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#A65F4B]" />
                </a>

                <span className="text-[#DED6CC]/30 hidden sm:inline">•</span>

                <a
                  href={`mailto:manssouriyoussef33@gmail.com?subject=${encodeURIComponent(
                    `Inquiry: Project similar to ${project.name}`
                  )}`}
                  onClick={() => {
                    trackEvent("EMAIL_CLICK", {
                      source: "case_study",
                      destination: "email",
                      project: project.slug,
                    });
                  }}
                  className="text-[#F3EFEA] hover:text-[#A65F4B] transition-colors inline-flex items-center gap-1.5 font-semibold"
                >
                  <Mail className="w-3.5 h-3.5 text-[#A65F4B]" />
                  <span>manssouriyoussef33@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Next Project Footer Navigation Link */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
            <div>
              <span className="text-xs font-mono text-[#242222]/70 uppercase tracking-widest block mb-1">
                {t("caseStudy.nextProject")}
              </span>
              <Link
                href={`/projects/${nextProject.slug}`}
                aria-label={`Explore next case study: ${nextProject.name}`}
                className="text-2xl font-bold text-[#242222] hover:text-[#A65F4B] transition-colors inline-flex items-center gap-2 group"
              >
                <span>{nextProject.name}</span>
                <ArrowRight className="w-5 h-5 text-[#A65F4B] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </article>
  );
}
