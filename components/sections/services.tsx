"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Globe, ShoppingBag, LayoutDashboard, Layers } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics";

export function Services() {
  const { t, dictionary } = useLanguage();
  const items = dictionary?.capabilities?.items || [];

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const elem = document.getElementById(targetId);
    if (elem) {
      e.preventDefault();
      elem.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const serviceIcons = [Globe, ShoppingBag, Layers, LayoutDashboard];

  return (
    <section id="services" className="py-16 sm:py-20 md:py-28 lg:py-32 bg-[#F3EFEA] text-[#242222]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 pb-6 border-b border-[#DED6CC]">
          <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-2 font-semibold">
            02 / {t("capabilities.badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] mb-3 leading-tight">
            {t("capabilities.heading")}
          </h2>
          <p className="text-[#242222]/80 text-base sm:text-lg leading-relaxed">
            {t("capabilities.subheading")}
          </p>
        </div>

        {/* 4 Outcome-Oriented Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item: any, idx: number) => {
            const Icon = serviceIcons[idx % serviceIcons.length];
            const itemNum = `0${idx + 1}`;

            return (
              <div
                key={idx}
                className="border border-[#DED6CC] bg-[#FAF7F2] p-6 sm:p-8 rounded-xs shadow-xs hover:border-[#A65F4B]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#DED6CC]/70 pb-3">
                    <span className="inline-flex items-center gap-2 text-xs font-mono text-[#A65F4B] uppercase tracking-wider font-semibold">
                      <Icon className="w-4 h-4 text-[#A65F4B]" aria-hidden="true" />
                      <span>SERVICE {itemNum}</span>
                    </span>
                    <span className="text-xs font-mono text-[#242222]/40 font-bold">
                      {itemNum}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#242222] tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-[#242222]/85 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Features / Inclusions List */}
                {item.features && item.features.length > 0 && (
                  <div className="pt-4 border-t border-[#DED6CC]/70 space-y-3">
                    <span className="text-[11px] font-mono text-[#A65F4B] uppercase tracking-wider font-bold block">
                      {item.listLabel || "Includes:"}
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#242222]/80">
                      {item.features.map((feat: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-start gap-2 leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#A65F4B] mt-1.5 shrink-0" aria-hidden="true" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="mt-12 sm:mt-16 p-8 sm:p-10 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest font-semibold">
              {t("capabilities.consultation.title")}
            </p>
            <p className="text-[#F3EFEA]/90 text-sm sm:text-base leading-relaxed">
              {t("capabilities.consultation.text")}
            </p>
          </div>
          <Link
            href="/#contact"
            prefetch={true}
            onClick={(e) => {
              trackEvent("CTA_START_PROJECT", { source: "services_bottom", destination: "contact" });
              handleNavClick(e, "contact");
            }}
            className="inline-flex items-center justify-center gap-2 bg-[#F3EFEA] text-[#3A171C] px-6 py-3.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] shrink-0 shadow-sm"
          >
            <span>{t("capabilities.consultation.cta")}</span>
            <ArrowRight className="w-4 h-4 text-[#A65F4B]" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  );
}
