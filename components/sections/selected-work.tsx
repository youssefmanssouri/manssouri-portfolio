"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, Project } from "@/data/projects";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function SelectedWork() {
  const { t, language } = useLanguage();

  return (
    <section id="work" className="py-24 md:py-32 bg-[#F3EFEA]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#DED6CC]">
          <div>
            <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-1 font-semibold">
              01 / {t("work.badge")}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222]">
              {t("work.heading")}
            </h2>
          </div>
          <p className="text-[#242222]/70 text-sm max-w-sm mt-3 md:mt-0 leading-relaxed">
            {t("work.subheading")}
          </p>
        </div>

        {/* Editorial Case Study Compositions */}
        <div className="space-y-24">
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
  const shortDesc = language === "fr" ? project.shortDescriptionFr : project.shortDescription;
  const category = language === "fr" ? project.categoryFr : project.category;
  const role = language === "fr" ? project.roleFr : project.role;
  const itemNum = `0${index + 1}`;

  const isFlagship = project.id === "businessos";
  const isDarkCard = isFlagship || project.id === "gym-crm";

  if (isDarkCard) {
    return (
      <div className={`rounded-xs bg-[#3A171C] text-[#F3EFEA] border p-8 sm:p-10 lg:p-12 shadow-xl space-y-8 ${isFlagship ? 'border-[#A65F4B]/60 ring-1 ring-[#A65F4B]/30' : 'border-[#DED6CC]/20'}`}>
        {isFlagship && (
          <div className="flex items-center justify-between border-b border-[#DED6CC]/20 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#A65F4B]/20 border border-[#A65F4B]/40 text-[#F3EFEA] text-[11px] font-mono uppercase tracking-widest font-semibold">
              <span>★ {language === "fr" ? "Projet Phare" : "Flagship Case Study"}</span>
            </div>
            <span className="text-xs font-mono text-[#DED6CC]/70 hidden sm:inline font-medium">
              {language === "fr" ? "Plateforme Opérationnelle Unifiée" : "Unified Business Operations Center"}
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#DED6CC]/80">
                <span className="text-[#A65F4B] font-bold">{itemNum}</span>
                <span>·</span>
                <span className="uppercase">{category}</span>
                <span>·</span>
                <span className="text-[#DED6CC]/60">{role}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F3EFEA] tracking-tight">
                {project.name}
              </h3>
            </div>

            <p className="text-[#DED6CC]/90 text-sm leading-relaxed">
              {shortDesc}
            </p>

            {project.metrics && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xs bg-[#F3EFEA]/10 border border-[#DED6CC]/20">
                {project.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="space-y-0.5 border-l-2 border-[#A65F4B] pl-2">
                    <span className="text-lg font-bold font-mono text-[#F3EFEA] block leading-none">{m.value}</span>
                    <span className="text-[10px] font-mono text-[#DED6CC]/80 uppercase tracking-wider block font-semibold">{language === "fr" ? m.labelFr : m.label}</span>
                  </div>
                ))}
              </div>
            )}

            {isFlagship && (
              <div className="p-3.5 rounded-xs bg-[#F3EFEA]/5 border border-[#DED6CC]/15 text-xs text-[#DED6CC]/85 space-y-2 font-sans">
                <div className="flex items-baseline gap-2">
                  <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">{language === "fr" ? "Problème:" : "Problem:"}</span>
                  <span className="text-[#DED6CC]/75">{language === "fr" ? "Outils métiers fragmentés (CRM, factures, RH, trésorerie)." : "Fragmented SaaS subscriptions for CRM, billing, bookings & cash flow."}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">{language === "fr" ? "Solution:" : "Solution:"}</span>
                  <span className="text-[#F3EFEA] font-medium">{language === "fr" ? "Centre de contrôle d'entreprise unifié dans une seule interface." : "Single unified operational command center for all core business workflows."}</span>
                </div>
                <div className="flex items-baseline gap-2 pt-1 border-t border-[#DED6CC]/10">
                  <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">{language === "fr" ? "Valeur Métier:" : "Business Value:"}</span>
                  <span className="text-[#DED6CC]/90 italic-serif">{language === "fr" ? "Centralise la gestion quotidienne et réduit les coûts d'abonnements logiciels." : "Centralizes daily management and eliminates software fragmentation overhead."}</span>
                </div>
              </div>
            )}

            {project.id === "gym-crm" && (
              <div className="p-3.5 rounded-xs bg-[#F3EFEA]/5 border border-[#DED6CC]/15 text-xs text-[#DED6CC]/85 space-y-2 font-sans">
                <div className="flex items-baseline gap-2">
                  <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">{language === "fr" ? "Problème:" : "Problem:"}</span>
                  <span className="text-[#DED6CC]/75">{language === "fr" ? "Suivi manuel des abonnés et pointages d'accueil au comptoir." : "Manual desk check-ins, untracked membership renewals & scheduling friction."}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">{language === "fr" ? "Solution:" : "Solution:"}</span>
                  <span className="text-[#F3EFEA] font-medium">{language === "fr" ? "Application de gestion d'accueil avec alertes de validité du forfait." : "Gym operations app with instant member search, renewal alerts & revenue logs."}</span>
                </div>
                <div className="flex items-baseline gap-2 pt-1 border-t border-[#DED6CC]/10">
                  <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">{language === "fr" ? "Valeur Métier:" : "Business Value:"}</span>
                  <span className="text-[#DED6CC]/90 italic-serif">{language === "fr" ? "Accélère l'accueil et prévient les pertes de chiffre d'affaires liées aux forfaits expirés." : "Speeds up front-desk check-ins and prevents expired membership revenue loss."}</span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-xs bg-[#F3EFEA]/10 border border-[#DED6CC]/20 text-[#F3EFEA] font-mono text-[11px]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/projects/${project.slug}`}
                  prefetch={true}
                  className="inline-flex items-center gap-1.5 bg-[#F3EFEA] text-[#3A171C] px-4 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all active:scale-[0.98]"
                >
                  {t("work.viewCaseStudy")}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                {project.hasLiveDemo && project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#A65F4B] text-[#F3EFEA] px-4 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.98]"
                  >
                    {t("work.visitLive")}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-transparent border border-[#DED6CC]/40 text-[#F3EFEA] px-4 py-2.5 rounded-xs text-xs font-medium uppercase tracking-wider hover:bg-[#F3EFEA]/10 transition-all active:scale-[0.98]"
                >
                  {t("work.github")}
                </a>
              </div>

              {(isFlagship || project.id === "gym-crm") && project.hasLiveDemo && (
                <p className="text-[11px] font-mono text-[#DED6CC]/60 pt-1">
                  🔒 {language === "fr" ? "Démonstration interactive — environnement sécurisé en lecture seule avec données synthétiques." : "Interactive demo — read-only environment with synthetic data."}
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            <Link
              href={`/projects/${project.slug}`}
              prefetch={true}
              className="block relative aspect-[16/10] rounded-xs overflow-hidden border border-[#DED6CC]/20 bg-[#2D1216] group"
            >
              <Image
                src={project.heroImage}
                alt={project.name}
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
    <div className="border-b border-[#DED6CC] pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Real Product Image Showcase */}
        <div className="lg:col-span-7 lg:order-1">
          <Link
            href={`/projects/${project.slug}`}
            prefetch={true}
            className="block relative aspect-[16/10] rounded-xs overflow-hidden border border-[#DED6CC] bg-[#3A171C] group"
          >
            <Image
              src={project.heroImage}
              alt={project.name}
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
              <span className="uppercase">{category}</span>
              <span>·</span>
              <span className="text-[#242222]/60">{role}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#242222] tracking-tight">
              {project.name}
            </h3>
          </div>

          <p className="text-[#242222]/80 text-sm leading-relaxed">
            {shortDesc}
          </p>

          <div className="p-3.5 rounded-xs bg-[#242222]/5 border border-[#DED6CC] text-xs text-[#242222] space-y-2 font-sans">
            <div className="flex items-baseline gap-2">
              <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">{language === "fr" ? "Problème:" : "Problem:"}</span>
              <span className="text-[#242222]/80">{language === "fr" ? "Boutiques génériques manquant de filtrage par caractéristiques olfactives." : "Generic e-commerce stores lacking product note filtering & brand elegance."}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">{language === "fr" ? "Solution:" : "Solution:"}</span>
              <span className="text-[#242222] font-medium">{language === "fr" ? "Boutique en ligne sur mesure avec filtrage olfactif et gestion du panier." : "Bespoke online boutique with scent pyramid filtering, slide-out cart & admin dashboard."}</span>
            </div>
            <div className="flex items-baseline gap-2 pt-1 border-t border-[#DED6CC]">
              <span className="text-[#A65F4B] font-mono text-[10px] uppercase tracking-wider font-bold shrink-0">{language === "fr" ? "Valeur Métier:" : "Business Value:"}</span>
              <span className="text-[#242222]/90 italic-serif">{language === "fr" ? "Valorise l'image de marque, accélère la découverte produit et simplifie la vente." : "Elevates brand positioning, speeds up product discovery and streamlines order prep."}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-xs bg-[#242222]/5 border border-[#DED6CC] text-[#242222] font-mono text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              href={`/projects/${project.slug}`}
              prefetch={true}
              className="inline-flex items-center gap-1.5 bg-[#3A171C] text-[#F3EFEA] px-4 py-2 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-[#2D1216] transition-all active:scale-[0.98]"
            >
              {t("work.viewCaseStudy")}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {project.hasLiveDemo && project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#A65F4B] text-[#F3EFEA] px-4 py-2 rounded-xs text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-all active:scale-[0.98]"
              >
                {t("work.visitLive")}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-transparent border border-[#3A171C] text-[#3A171C] px-4 py-2 rounded-xs text-xs font-medium uppercase tracking-wider hover:bg-[#3A171C]/5 transition-all active:scale-[0.98]"
            >
              {t("work.github")}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
});
