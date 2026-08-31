"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  const { t } = useLanguage();

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const elem = document.getElementById(targetId);
    if (elem) {
      e.preventDefault();
      elem.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section className="relative pt-28 pb-14 sm:pt-36 md:pt-44 md:pb-28 bg-[#F3EFEA]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-[#A65F4B] font-semibold">
                {t("hero.badge")}
              </p>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold tracking-tight text-[#242222] leading-[1.14]">
                {t("hero.headline")}
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#242222]/80 max-w-xl leading-relaxed">
              {t("hero.subheadline")}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Primary: View My Work (Proof first) */}
              <Link
                href="/#work"
                prefetch={true}
                onClick={(e) => {
                  trackEvent("CTA_VIEW_WORK", { source: "hero", destination: "work" });
                  handleNavClick(e, "work");
                }}
                className="inline-flex items-center gap-2 bg-[#3A171C] text-[#F3EFEA] px-6 py-3.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-[#2D1216] transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] shadow-xs"
              >
                <span>{t("hero.viewWork")}</span>
                <ArrowRight className="w-4 h-4 text-[#A65F4B]" aria-hidden="true" />
              </Link>

              {/* Secondary: Start a Project (Client path) */}
              <Link
                href="/#contact"
                prefetch={true}
                onClick={(e) => {
                  trackEvent("CTA_START_PROJECT", { source: "hero", destination: "contact" });
                  handleNavClick(e, "contact");
                }}
                className="inline-flex items-center gap-2 bg-transparent border border-[#3A171C] text-[#3A171C] px-6 py-3.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-[#3A171C]/5 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
              >
                <span>{t("hero.startProject")}</span>
                <ArrowUpRight className="w-4 h-4 text-[#3A171C]/75" aria-hidden="true" />
              </Link>

              {/* Recruiter Path: View CV */}
              <a
                href={t("hero.viewCV") ? (useLanguage().language === "fr" ? "/cv-fr.pdf" : "/cv-en.pdf") : "/cv-en.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent("CV_DOWNLOAD", { language: useLanguage().language, source: "hero" });
                }}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#242222]/75 hover:text-[#A65F4B] transition-colors py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] rounded-xs"
              >
                <span>{t("hero.viewCV")}</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="pt-4 border-t border-[#DED6CC] flex items-center text-xs font-mono text-[#242222]/75">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#A65F4B]" aria-hidden="true" />
                <span>{t("hero.location")}</span>
              </span>
            </div>
          </div>

          {/* Right Column: Deep Burgundy Interface Frame (Proof of Built Products) */}
          <div className="lg:col-span-5">
            <Link
              href="/projects/businessos"
              prefetch={true}
              aria-label="View BusinessOS Case Study — Custom Web Application by Youssef Manssouri"
              onClick={() => {
                trackEvent("LIVE_DEMO_CLICK", { slug: "businessos", name: "BusinessOS", source: "hero" });
              }}
              className="block relative rounded-xs border border-[#DED6CC]/30 bg-[#3A171C] overflow-hidden shadow-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
            >
              {/* Header Bar */}
              <div className="px-4 py-2.5 bg-[#2D1216] border-b border-[#DED6CC]/20 flex items-center justify-between">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <div className="w-2 h-2 rounded-full bg-[#DED6CC]/30" />
                  <div className="w-2 h-2 rounded-full bg-[#DED6CC]/30" />
                  <div className="w-2 h-2 rounded-full bg-[#DED6CC]/30" />
                </div>
                <span className="text-[10px] font-mono text-[#DED6CC]/80 uppercase tracking-wider">
                  Featured Project · BusinessOS
                </span>
              </div>

              {/* Real Project Interface */}
              <div className="relative aspect-[16/10] bg-[#3A171C]">
                <Image
                  src="/images/projects/businessos-main.jpg"
                  alt="BusinessOS Dashboard Interface - Deployed Full-Stack Web Application"
                  fill
                  className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-500"
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
