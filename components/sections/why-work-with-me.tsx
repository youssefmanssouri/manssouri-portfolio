"use client";

import React from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { Target, Smartphone, Code2, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function WhyWorkWithMe() {
  const { t } = useLanguage();

  const points = (t("whyMe.points") as any) || [];
  const icons = [Target, Smartphone, Code2, Sparkles];

  return (
    <section id="why-me" className="py-24 md:py-32 bg-[#090a0f] relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <FadeIn direction="up">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-blue-400 block mb-3">
              {t("whyMe.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {t("whyMe.heading")}
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              {t("whyMe.subheading")}
            </p>
          </FadeIn>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(points) && points.map((pillar: any, idx: number) => {
            const Icon = icons[idx % icons.length];
            return (
              <FadeIn key={pillar.title || idx} direction="up" delay={0.1 * (idx + 1)}>
                <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-6 md:p-8 hover:border-slate-700 hover:bg-slate-900/70 transition-all duration-300 h-full flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="pt-6 mt-4 border-t border-slate-800/50 flex items-center text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    Pillar 0{idx + 1}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}
