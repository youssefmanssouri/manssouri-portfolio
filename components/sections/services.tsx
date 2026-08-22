"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function Services() {
  const { t, dictionary } = useLanguage();
  const items = dictionary?.capabilities?.items || [];

  return (
    <section id="services" className="py-24 md:py-32 bg-[#F3EFEA] text-[#242222]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 pb-6 border-b border-[#DED6CC]">
          <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-1 font-semibold">
            02 / {t("capabilities.badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] mb-3 leading-tight">
            {t("capabilities.heading")}
          </h2>
          <p className="text-[#242222]/80 text-base leading-relaxed">
            {t("capabilities.subheading")}
          </p>
        </div>

        {/* 4 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="border border-[#DED6CC] p-6 sm:p-8 bg-[#F3EFEA] rounded-xs space-y-4 shadow-sm hover:border-[#A65F4B]/50 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#DED6CC] pb-3">
                  <span className="text-xs font-mono text-[#A65F4B] uppercase tracking-wider font-semibold">
                    {item.label}
                  </span>
                  <span className="text-xs font-mono text-[#242222]/50 font-bold">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#242222] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[#242222] text-sm font-medium leading-relaxed">
                  {item.positioning}
                </p>
                <p className="text-[#242222]/75 text-xs leading-relaxed">
                  {item.details}
                </p>
              </div>

              {/* Evidence Anchor */}
              <div className="pt-4 border-t border-[#DED6CC]/70">
                <p className="text-[11px] font-mono text-[#3A171C] leading-snug">
                  <span className="font-bold uppercase tracking-wider">Proof:</span> {item.evidence}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Link to Work */}
        <div className="pt-12">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#3A171C] uppercase tracking-widest hover:text-[#A65F4B] transition-colors font-semibold"
          >
            <span>{t("capabilities.connectLink")}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
