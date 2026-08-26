"use client";

import React from "react";
import { FileText } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics";

export function About() {
  const { language, t, dictionary } = useLanguage();
  const focusItems = dictionary?.about?.focusItems || [
    "Business Analytics",
    "Applied AI",
    "Next.js & TypeScript",
    "Data Modeling"
  ];

  const cvHref = language === "fr" ? "/cv-fr.pdf" : "/cv-en.pdf";
  const cvDownloadName = language === "fr" ? "Manssouri_Youssef_CV_FR.pdf" : "Youssef_Manssouri_CV_EN.pdf";

  return (
    <section id="about" className="py-24 md:py-32 bg-[#F3EFEA] text-[#242222]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 pb-6 border-b border-[#DED6CC]">
          <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-1 font-semibold">
            04 / {t("about.badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] leading-tight">
            {t("about.heading")}
          </h2>
        </div>

        {/* Narrative & Credentials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Narrative Blocks */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Lead Intro */}
            <p className="text-base sm:text-lg text-[#242222] font-medium leading-relaxed">
              {t("about.intro")}
            </p>

            {/* Business Meets Software */}
            <div className="space-y-2">
              <h3 className="text-sm font-mono text-[#A65F4B] uppercase tracking-wider font-semibold">
                {t("about.intersectionTitle")}
              </h3>
              <p className="text-sm sm:text-base text-[#242222]/80 leading-relaxed">
                {t("about.intersectionText")}
              </p>
            </div>

            {/* Applied Engineering Proof */}
            <div className="space-y-2">
              <h3 className="text-sm font-mono text-[#A65F4B] uppercase tracking-wider font-semibold">
                {t("about.proofTitle")}
              </h3>
              <p className="text-sm sm:text-base text-[#242222]/80 leading-relaxed">
                {t("about.proofText")}
              </p>
            </div>

            {/* Internship Experience */}
            <div className="space-y-2">
              <h3 className="text-sm font-mono text-[#A65F4B] uppercase tracking-wider font-semibold">
                {t("about.experienceTitle")}
              </h3>
              <p className="text-sm sm:text-base text-[#242222]/80 leading-relaxed">
                {t("about.experienceText")}
              </p>
            </div>

            {/* Career Direction */}
            <div className="space-y-2 pt-2 border-t border-[#DED6CC]">
              <h3 className="text-sm font-mono text-[#A65F4B] uppercase tracking-wider font-semibold">
                {t("about.directionTitle")}
              </h3>
              <p className="text-sm sm:text-base text-[#242222]/80 leading-relaxed">
                {t("about.directionText")}
              </p>
            </div>

          </div>

          {/* Sidebar Highlights: Education, Internship & Focus Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Academic & Internship Card */}
            <div className="p-6 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 space-y-6 shadow-xl">
              
              {/* Education Block */}
              <div className="space-y-1">
                <p className="text-[11px] font-mono text-[#A65F4B] uppercase tracking-wider font-semibold">
                  {t("about.educationLabel")}
                </p>
                <h4 className="text-base font-bold text-[#F3EFEA]">
                  {t("about.school")}
                </h4>
                <p className="text-xs text-[#DED6CC]/80 font-mono">
                  {t("about.institution")}
                </p>
              </div>

              <div className="border-t border-[#DED6CC]/15 pt-4 space-y-1">
                <p className="text-[11px] font-mono text-[#A65F4B] uppercase tracking-wider font-semibold">
                  {t("about.internshipLabel")}
                </p>
                <h4 className="text-sm font-bold text-[#F3EFEA]">
                  {t("about.internshipOrg")}
                </h4>
                <p className="text-xs text-[#DED6CC]/80 font-mono">
                  {t("about.internshipRole")}
                </p>
              </div>

              {/* Core Focus Pills */}
              <div className="border-t border-[#DED6CC]/15 pt-4 space-y-2">
                <p className="text-[11px] font-mono text-[#A65F4B] uppercase tracking-wider font-semibold">
                  {t("about.focusLabel")}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {focusItems.map((item: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xs bg-[#F3EFEA]/10 border border-[#DED6CC]/20 text-[#F3EFEA] font-mono text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct CV Download Button */}
              <div className="border-t border-[#DED6CC]/15 pt-4">
                <a
                  href={cvHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={cvDownloadName}
                  onClick={() => {
                    trackEvent("CV_DOWNLOAD", { language, source: "about" });
                  }}
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#F3EFEA] text-[#3A171C] px-4 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-[#F3EFEA]/90 transition-colors active:scale-95"
                >
                  <FileText className="w-4 h-4 text-[#A65F4B]" />
                  {t("hero.downloadCV")}
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
