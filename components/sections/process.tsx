"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";

export function Process() {
  const { t } = useLanguage();
  const steps = (t("process.steps") as any) || [];

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
          {Array.isArray(steps) && steps.map((item: any) => (
            <div key={item.number || item.title} className="border-b border-[#DED6CC] pb-8 space-y-3">
              <span className="text-xs font-mono text-[#A65F4B] font-bold block">
                {item.number}
              </span>
              <h3 className="text-lg font-bold text-[#242222] tracking-tight">
                {item.title}
              </h3>
              <p className="text-[#242222]/80 text-xs leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
