"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 md:py-32 bg-[#F3EFEA] text-[#242222]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 pb-6 border-b border-[#DED6CC]">
          <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-1 font-semibold">
            04 / {t("about.badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] mb-3">
            {t("about.heading")}
          </h2>
        </div>

        {/* Bio Copy & Education Highlight Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-[#242222]/80 text-base sm:text-lg leading-relaxed">
              {t("about.bio")}
            </p>
          </div>

          <div className="lg:col-span-4 p-6 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 space-y-2 shadow-lg">
            <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-wider font-semibold">
              {t("about.education")}
            </p>
            <p className="text-sm font-semibold text-[#F3EFEA]">
              {t("about.school")}
            </p>
            <p className="text-xs text-[#DED6CC]/80">
              {t("about.location")}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
