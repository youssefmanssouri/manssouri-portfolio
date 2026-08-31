"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, Project } from "@/data/projects";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics";

export function SelectedWork() {
  const { t, language } = useLanguage();

  return (
    <section id="work" className="py-16 sm:py-20 md:py-28 lg:py-32 bg-[#F3EFEA]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#DED6CC]">
          <div className="max-w-2xl">
            <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-2 font-semibold">
              01 / {t("work.badge")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] leading-tight">
              {t("work.heading")}
            </h2>
          </div>
          <p className="text-[#242222]/80 text-sm sm:text-base max-w-md mt-4 md:mt-0 leading-relaxed">
            {t("work.subheading")}
          </p>
        </div>

        {/* Editorial Case Study Compositions */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {PROJECTS.map((project, idx) => (
            <ProjectEditorialItem key={project.id} project={project} index={idx} language={language} t={t} />
          ))}
        </div>

      </div>
    </section>
  );
}

const ProjectEditorialItem = React.memo(function ProjectEditorialItem({
  project,
  index,
  language,
  t
}: {
  project: Project;
  index: number;
  language: string;
  t: (key: string) => string;
}) {
  const isFr = language === "fr";
  const shortDesc = isFr ? project.shortDescriptionFr : project.shortDescription;
  const category = isFr ? project.categoryFr : project.category;
  const itemNum = `0${index + 1}`;

  const isFlagship = project.id === "businessos";
  const isDarkCard = isFlagship || project.id === "gym-crm";

  // Business value and problem/solution data derived from actual project implementations
  const projectDetails: Record<string, {
    problemEn: string;
    problemFr: string;
    solutionEn: string;
    solutionFr: string;
    valueEn: string;
    valueFr: string;
    keyTechs: string[];
  }> = {
    businessos: {
      problemEn: "Growing businesses struggle with separate, disconnected tools for CRM, invoicing, client bookings, and cash flow tracking.",
      problemFr: "Les entreprises jonglent souvent entre des outils séparés pour le CRM, la facturation, la prise de rendez-vous et le suivi de trésorerie.",
      solutionEn: "A unified business management platform integrating client pipelines, itemized billing, calendar scheduling, team rosters, and cash flow tracking.",
      solutionFr: "Une plateforme d'opérations unifiée intégrant pipeline commercial, facturation détaillée, calendrier de réservation, annuaire RH et trésorerie.",
      valueEn: "Centralizes core business workflows in a single operational workspace, giving teams clearer visibility across day-to-day activity and financial data.",
      valueFr: "Centralise les flux métiers essentiels dans un espace opérationnel unique, offrant aux équipes une visibilité plus claire sur l'activité quotidienne et les données financières.",
      keyTechs: ["Next.js 15 (App Router)", "TypeScript", "PostgreSQL", "Prisma ORM", "Recharts"]
    },
    "lumiere-parfums": {
      problemEn: "Online fragrance shoppers cannot physically smell products through a screen, making standard e-commerce grid layouts ineffective for discovery.",
      problemFr: "Les clients ne pouvant pas sentir une fragrance à travers un écran, les grilles e-commerce classiques ne suffisent pas à guider le choix.",
      solutionEn: "A custom digital boutique featuring olfactory note and scent pyramid filtering, a persistent slide-out cart, and store inventory administration.",
      solutionFr: "Une boutique en ligne sur mesure avec filtrage par notes olfactives et pyramide de senteurs, panier latéral persistant et gestion des stocks.",
      valueEn: "Makes fragrance discovery easier through structured scent information, clearer product comparison, and a continuous path from browsing to purchase.",
      valueFr: "Facilite la découverte olfactive grâce à des informations de senteur structurées, une comparaison produit plus claire et un parcours continu de la visite à l'achat.",
      keyTechs: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Persistent Cart", "Responsive UI"]
    },
    "gym-crm": {
      problemEn: "Fitness facilities experience front-desk check-in congestion, unmonitored expired memberships, and disjointed class schedules.",
      problemFr: "Les salles de sport font face à des ralentissements à l'accueil, des forfaits expirés non détectés et des plannings de cours dispersés.",
      solutionEn: "A dedicated gym operations application delivering rapid member lookups, visual renewal status indicators, class capacity planning, and recurring revenue summaries.",
      solutionFr: "Une application d'exploitation offrant des recherches rapides d'adhérents, des alertes de statut, la gestion des cours et le suivi des revenus.",
      valueEn: "Helps staff manage member check-ins, identify expired memberships, organize class capacity, and monitor recurring revenue data from a centralized interface.",
      valueFr: "Aide l'équipe à gérer les pointages des membres, identifier les forfaits expirés, organiser les jauges de cours et suivre les revenus récurrents depuis une interface centralisée.",
      keyTechs: ["Next.js", "TypeScript", "PostgreSQL", "Prisma ORM", "Role-Based Access"]
    }
  };

  const details = projectDetails[project.id];

  if (isDarkCard) {
    return (
      <div className={`rounded-xs bg-[#3A171C] text-[#F3EFEA] border p-5 sm:p-8 lg:p-12 shadow-xl space-y-6 sm:space-y-8 transition-all ${isFlagship ? 'border-[#A65F4B]/60 ring-1 ring-[#A65F4B]/30' : 'border-[#DED6CC]/20'}`}>
        {isFlagship && (
          <div className="flex items-center justify-between border-b border-[#DED6CC]/20 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#A65F4B]/20 border border-[#A65F4B]/40 text-[#F3EFEA] text-[11px] font-mono uppercase tracking-widest font-semibold">
              <span>★ {isFr ? "Projet Phare" : "Flagship Project"}</span>
            </div>
            <span className="text-xs font-mono text-[#DED6CC]/70 hidden sm:inline font-medium">
              {isFr ? "Plateforme Métier Complète" : "Complete Business Operations Suite"}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#DED6CC]/80">
                <span className="text-[#A65F4B] font-bold">{itemNum}</span>
                <span>·</span>
                <span className="uppercase tracking-wider font-semibold text-[#DED6CC]">{category}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F3EFEA] tracking-tight">
                {project.name}
              </h3>
            </div>

            <p className="text-[#DED6CC]/90 text-sm sm:text-base leading-relaxed">
              {shortDesc}
            </p>

            {details && (
              <div className="p-4 rounded-xs bg-[#F3EFEA]/5 border border-[#DED6CC]/15 text-xs text-[#DED6CC]/85 space-y-2.5 font-sans">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">
                    {isFr ? "Problème:" : "Problem:"}
                  </span>
                  <span className="text-[#DED6CC]/80 leading-relaxed">
                    {isFr ? details.problemFr : details.problemEn}
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">
                    {isFr ? "Solution:" : "Solution:"}
                  </span>
                  <span className="text-[#F3EFEA] font-medium leading-relaxed">
                    {isFr ? details.solutionFr : details.solutionEn}
                  </span>
                </div>
                <div className="flex items-baseline gap-2.5 pt-2 border-t border-[#DED6CC]/10">
                  <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">
                    {isFr ? "Valeur Métier:" : "Business Value:"}
                  </span>
                  <span className="text-[#DED6CC]/95 font-medium leading-relaxed">
                    {isFr ? details.valueFr : details.valueEn}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap gap-1.5">
                {(details?.keyTechs || project.technologies.slice(0, 5)).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-xs bg-[#F3EFEA]/10 border border-[#DED6CC]/20 text-[#F3EFEA] font-mono text-[11px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/projects/${project.slug}`}
                  prefetch={true}
                  aria-label={`${t("work.viewCaseStudy")}: ${project.name}`}
                  className="inline-flex items-center gap-1.5 bg-[#F3EFEA] text-[#3A171C] px-4 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
                >
                  {t("work.viewCaseStudy")}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                {project.hasLiveDemo && project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("work.visitLive")}: ${project.name}`}
                    onClick={() => {
                      trackEvent("LIVE_DEMO_CLICK", { slug: project.slug, name: project.name, source: "selected_work" });
                    }}
                    className="inline-flex items-center gap-1.5 bg-[#A65F4B] text-[#F3EFEA] px-4 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
                  >
                    {t("work.visitLive")}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} ${t("work.github")}`}
                  onClick={() => {
                    trackEvent("GITHUB_CLICK", { slug: project.slug, source: "selected_work" });
                  }}
                  className="inline-flex items-center gap-1.5 bg-transparent border border-[#DED6CC]/40 text-[#F3EFEA] px-4 py-2.5 rounded-xs text-xs font-medium uppercase tracking-wider hover:bg-[#F3EFEA]/10 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
                >
                  {t("work.github")}
                </a>
              </div>

              {(isFlagship || project.id === "gym-crm") && project.hasLiveDemo && (
                <p className="text-[11px] font-mono text-[#DED6CC]/60 pt-1">
                  🔒 {isFr ? "Démonstration interactive — environnement sécurisé en lecture seule avec données de test." : "Interactive demo — read-only environment with synthetic data."}
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <Link
              href={`/projects/${project.slug}`}
              prefetch={true}
              aria-label={`Explore the ${project.name} case study`}
              className="block relative aspect-[16/10] rounded-xs overflow-hidden border border-[#DED6CC]/20 bg-[#2D1216] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
            >
              <Image
                src={project.heroImage}
                alt={`${project.name} — ${shortDesc}`}
                fill
                className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // Light Editorial Card (Lumière Parfums)
  return (
    <div className="border border-[#DED6CC] bg-[#FAF7F2] p-5 sm:p-8 lg:p-12 rounded-xs shadow-sm space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* Real Product Image Showcase */}
        <div className="lg:col-span-7 lg:order-1">
          <Link
            href={`/projects/${project.slug}`}
            prefetch={true}
            aria-label={`Explore the ${project.name} case study`}
            className="block relative aspect-[16/10] rounded-xs overflow-hidden border border-[#DED6CC] bg-[#3A171C] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
          >
            <Image
              src={project.heroImage}
              alt={`${project.name} — ${shortDesc}`}
              fill
              className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </Link>
        </div>

        {/* Information Right */}
        <div className="lg:col-span-5 lg:order-2 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#242222]/70">
              <span className="text-[#A65F4B] font-bold">{itemNum}</span>
              <span>·</span>
              <span className="uppercase tracking-wider font-semibold text-[#242222]">{category}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#242222] tracking-tight">
              {project.name}
            </h3>
          </div>

          <p className="text-[#242222]/85 text-sm sm:text-base leading-relaxed">
            {shortDesc}
          </p>

          {details && (
            <div className="p-4 rounded-xs bg-[#242222]/5 border border-[#DED6CC] text-xs text-[#242222] space-y-2.5 font-sans">
              <div className="flex items-baseline gap-2.5">
                <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">
                  {isFr ? "Problème:" : "Problem:"}
                </span>
                <span className="text-[#242222]/80 leading-relaxed">
                  {isFr ? details.problemFr : details.problemEn}
                </span>
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">
                  {isFr ? "Solution:" : "Solution:"}
                </span>
                <span className="text-[#242222] font-medium leading-relaxed">
                  {isFr ? details.solutionFr : details.solutionEn}
                </span>
              </div>
              <div className="flex items-baseline gap-2.5 pt-2 border-t border-[#DED6CC]">
                <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">
                  {isFr ? "Valeur Métier:" : "Business Value:"}
                </span>
                <span className="text-[#242222]/95 font-medium leading-relaxed">
                  {isFr ? details.valueFr : details.valueEn}
                </span>
              </div>
            </div>
          )}

          <div className="space-y-3 pt-1">
            <div className="flex flex-wrap gap-1.5">
              {(details?.keyTechs || project.technologies.slice(0, 5)).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-xs bg-[#242222]/5 border border-[#DED6CC] text-[#242222] font-mono text-[11px]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/projects/${project.slug}`}
                prefetch={true}
                aria-label={`${t("work.viewCaseStudy")}: ${project.name}`}
                className="inline-flex items-center gap-1.5 bg-[#3A171C] text-[#F3EFEA] px-4 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-[#2D1216] transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
              >
                {t("work.viewCaseStudy")}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {project.hasLiveDemo && project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t("work.visitLive")}: ${project.name}`}
                  onClick={() => {
                    trackEvent("LIVE_DEMO_CLICK", { slug: project.slug, name: project.name, source: "selected_work" });
                  }}
                  className="inline-flex items-center gap-1.5 bg-[#A65F4B] text-[#F3EFEA] px-4 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
                >
                  {t("work.visitLive")}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} ${t("work.github")}`}
                onClick={() => {
                  trackEvent("GITHUB_CLICK", { slug: project.slug, source: "selected_work" });
                }}
                className="inline-flex items-center gap-1.5 bg-transparent border border-[#3A171C] text-[#3A171C] px-4 py-2.5 rounded-xs text-xs font-medium uppercase tracking-wider hover:bg-[#3A171C]/5 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
              >
                {t("work.github")}
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
});
