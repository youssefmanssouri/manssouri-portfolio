"use client";

import React from "react";
import { TECHNOLOGIES } from "@/data/technologies";
import { useLanguage } from "@/lib/i18n/context";

export function Technologies() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-[#F3EFEA] border-t border-[#DED6CC]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-16 pb-6 border-b border-[#DED6CC]">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#A65F4B] block mb-1">
            {t("technologies.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] mb-3">
            {t("technologies.heading")}
          </h2>
          <p className="text-[#242222]/70 text-sm leading-relaxed">
            {t("technologies.subheading")}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TECHNOLOGIES.map((techCat) => (
            <div
              key={techCat.category}
              className="rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 p-8 space-y-6 shadow-xl h-full flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#DED6CC]/20">
                  <h3 className="text-xl font-bold text-[#F3EFEA] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#A65F4B]" />
                    {techCat.category}
                  </h3>
                  <span className="text-xs font-mono text-[#DED6CC]/60 uppercase">
                    {techCat.items.length} TECH
                  </span>
                </div>

                <p className="text-xs text-[#DED6CC]/80 leading-relaxed font-medium">
                  {techCat.description}
                </p>

                {/* Items grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {techCat.items.map((item) => (
                    <div
                      key={item.name}
                      className="p-3 rounded-xs bg-[#F3EFEA]/10 border border-[#DED6CC]/20 space-y-1"
                    >
                      <span className="text-xs font-semibold text-[#F3EFEA] block font-mono">
                        {item.name}
                      </span>
                      <p className="text-[11px] text-[#DED6CC]/70 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
