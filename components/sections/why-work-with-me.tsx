"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, Cpu, Layers, MessageSquare } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics";

export function WhyWorkWithMe() {
  const { t, dictionary } = useLanguage();
  const points = dictionary?.whyWorkWithMe?.points || [];
  const proofItems = dictionary?.whyWorkWithMe?.proof || [];

  const pointIcons = [Briefcase, Layers, Cpu, MessageSquare];

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const elem = document.getElementById(targetId);
    if (elem) {
      e.preventDefault();
      elem.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section id="why-me" className="py-16 sm:py-20 md:py-28 lg:py-32 bg-[#F3EFEA] text-[#242222] border-t border-[#DED6CC]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 pb-6 border-b border-[#DED6CC]">
          <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-2 font-semibold">
            03 / {t("whyWorkWithMe.badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] mb-3 leading-tight">
            {t("whyWorkWithMe.heading")}
          </h2>
          <p className="text-[#242222]/80 text-base sm:text-lg leading-relaxed">
            {t("whyWorkWithMe.intro")}
          </p>
        </div>

        {/* 4 Credibility Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {points.map((point: any, idx: number) => {
            const Icon = pointIcons[idx % pointIcons.length];
            return (
              <div
                key={idx}
                className="border-t border-[#DED6CC] pt-6 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-mono text-[#A65F4B] font-semibold tracking-wider">
                    <Icon className="w-4 h-4 text-[#A65F4B]" aria-hidden="true" />
                    <span>{point.number || `0${idx + 1}`}</span>
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#242222] tracking-tight">
                  {point.title}
                </h3>
                <p className="text-[#242222]/85 text-sm sm:text-base leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Verifiable Proof & Performance Evidence */}
        {proofItems.length > 0 && (
          <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-xs bg-[#FAF7F2] border border-[#DED6CC] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DED6CC] pb-3">
              <span className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest font-bold">
                {t("whyWorkWithMe.proofBadge") || "VERIFIABLE METRICS & EVIDENCE"}
              </span>
              <span className="text-[11px] font-mono text-[#242222]/60">
                {t("whyWorkWithMe.proofSubtitle") || "Measured & verified in production"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {proofItems.map((item: any, idx: number) => (
                <div key={idx} className="space-y-2 border-l-2 border-[#A65F4B] pl-3.5 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#A65F4B] uppercase tracking-wider font-bold block">
                      {item.tag}
                    </span>
                    <div className="text-2xl sm:text-3xl font-bold font-mono text-[#3A171C] tracking-tight leading-none">
                      {item.value}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#242222] leading-snug pt-0.5">
                      {item.label}
                    </div>
                  </div>
                  {item.detail && (
                    <p className="text-[11px] text-[#242222]/75 leading-relaxed font-sans pt-1">
                      {item.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subtle Bottom CTA */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-[#DED6CC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs font-mono text-[#3A171C] uppercase tracking-wider font-semibold">
            {t("whyWorkWithMe.cta.prompt")}
          </p>
          <Link
            href="/#contact"
            prefetch={true}
            onClick={(e) => {
              trackEvent("CTA_START_PROJECT", { source: "why_work_with_me", destination: "contact" });
              handleNavClick(e, "contact");
            }}
            className="inline-flex items-center justify-center gap-2 bg-[#3A171C] text-[#F3EFEA] px-5 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-[#2D1216] transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] shrink-0"
          >
            <span>{t("whyWorkWithMe.cta.action")}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A65F4B]" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  );
}
