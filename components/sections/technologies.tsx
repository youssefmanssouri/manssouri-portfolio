"use client";

import React from "react";
import { TECHNOLOGIES } from "@/data/technologies";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n/context";

export function Technologies() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-[#0c0d14] relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <FadeIn direction="up">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-blue-400 block mb-3">
              {t("technologies.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {t("technologies.heading")}
            </h2>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              {t("technologies.subheading")}
            </p>
          </FadeIn>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TECHNOLOGIES.map((techCat, idx) => (
            <FadeIn key={techCat.category} direction="up" delay={0.1 * (idx + 1)}>
              <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-8 space-y-6 hover:border-slate-700 transition-all duration-300 h-full">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    {techCat.category}
                  </h3>
                  <span className="text-xs font-mono text-slate-500 uppercase">
                    {techCat.items.length} STACK
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {techCat.description}
                </p>

                {/* Items grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {techCat.items.map((item) => (
                    <div
                      key={item.name}
                      className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 hover:border-blue-500/40 transition-colors space-y-1 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {item.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
