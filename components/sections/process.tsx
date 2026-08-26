"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";

export function Process() {
  const { language } = useLanguage();
  const isFr = language === "fr";

  const stages = [
    {
      step: "01",
      title: isFr ? "Découverte & Cadrage" : "Discovery & Scope",
      duration: isFr ? "1–2 jours" : "1–2 days",
      description: isFr
        ? "Comprendre l'entreprise, définir les besoins et valider le périmètre du projet."
        : "Understand the business, define the requirements, and agree on the project scope.",
    },
    {
      step: "02",
      title: isFr ? "Design & Architecture" : "Design & Architecture",
      duration: isFr ? "2–5 jours" : "2–5 days",
      description: isFr
        ? "Concevoir l'expérience utilisateur, la structure d'interface, l'architecture technique et l'approche d'implémentation."
        : "Plan the user experience, interface structure, technical architecture, and implementation approach.",
    },
    {
      step: "03",
      title: isFr ? "Développement" : "Development",
      duration: isFr ? "1–3+ semaines" : "1–3+ weeks",
      description: isFr
        ? "Développer les fonctionnalités convenues, les intégrations, les interfaces réactives et le cœur de l'application."
        : "Build the agreed features, integrations, responsive interfaces, and core functionality.",
    },
    {
      step: "04",
      title: isFr ? "Tests & Lancement" : "Testing & Launch",
      duration: isFr ? "2–5 jours" : "2–5 days",
      description: isFr
        ? "Tester le produit, corriger les anomalies, optimiser l'expérience finale et préparer la mise en ligne."
        : "Test the product, resolve issues, optimize the final experience, and prepare the deployment.",
    },
  ];

  return (
    <section id="process" className="py-24 md:py-32 bg-[#F3EFEA]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 pb-6 border-b border-[#DED6CC]">
          <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-1 font-semibold">
            03 / {isFr ? "DÉLAIS DU PROJET" : "PROJECT TIMELINE"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] mb-3 leading-tight">
            {isFr ? "Planning Type de Projet" : "Typical Project Timeline"}
          </h2>
          <p className="text-[#242222]/80 text-base leading-relaxed">
            {isFr
              ? "Chaque projet est cadré selon ses besoins, les délais varient donc. Un projet type suit ces étapes :"
              : "Every project is scoped around its requirements, so timelines vary. A typical project follows these stages:"}
          </p>
        </div>

        {/* 4-Stage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stages.map((stage) => (
            <div
              key={stage.step}
              className="p-6 rounded-xs bg-white/60 border border-[#DED6CC] flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#A65F4B] font-bold">
                    {stage.step}
                  </span>
                  <span className="px-2.5 py-1 rounded-xs bg-[#3A171C]/5 border border-[#3A171C]/15 text-[#3A171C] font-mono text-[11px] font-semibold">
                    {stage.duration}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#242222] tracking-tight">
                  {stage.title}
                </h3>
                <p className="text-[#242222]/80 text-xs leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Estimation Disclaimer Note */}
        <div className="mt-10 p-4 rounded-xs bg-[#3A171C]/5 border border-[#DED6CC] text-xs text-[#242222]/80 font-sans leading-relaxed">
          <span className="font-mono text-[#A65F4B] font-bold uppercase tracking-wider block mb-1">
            {isFr ? "INFORMATIONS SUR LES DÉLAIS" : "TIMELINE ESTIMATES & FLEXIBILITY"}
          </span>
          <p>
            {isFr
              ? "Remarque : Ces durées d'étape sont des estimations. Les délais réels dépendent de l'étendue du projet, de la complexité des fonctionnalités, des cycles de retours, des intégrations et de vos exigences spécifiques."
              : "Note: These stage durations are estimates. Actual project timelines depend on overall scope, feature complexity, feedback iterations, third-party integrations, and specific client requirements."}
          </p>
        </div>

      </div>
    </section>
  );
}
