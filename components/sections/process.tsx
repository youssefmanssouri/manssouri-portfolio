"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics";

export function Process() {
  const { t, dictionary } = useLanguage();
  const steps = dictionary?.process?.steps || [];

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const elem = document.getElementById(targetId);
    if (elem) {
      e.preventDefault();
      elem.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section id="process" className="py-16 sm:py-20 md:py-28 lg:py-32 bg-[#F3EFEA] text-[#242222] border-t border-[#DED6CC]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 pb-6 border-b border-[#DED6CC]">
          <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-2 font-semibold">
            04 / {t("process.badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] mb-3 leading-tight">
            {t("process.heading")}
          </h2>
          <p className="text-[#242222]/80 text-base sm:text-lg leading-relaxed">
            {t("process.subheading")}
          </p>
        </div>

        {/* 4-Step Progression Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step: any, idx: number) => (
            <div
              key={idx}
              className="bg-[#FAF7F2] border border-[#DED6CC] p-6 sm:p-7 rounded-xs flex flex-col justify-between space-y-4 hover:border-[#A65F4B]/50 transition-colors shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#DED6CC]/70 pb-3">
                  <span className="text-xs font-mono text-[#A65F4B] font-bold">
                    {step.number || `0${idx + 1}`}
                  </span>
                  {idx < steps.length - 1 && (
                    <span className="hidden lg:inline text-xs font-mono text-[#242222]/30 font-bold" aria-hidden="true">
                      →
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#242222] tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[#242222]/80 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Indicative Project Timelines Card */}
        <div className="mt-10 p-6 sm:p-7 rounded-xs bg-[#FAF7F2] border border-[#DED6CC] shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DED6CC] pb-3">
            <span className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest font-bold">
              {t("process.timelines.badge")}
            </span>
            <span className="text-[11px] font-mono text-[#242222]/60">
              {t("process.timelines.indicativeLabel")}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5 p-4 rounded-xs bg-[#F3EFEA]/60 border border-[#DED6CC]/70">
              <span className="text-xs font-semibold text-[#242222] block">
                {t("process.timelines.websites.title")}
              </span>
              <span className="text-sm font-mono font-bold text-[#A65F4B] block">
                {t("process.timelines.websites.range")}
              </span>
              <span className="text-xs text-[#242222]/70 block leading-snug">
                {t("process.timelines.websites.description")}
              </span>
            </div>

            <div className="space-y-1.5 p-4 rounded-xs bg-[#F3EFEA]/60 border border-[#DED6CC]/70">
              <span className="text-xs font-semibold text-[#242222] block">
                {t("process.timelines.ecommerce.title")}
              </span>
              <span className="text-sm font-mono font-bold text-[#A65F4B] block">
                {t("process.timelines.ecommerce.range")}
              </span>
              <span className="text-xs text-[#242222]/70 block leading-snug">
                {t("process.timelines.ecommerce.description")}
              </span>
            </div>

            <div className="space-y-1.5 p-4 rounded-xs bg-[#F3EFEA]/60 border border-[#DED6CC]/70">
              <span className="text-xs font-semibold text-[#242222] block">
                {t("process.timelines.webapps.title")}
              </span>
              <span className="text-sm font-mono font-bold text-[#A65F4B] block">
                {t("process.timelines.webapps.range")}
              </span>
              <span className="text-xs text-[#242222]/70 block leading-snug">
                {t("process.timelines.webapps.description")}
              </span>
            </div>
          </div>

          <p className="text-[11px] font-mono text-[#242222]/65 leading-relaxed pt-1">
            * {t("process.timelines.disclaimer")}
          </p>
        </div>

        {/* Bottom Note & Subtle Text Link */}
        <div className="mt-10 pt-6 border-t border-[#DED6CC]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs font-mono text-[#242222]/70 leading-relaxed">
            {t("process.note")}
          </p>
          <Link
            href="/#contact"
            prefetch={true}
            onClick={(e) => {
              trackEvent("CTA_START_PROJECT", { source: "process_bottom", destination: "contact" });
              handleNavClick(e, "contact");
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#3A171C] uppercase tracking-wider font-semibold hover:text-[#A65F4B] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] rounded-xs"
          >
            <span>{t("process.startProjectLink")}</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
