"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { YMLogo } from "@/components/ui/logo";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <footer className="bg-[#3A171C] border-t border-[#DED6CC]/20 text-[#DED6CC] py-12 text-xs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#DED6CC]/20">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <Link
              href="/"
              aria-label="Youssef Manssouri — Home"
              className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] rounded-xs"
            >
              <YMLogo variant="lockup" theme="light" />
            </Link>
            <p className="text-[#DED6CC]/80 text-xs max-w-sm leading-relaxed">
              {t("footer.tagline")}
            </p>
            <p className="text-[#A65F4B] text-xs font-mono">
              {t("footer.location")}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-medium text-[#F3EFEA] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-[#DED6CC]">
              <li>
                <Link href="/#work" className="hover:text-[#F3EFEA] transition-colors">
                  {t("nav.work")}
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#F3EFEA] transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-[#F3EFEA] transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[#F3EFEA] transition-colors">
                  {t("faq.badge")}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#F3EFEA] transition-colors">
                  {t("contact.badge")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-medium text-[#F3EFEA] uppercase tracking-wider">
              {t("contact.directContact")}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#DED6CC]">
              <li>
                <a
                  href="mailto:manssouriyoussef33@gmail.com"
                  aria-label="Send email to Youssef Manssouri"
                  onClick={() => {
                    trackEvent("EMAIL_CLICK", { source: "footer", destination: "email" });
                  }}
                  className="hover:text-[#F3EFEA] transition-colors inline-flex items-center gap-1 break-all"
                >
                  manssouriyoussef33@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/212656682813"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact Youssef Manssouri on WhatsApp"
                  onClick={() => {
                    trackEvent("WHATSAPP_CLICK", { source: "footer", destination: "whatsapp" });
                  }}
                  className="hover:text-[#F3EFEA] transition-colors inline-flex items-center gap-1"
                >
                  +212 6 56 68 28 13
                  <ArrowUpRight className="w-3 h-3 text-[#A65F4B]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/youssef-manssouri-24b4662ba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Youssef Manssouri's LinkedIn Profile"
                  className="hover:text-[#F3EFEA] transition-colors inline-flex items-center gap-1"
                >
                  LinkedIn
                  <ArrowUpRight className="w-3 h-3 text-[#A65F4B]" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/youssefmanssouri"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Youssef Manssouri's GitHub Profile and repositories"
                  onClick={() => {
                    trackEvent("GITHUB_CLICK", { source: "footer" });
                  }}
                  className="hover:text-[#F3EFEA] transition-colors inline-flex items-center gap-1"
                >
                  GitHub
                  <ArrowUpRight className="w-3 h-3 text-[#A65F4B]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & language persistence */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DED6CC]/70">
          <p>© 2026 Youssef Manssouri. {t("footer.rights")}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage("en")}
              className={`hover:text-[#F3EFEA] transition-colors ${language === "en" ? "text-[#F3EFEA] font-bold" : ""}`}
            >
              EN
            </button>
            <span className="text-[#DED6CC]/30">|</span>
            <button
              onClick={() => setLanguage("fr")}
              className={`hover:text-[#F3EFEA] transition-colors ${language === "fr" ? "text-[#F3EFEA] font-bold" : ""}`}
            >
              FR
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
