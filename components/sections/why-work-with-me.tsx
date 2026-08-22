"use client";

import React from "react";
import { Target, Smartphone, Code2, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function WhyWorkWithMe() {
  const { language, t } = useLanguage();
  const isFr = language === "fr";

  const defaultPoints = [
    {
      title: isFr ? "Approche Axée Résultats" : "Business-Driven Focus",
      description: isFr
        ? "Des fonctionnalités conçues pour répondre à vos objectifs commerciaux réels et maximiser la valeur pour vos utilisateurs."
        : "Features engineered specifically around your business objectives, ROI, and measurable user engagement.",
    },
    {
      title: isFr ? "Expérience Mobile-First" : "Responsive & Mobile-First",
      description: isFr
        ? "Interfaces réactives et fluides sur smartphones, tablettes et ordinateurs sans compromis."
        : "Flawless user experience optimized across mobile devices, tablets, and desktop displays.",
    },
    {
      title: isFr ? "Code Propre & Robuste" : "Clean Full-Stack Engineering",
      description: isFr
        ? "Code moderne (Next.js, TypeScript, Tailwind) structuré pour être maintenable, rapide et évolutif."
        : "Maintainable, scalable codebase built with Next.js, React, TypeScript, and modern best practices.",
    },
    {
      title: isFr ? "Communication Transparente" : "Direct & Clear Communication",
      description: isFr
        ? "Communication directe, livrables clairs et respect rigoureux des délais convenus."
        : "Transparent updates, responsive communication, and strict commitment to project milestones.",
    },
  ];

  const icons = [Target, Smartphone, Code2, Sparkles];

  return (
    <section id="why-me" className="py-24 md:py-32 bg-[#F3EFEA] border-t border-[#DED6CC]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-16 pb-6 border-b border-[#DED6CC]">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#A65F4B] block mb-1">
            {t("whyMe.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] mb-3">
            {t("whyMe.heading")}
          </h2>
          <p className="text-[#242222]/70 text-sm leading-relaxed">
            {t("whyMe.subheading")}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
          {defaultPoints.map((pillar: any, idx: number) => {
            const Icon = icons[idx % icons.length];
            return (
              <div key={pillar.title} className="border-b border-[#DED6CC] pb-8 space-y-3">
                <div className="w-10 h-10 rounded-xs bg-[#3A171C] text-[#F3EFEA] flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5 text-[#A65F4B]" />
                </div>
                <h3 className="text-lg font-bold text-[#242222] tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-[#242222]/80 text-xs leading-relaxed">
                  {pillar.description}
                </p>
                <div className="pt-2 text-[10px] font-mono text-[#A65F4B] uppercase tracking-widest font-semibold">
                  PILLAR 0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
