"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

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
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 bg-[#F3EFEA]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-widest text-[#A65F4B] font-semibold">
                {t("hero.badge")}
              </p>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#242222] leading-[1.12]">
                {t("hero.headlineMain")}{" "}
                <span className="italic-serif font-normal">{t("hero.headlineEmphasized")}</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-[#242222]/80 max-w-xl leading-relaxed">
              {t("hero.subheadline")}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/#work"
                prefetch={true}
                onClick={(e) => handleNavClick(e, "work")}
                className="inline-flex items-center gap-2 bg-[#3A171C] text-[#F3EFEA] px-5 py-3 rounded-xs text-xs font-medium uppercase tracking-wider hover:bg-[#542229] transition-all active:scale-[0.98]"
              >
                {t("hero.viewWork")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#contact"
                prefetch={true}
                onClick={(e) => handleNavClick(e, "contact")}
                className="inline-flex items-center gap-2 bg-transparent border border-[#3A171C] text-[#3A171C] px-5 py-3 rounded-xs text-xs font-medium uppercase tracking-wider hover:bg-[#3A171C]/5 transition-all active:scale-[0.98]"
              >
                {t("hero.connect")}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="pt-4 border-t border-[#DED6CC] flex items-center justify-between text-xs font-mono text-[#242222]/70">
              <span>{t("hero.location")}</span>
              <span className="hidden sm:inline text-[#A65F4B] uppercase tracking-wider font-semibold">
                Youssef Manssouri
              </span>
            </div>
          </div>

          {/* Right Column: Deep Burgundy Interface Frame (Subtle Proof of Built Products) */}
          <div className="lg:col-span-5">
            <Link
              href="/projects/businessos"
              prefetch={true}
              className="block relative rounded-xs border border-[#DED6CC]/30 bg-[#3A171C] overflow-hidden shadow-xl group"
            >
              {/* Header Bar */}
              <div className="px-4 py-2.5 bg-[#2D1216] border-b border-[#DED6CC]/20 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
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
