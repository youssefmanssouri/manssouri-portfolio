"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";
import { PROCESS_STEPS } from "@/data/process";

export function Process() {
  const { language, t } = useLanguage();
  const isFr = language === "fr";

  const frSteps = [
    {
      step: "01",
      title: "Découverte",
      subtitle: "Comprendre les objectifs de l'entreprise",
      description:
        "Nous commençons par définir vos objectifs commerciaux, votre public cible, vos fonctionnalités clés et le périmètre du projet.",
    },
    {
      step: "02",
      title: "Planification",
      subtitle: "Architecture & structure",
      description:
        "Cartographie de l'architecture du site, des parcours utilisateurs, du schéma de base de données et du choix des technologies.",
    },
    {
      step: "03",
      title: "Design UI",
      subtitle: "Direction visuelle & interfaces",
      description:
        "Création d'interfaces élégantes, système de composants sur-mesure, typographie et états interactifs adaptés à votre marque.",
    },
    {
      step: "04",
      title: "Développement",
      subtitle: "Code propre & intégration",
      description:
        "Développement avec les technologies modernes (Next.js, React, TypeScript, Tailwind CSS). Code propre, maintenable et rapide.",
    },
    {
      step: "05",
      title: "Test & Qualité",
      subtitle: "Performance & réactivité",
      description:
        "Audit rigoureux des fonctionnalités, compatibilité mobile et tablette, accessibilité et optimisation de la vitesse de chargement.",
    },
    {
      step: "06",
      title: "Déploiement",
      subtitle: "Mise en ligne & accompagnement",
      description:
        "Configuration de l'hébergement de production, du nom de domaine, des certificats SSL et livraison de la documentation complète.",
    },
  ];

  const stepsToRender = isFr ? frSteps : PROCESS_STEPS;

  return (
    <section id="process" className="py-24 md:py-32 bg-[#F3EFEA]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 pb-6 border-b border-[#DED6CC]">
          <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-1 font-semibold">
            03 / {t("process.badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] mb-3">
            {t("process.heading")}
          </h2>
          <p className="text-[#242222]/70 text-sm leading-relaxed">
            {t("process.subheading")}
          </p>
        </div>

        {/* 6-Step Asymmetrical Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          {stepsToRender.map((item: any) => (
            <div key={item.step || item.title} className="border-b border-[#DED6CC] pb-8 space-y-3">
              <span className="text-xs font-mono text-[#A65F4B] font-bold block">
                {item.step}
              </span>
              <h3 className="text-lg font-bold text-[#242222] tracking-tight">
                {item.title}
              </h3>
              <p className="text-[#242222]/60 text-xs font-mono uppercase tracking-wider">
                {item.subtitle}
              </p>
              <p className="text-[#242222]/80 text-xs leading-relaxed pt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
