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
          <div className="lg:col-span-8 space-y-12">
            
            {/* Business Problem vs Solution Grid (Flagship BusinessOS Only) */}
            {project.id === "businessos" ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xs bg-[#3A171C]/5 border border-[#3A171C]/20 space-y-3">
                    <div className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest font-bold">
                      01 / {isFr ? "Problème Métier" : "The Business Problem"}
                    </div>
                    <h3 className="text-lg font-bold text-[#3A171C]">
                      {isFr ? "Fragmentation Opérationnelle & Silos de Données" : "Operational Fragmentation & Tool Silos"}
                    </h3>
                    <p className="text-xs text-[#242222]/80 leading-relaxed">
                      {isFr 
                        ? "Les entreprises en croissance gèrent leurs opérations avec un empilement d'outils SaaS déconnectés : un CRM pour les prospects, un logiciel séparé pour la facturation, un calendrier externe pour les rendez-vous et des fichiers Excel pour les RH et la trésorerie. Cette fragmentation engorde les coûts et crée des failles de suivi."
                        : "Growing businesses operate on a fragmented stack of disconnected tools: one SaaS for leads, another for invoicing, an external calendar for bookings, and spreadsheets for HR and cash flow. This fragmentation inflates software costs, creates data silos, and wastes valuable operational hours."}
                    </p>
                  </div>

                  <div className="p-6 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 space-y-3 shadow-md">
                    <div className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest font-bold">
                      02 / {isFr ? "La Solution BusinessOS" : "The BusinessOS Solution"}
                    </div>
                    <h3 className="text-lg font-bold text-[#F3EFEA]">
                      {isFr ? "Centre de Commande Opérationnel Unifié" : "Unified Operational Command Center"}
                    </h3>
                    <p className="text-xs text-[#DED6CC]/80 leading-relaxed">
                      {isFr 
                        ? "BusinessOS rassemble l'ensemble des parcours métiers dans un centre de contrôle unique. Les équipes pilotent prospects, factures payées, plannings de rendez-vous et flux de trésorerie sans jamais quitter l'interface, avec un contrôle d'accès par rôle sécurisé."
                        : "BusinessOS unifies all enterprise operations into a single cohesive workspace. Teams manage pipelines, itemized invoices, resource calendars, employee rosters, and live cash flow without ever context-switching, protected by role-based access control."}
                    </p>
                  </div>
                </div>

                {/* 7 Core Modules Showcase Grid */}
                <div className="space-y-4 pt-4">
                  <h2 className="text-xl font-bold text-[#242222]">
                    {isFr ? "Les 7 Modules Opérationnels Clés" : "7 Core Operational Modules"}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xs border border-[#DED6CC] bg-white/50 space-y-1">
                      <h4 className="text-sm font-bold text-[#242222]">1. Executive Command Center</h4>
                      <p className="text-xs text-[#242222]/70">Live revenue metrics, active pipeline telemetry, and audit logging.</p>
                    </div>
                    <div className="p-4 rounded-xs border border-[#DED6CC] bg-white/50 space-y-1">
                      <h4 className="text-sm font-bold text-[#242222]">2. CRM & Sales Pipeline</h4>
                      <p className="text-xs text-[#242222]/70">Multi-stage deal tracking, prospect stages, and client database.</p>
                    </div>
                    <div className="p-4 rounded-xs border border-[#DED6CC] bg-white/50 space-y-1">
                      <h4 className="text-sm font-bold text-[#242222]">3. Itemized Billing & Invoicing</h4>
                      <p className="text-xs text-[#242222]/70">Automatic tax/subtotal calculation, payment states, and PDF-style layout.</p>
                    </div>
                    <div className="p-4 rounded-xs border border-[#DED6CC] bg-white/50 space-y-1">
                      <h4 className="text-sm font-bold text-[#242222]">4. Resource Booking Calendar</h4>
                      <p className="text-xs text-[#242222]/70">Client appointment scheduling, staff capacity, and service duration matrix.</p>
                    </div>
                    <div className="p-4 rounded-xs border border-[#DED6CC] bg-white/50 space-y-1">
                      <h4 className="text-sm font-bold text-[#242222]">5. HR Directory & RBAC</h4>
                      <p className="text-xs text-[#242222]/70">Department rosters, staff directory, and role-based permissions (Admin, Manager, Staff).</p>
                    </div>
                    <div className="p-4 rounded-xs border border-[#DED6CC] bg-white/50 space-y-1">
                      <h4 className="text-sm font-bold text-[#242222]">6. Finance & Recharts Analytics</h4>
                      <p className="text-xs text-[#242222]/70">Real-time ledger, revenue velocity area charts, and multidimensional reports.</p>
                    </div>
                    <div className="p-4 rounded-xs border border-[#DED6CC] bg-white/50 sm:col-span-2 space-y-1">
                      <h4 className="text-sm font-bold text-[#242222]">7. Task Workflow & DEMO_MODE Security</h4>
                      <p className="text-xs text-[#242222]/70">Kanban task management board coupled with server-enforced mutation guards protecting database integrity during live public exploration.</p>
                    </div>
                  </div>
                </div>

                {/* Technical Architecture Breakdown */}
                <div className="space-y-4 pt-4 border-t border-[#DED6CC]">
                  <h2 className="text-xl font-bold text-[#242222]">
                    {isFr ? "Architecture Technique Verified" : "Verified Technical Architecture"}
                  </h2>
                  <div className="p-6 rounded-xs bg-[#3A171C]/5 border border-[#3A171C]/15 space-y-3 font-mono text-xs text-[#242222]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-[#A65F4B] font-bold block mb-1">FRAMEWORK & RUNTIME</span>
                        <p className="text-[#242222]/80 font-sans">Next.js 15 (App Router), React 19, TypeScript 5.7, Tailwind CSS 3.4.</p>
                      </div>
                      <div>
                        <span className="text-[#A65F4B] font-bold block mb-1">DATA ARCHITECTURE</span>
                        <p className="text-[#242222]/80 font-sans">Prisma 6.3 ORM with 15 relational schema models & PostgreSQL database.</p>
                      </div>
                      <div>
                        <span className="text-[#A65F4B] font-bold block mb-1">SERVER ACTIONS & MUTATIONS</span>
                        <p className="text-[#242222]/80 font-sans">Zero API boilerplate using Next.js Server Actions with Zod validations.</p>
                      </div>
                      <div>
                        <span className="text-[#A65F4B] font-bold block mb-1">DEMO SECURITY BOUNDARY</span>
                        <p className="text-[#242222]/80 font-sans">Server-only `DEMO_MODE=true` environment guards blocking database writes.</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <>
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
              </>
            )}

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

            {/* Live Demo Dedicated Banner */}
            {project.hasLiveDemo && project.liveUrl && (
              <div className="p-6 rounded-xs bg-[#F3EFEA] border border-[#A65F4B]/40 space-y-4 shadow-sm">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-[#A65F4B] uppercase tracking-widest font-bold">
                    {isFr ? "DÉMONSTRATION EN DIRECT" : "LIVE PUBLIC DEMO"}
                  </span>
                  <h4 className="text-base font-bold text-[#242222]">
                    {isFr ? "Explorer l'application" : "Explore BusinessOS Live"}
                  </h4>
                </div>
                <p className="text-xs text-[#242222]/70 leading-relaxed">
                  {isFr 
                    ? "Accédez immédiatement au tableau de bord, au CRM et aux factures dans un environnement sécurisé."
                    : "Access the dashboard, CRM, invoices, and analytics instantly in a safe, read-only demo environment."}
                </p>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#A65F4B] text-white px-4 py-2.5 rounded-xs text-xs font-medium uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.98]"
                >
                  <span>{t("work.visitLive")}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-[10px] font-mono text-[#242222]/60 text-center">
                  🔒 Read-only environment · Synthetic data
                </p>
              </div>
            )}
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
              className="absolute top-4 right-4 text-[#F3EFEA] p-3 min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-[#A65F4B] transition-colors"
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
              className="absolute left-2 sm:left-4 text-[#F3EFEA] p-3 min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-[#A65F4B] transition-colors"
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
              className="absolute right-2 sm:right-4 text-[#F3EFEA] p-3 min-w-[44px] min-h-[44px] flex items-center justify-center hover:text-[#A65F4B] transition-colors"
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
