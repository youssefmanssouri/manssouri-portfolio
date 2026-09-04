"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  ChevronDown,
  Users,
  FileText,
  BarChart3,
  ShieldCheck,
  Check,
  PlusCircle,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics";

export function GymManagementLandingClient() {
  const { t, language, dictionary } = useLanguage();
  const isFr = language === "fr";

  const gymData = (dictionary as any)?.gymService;
  const problemsItems: any[] = gymData?.problems?.items || [];
  const capabilitiesItems: any[] = gymData?.capabilities?.items || [];
  const targetItems: any[] = gymData?.target?.items || [];
  const customizationCol1: string[] = gymData?.customization?.col1Items || [];
  const customizationCol2: string[] = gymData?.customization?.col2Items || [];
  const processSteps: any[] = gymData?.process?.steps || [];
  const faqItems: any[] = gymData?.faq?.items || [];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = useCallback((idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  }, []);

  const handleCtaClick = useCallback(() => {
    trackEvent("CTA_START_PROJECT", {
      source: "gym_service_page",
      service: "gym_management_software",
    });
  }, []);

  const handleDemoClick = useCallback((source: string) => {
    trackEvent("LIVE_DEMO_CLICK", {
      slug: "gym-crm",
      source,
    });
  }, []);

  const whatsAppUrl = `https://wa.me/212656682813?text=${encodeURIComponent(
    isFr
      ? "Bonjour Youssef, j'aimerais échanger sur un logiciel de gestion pour ma salle de sport."
      : "Hello Youssef, I would like to discuss custom gym management software for my fitness facility."
  )}`;

  const capabilityIcons = [Users, ShieldCheck, FileText, BarChart3];

  return (
    <article className="min-h-screen bg-[#F3EFEA] text-[#242222] font-sans antialiased">
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-16 sm:pt-36 md:pt-40 md:pb-24 border-b border-[#DED6CC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-mono text-[#242222]/60">
              <li>
                <Link href="/" className="hover:text-[#A65F4B] transition-colors">
                  {t("gymService.breadcrumb.home")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#services" className="hover:text-[#A65F4B] transition-colors">
                  {t("gymService.breadcrumb.services")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#A65F4B] font-semibold" aria-current="page">
                {t("gymService.breadcrumb.current")}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-mono uppercase tracking-widest text-[#A65F4B] font-bold">
                  {t("gymService.hero.badge")}
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.15rem] font-bold tracking-tight text-[#242222] leading-[1.15]">
                  {t("gymService.hero.headline")}
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#242222]/85 max-w-xl leading-relaxed">
                {t("gymService.hero.subheadline")}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="/#contact"
                  onClick={handleCtaClick}
                  className="inline-flex items-center gap-2 bg-[#3A171C] text-[#F3EFEA] px-6 py-3.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-[#2D1216] transition-all active:scale-[0.98] shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
                >
                  <span>{t("gymService.hero.ctaPrimary")}</span>
                  <ArrowRight className="w-4 h-4 text-[#A65F4B]" aria-hidden="true" />
                </Link>

                <a
                  href="https://gym-crm-mauve.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleDemoClick("gym_service_hero")}
                  className="inline-flex items-center gap-2 bg-transparent border border-[#3A171C] text-[#3A171C] px-6 py-3.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-[#3A171C]/5 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
                >
                  <span>{t("gymService.hero.ctaDemo")}</span>
                  <ExternalLink className="w-4 h-4 text-[#3A171C]/75" aria-hidden="true" />
                </a>

                <Link
                  href="/projects/gym-crm"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#242222]/75 hover:text-[#A65F4B] transition-colors py-2 px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] rounded-xs"
                >
                  <span>{t("gymService.hero.ctaCaseStudy")}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>

              {/* Location Relevance Tag */}
              <div className="pt-4 border-t border-[#DED6CC] flex items-center text-xs font-mono text-[#242222]/75">
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A65F4B]" aria-hidden="true" />
                  <span>{t("gymService.hero.location")}</span>
                </span>
              </div>
            </div>

            {/* Right Column: Deployed Interface Showcase */}
            <div className="lg:col-span-5">
              <a
                href="https://gym-crm-mauve.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleDemoClick("gym_service_hero_preview")}
                className="block relative rounded-xs border border-[#DED6CC]/40 bg-[#3A171C] overflow-hidden shadow-xl group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B]"
                aria-label="Launch Gym CRM interactive demo"
              >
                <div className="px-4 py-2.5 bg-[#2D1216] border-b border-[#DED6CC]/20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <div className="w-2 h-2 rounded-full bg-[#DED6CC]/30" />
                    <div className="w-2 h-2 rounded-full bg-[#DED6CC]/30" />
                    <div className="w-2 h-2 rounded-full bg-[#DED6CC]/30" />
                  </div>
                  <span className="text-[10px] font-mono text-[#DED6CC]/80 uppercase tracking-wider">
                    Working Demonstration · Gym CRM
                  </span>
                </div>
                <div className="relative aspect-[16/10] bg-[#3A171C]">
                  <Image
                    src="/images/projects/gymcrm-main.jpg"
                    alt="Gym CRM Operations Dashboard Interface — Front-Desk Check-In & Member Management"
                    fill
                    className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-500"
                    priority
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BUSINESS PROBLEMS ADDRESSED */}
      <section className="py-16 sm:py-20 md:py-28 bg-[#FAF7F2] border-b border-[#DED6CC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16 pb-6 border-b border-[#DED6CC]">
            <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-2 font-bold">
              01 / {t("gymService.problems.badge")}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#242222] mb-3 leading-tight">
              {t("gymService.problems.heading")}
            </h2>
            <p className="text-[#242222]/80 text-base sm:text-lg leading-relaxed">
              {t("gymService.problems.subheading")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {problemsItems.map((item: any, idx: number) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-xs bg-[#F3EFEA] border border-[#DED6CC] shadow-2xs space-y-3"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-[#A65F4B] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A65F4B]" aria-hidden="true" />
                  <span>CHALLENGE 0{idx + 1}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#242222] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[#242222]/80 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VERIFIED CORE CAPABILITIES */}
      <section className="py-16 sm:py-20 md:py-28 bg-[#F3EFEA] border-b border-[#DED6CC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16 pb-6 border-b border-[#DED6CC]">
            <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-2 font-bold">
              02 / {t("gymService.capabilities.badge")}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#242222] mb-3 leading-tight">
              {t("gymService.capabilities.heading")}
            </h2>
            <p className="text-[#242222]/80 text-base sm:text-lg leading-relaxed">
              {t("gymService.capabilities.subheading")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {capabilitiesItems.map((cap: any, idx: number) => {
              const Icon = capabilityIcons[idx % capabilityIcons.length];
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-xs bg-[#FAF7F2] border border-[#DED6CC] shadow-xs hover:border-[#A65F4B]/50 transition-colors space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-[#DED6CC]/70 pb-3">
                    <span className="inline-flex items-center gap-2 text-xs font-mono text-[#A65F4B] font-bold uppercase tracking-wider">
                      <Icon className="w-4 h-4 text-[#A65F4B]" aria-hidden="true" />
                      <span>{cap.tag || `MODULE 0${idx + 1}`}</span>
                    </span>
                    <span className="text-xs font-mono text-[#242222]/40 font-bold">0{idx + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#242222] tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#242222]/85 leading-relaxed font-sans">
                    {cap.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WORKING GYM CRM EVIDENCE (PORTFOLIO PROOF) */}
      <section className="py-16 sm:py-20 md:py-28 bg-[#3A171C] text-[#F3EFEA] border-b border-[#DED6CC]/20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest font-bold">
                  03 / {t("gymService.proof.badge")}
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F3EFEA] leading-tight">
                  {t("gymService.proof.heading")}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#DED6CC]/90 leading-relaxed font-sans">
                {t("gymService.proof.description")}
              </p>

              <div className="pt-2 space-y-3">
                <Link
                  href="/projects/gym-crm"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#F3EFEA] hover:text-[#A65F4B] transition-colors"
                >
                  <span>{t("gymService.proof.caseStudyLink")}</span>
                  <ArrowRight className="w-4 h-4 text-[#A65F4B]" aria-hidden="true" />
                </Link>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-2">
                  <a
                    href="https://gym-crm-mauve.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleDemoClick("gym_service_proof_demo")}
                    className="inline-flex items-center gap-1.5 text-[#DED6CC] hover:text-[#A65F4B] transition-colors underline"
                  >
                    <span>{t("gymService.proof.demoLink")}</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  <span className="text-[#DED6CC]/30">•</span>
                  <a
                    href="https://github.com/youssefmanssouri/Gym-CRM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#DED6CC] hover:text-[#A65F4B] transition-colors underline"
                  >
                    <span>{t("gymService.proof.sourceCodeLink")}</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <p className="text-[11px] font-mono text-[#DED6CC]/60 pt-2">
                🔒 {t("gymService.proof.disclaimer")}
              </p>
            </div>

            {/* Right Side Visual Gallery */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] rounded-xs overflow-hidden border border-[#DED6CC]/20 bg-[#2D1216]">
                <Image
                  src="/images/projects/gymcrm-members.jpg"
                  alt="Member Directory with Active, Expired, and Suspended subscription status indicators"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-xs overflow-hidden border border-[#DED6CC]/20 bg-[#2D1216]">
                <Image
                  src="/images/projects/gymcrm-main.jpg"
                  alt="Operations Dashboard with attendance logs and facility revenue telemetry"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHO THIS IS FOR (TARGET FACILITIES) */}
      <section className="py-16 sm:py-20 md:py-28 bg-[#F3EFEA] border-b border-[#DED6CC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16 pb-6 border-b border-[#DED6CC]">
            <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-2 font-bold">
              04 / {t("gymService.target.badge")}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#242222] mb-3 leading-tight">
              {t("gymService.target.heading")}
            </h2>
            <p className="text-[#242222]/80 text-base sm:text-lg leading-relaxed">
              {t("gymService.target.subheading")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetItems.map((target: any, idx: number) => (
              <div
                key={idx}
                className="p-6 rounded-xs bg-[#FAF7F2] border border-[#DED6CC] shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#A65F4B] font-bold">USE CASE 0{idx + 1}</span>
                  <h3 className="text-base sm:text-lg font-bold text-[#242222] tracking-tight">
                    {target.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#242222]/80 leading-relaxed font-sans">
                    {target.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CUSTOMIZATION: DEMONSTRATED VS. CUSTOM ADDITIONS */}
      <section className="py-16 sm:py-20 md:py-28 bg-[#FAF7F2] border-b border-[#DED6CC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16 pb-6 border-b border-[#DED6CC]">
            <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-2 font-bold">
              05 / {t("gymService.customization.badge")}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#242222] mb-3 leading-tight">
              {t("gymService.customization.heading")}
            </h2>
            <p className="text-[#242222]/80 text-base sm:text-lg leading-relaxed">
              {t("gymService.customization.subheading")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1: Currently Demonstrated */}
            <div className="p-6 sm:p-8 rounded-xs bg-[#F3EFEA] border border-[#DED6CC] space-y-6 shadow-xs">
              <div className="space-y-1 border-b border-[#DED6CC] pb-3">
                <span className="text-xs font-mono text-[#A65F4B] uppercase tracking-wider font-bold">
                  VERIFIED IN DEMO
                </span>
                <h3 className="text-xl font-bold text-[#242222]">
                  {t("gymService.customization.col1Title")}
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-[#242222]/85 font-sans">
                {customizationCol1.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Potential Custom Additions */}
            <div className="p-6 sm:p-8 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 space-y-6 shadow-xl">
              <div className="space-y-1 border-b border-[#DED6CC]/20 pb-3">
                <span className="text-xs font-mono text-[#A65F4B] uppercase tracking-wider font-bold">
                  CUSTOM SCOPE OPTIONS
                </span>
                <h3 className="text-xl font-bold text-[#F3EFEA]">
                  {t("gymService.customization.col2Title")}
                </h3>
              </div>
              <ul className="space-y-3 text-sm text-[#DED6CC]/90 font-sans">
                {customizationCol2.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <PlusCircle className="w-4 h-4 text-[#A65F4B] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. IMPLEMENTATION APPROACH */}
      <section className="py-16 sm:py-20 md:py-28 bg-[#F3EFEA] border-b border-[#DED6CC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16 pb-6 border-b border-[#DED6CC]">
            <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-2 font-bold">
              06 / {t("gymService.process.badge")}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#242222] mb-3 leading-tight">
              {t("gymService.process.heading")}
            </h2>
            <p className="text-[#242222]/80 text-base sm:text-lg leading-relaxed">
              {t("gymService.process.subheading")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step: any, idx: number) => (
              <div
                key={idx}
                className="p-6 rounded-xs bg-[#FAF7F2] border border-[#DED6CC] shadow-2xs space-y-3 relative"
              >
                <div className="text-2xl font-bold font-mono text-[#A65F4B]">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-[#242222] tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-[#242222]/80 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. COMMERCIAL FAQ */}
      <section className="py-16 sm:py-20 md:py-28 bg-[#FAF7F2] border-b border-[#DED6CC]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 pb-6 border-b border-[#DED6CC]">
            <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-2 font-bold">
              07 / {t("gymService.faq.badge")}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#242222] mb-3 leading-tight">
              {t("gymService.faq.heading")}
            </h2>
            <p className="text-[#242222]/80 text-base sm:text-lg leading-relaxed">
              {t("gymService.faq.subheading")}
            </p>
          </div>

          <div className="max-w-3xl space-y-4">
            {faqItems.map((faq: any, idx: number) => {
              const isOpen = openFaqIndex === idx;
              const qId = `faq-q-${idx}`;
              const aId = `faq-a-${idx}`;

              return (
                <div key={idx} className="border-b border-[#DED6CC] pb-4">
                  <button
                    type="button"
                    id={qId}
                    aria-expanded={isOpen}
                    aria-controls={aId}
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left py-3 flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-[#242222] min-h-[44px] cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] rounded-xs"
                  >
                    <span className="group-hover:text-[#A65F4B] transition-colors pr-2">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#A65F4B] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={aId}
                      role="region"
                      aria-labelledby={qId}
                      className="pt-2 pb-3 text-sm sm:text-base text-[#242222]/80 leading-relaxed font-sans"
                    >
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. FINAL CONVERSION BANNER */}
      <section className="py-16 sm:py-20 md:py-28 bg-[#3A171C] text-[#F3EFEA]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-xs border border-[#DED6CC]/20 space-y-8 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest font-bold">
                  {t("gymService.cta.badge")}
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#F3EFEA]">
                  {t("gymService.cta.heading")}
                </h2>
                <p className="text-sm sm:text-base text-[#DED6CC]/90 leading-relaxed font-sans">
                  {t("gymService.cta.subheading")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <Link
                  href="/#contact"
                  onClick={handleCtaClick}
                  className="inline-flex items-center justify-center gap-2 bg-[#F3EFEA] text-[#3A171C] px-6 py-3.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all active:scale-[0.98] shadow-sm"
                >
                  <span>{t("gymService.cta.primary")}</span>
                  <ArrowRight className="w-4 h-4 text-[#A65F4B]" aria-hidden="true" />
                </Link>

                <a
                  href="https://gym-crm-mauve.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleDemoClick("gym_service_final_cta")}
                  className="inline-flex items-center justify-center gap-2 bg-transparent border border-[#DED6CC]/40 text-[#F3EFEA] px-6 py-3.5 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-[#F3EFEA]/10 transition-all active:scale-[0.98]"
                >
                  <span>{t("gymService.cta.demo")}</span>
                  <ExternalLink className="w-4 h-4 text-[#A65F4B]" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-[#DED6CC]/15 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent("WHATSAPP_CLICK", { source: "gym_service_page", destination: "whatsapp" });
                }}
                className="text-[#F3EFEA] hover:text-[#A65F4B] transition-colors inline-flex items-center gap-1.5 font-semibold"
              >
                <span>{t("gymService.cta.whatsAppDirect")}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#A65F4B]" aria-hidden="true" />
              </a>

              <Link
                href="/projects/gym-crm"
                className="text-[#DED6CC]/80 hover:text-[#F3EFEA] transition-colors inline-flex items-center gap-1"
              >
                <span>{t("gymService.hero.ctaCaseStudy")} →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
