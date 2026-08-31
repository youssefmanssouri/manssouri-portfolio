"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/context";
import { YMLogo } from "@/components/ui/logo";
import { trackEvent } from "@/lib/analytics";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (pathname === "/" && href.startsWith("/#")) {
        e.preventDefault();
        const targetId = href.replace("/#", "");
        const elem = document.getElementById(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
        }
      }
      setMobileMenuOpen(false);
    },
    [pathname]
  );

  const navLinks = [
    { name: t("nav.work"), href: "/#work" },
    { name: t("nav.services"), href: "/#services" },
    { name: t("nav.about"), href: "/#about" },
    { name: t("nav.faq"), href: "/#faq" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#F3EFEA]/95 backdrop-blur-sm border-b border-[#DED6CC] py-3 shadow-xs"
          : "bg-[#F3EFEA] py-5 border-b border-[#DED6CC]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          prefetch={true}
          aria-label="Youssef Manssouri — Home"
          className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] rounded-xs"
        >
          <YMLogo variant="responsive" theme="dark" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-wider text-[#242222]/80">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              prefetch={true}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-[#A65F4B] transition-colors py-1 active:scale-95"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Language Switcher & CTA */}
        <div className="hidden md:flex items-center gap-6">
          {/* Language Switcher EN | FR */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#242222]/70">
            <button
              onClick={() => setLanguage("en")}
              className={`px-1 py-0.5 transition-colors ${
                language === "en" ? "text-[#A65F4B] font-bold" : "hover:text-[#A65F4B]"
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <span className="text-[#DED6CC]">|</span>
            <button
              onClick={() => setLanguage("fr")}
              className={`px-1 py-0.5 transition-colors ${
                language === "fr" ? "text-[#A65F4B] font-bold" : "hover:text-[#A65F4B]"
              }`}
              aria-label="Changer en Français"
            >
              FR
            </button>
          </div>

          <Link
            href="/#contact"
            prefetch={true}
            onClick={(e) => {
              trackEvent("CTA_START_PROJECT", { source: "navbar", destination: "contact" });
              handleNavClick(e, "/#contact");
            }}
            className="inline-flex items-center gap-1.5 bg-[#3A171C] text-[#F3EFEA] px-4 py-2 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-[#2D1216] transition-colors active:scale-95"
          >
            {t("nav.startProject")}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-4">
          <div className="flex items-center gap-1 text-xs font-mono text-[#242222]/70">
            <button
              onClick={() => setLanguage("en")}
              className={`px-1 ${language === "en" ? "text-[#A65F4B] font-bold" : ""}`}
            >
              EN
            </button>
            <span className="text-[#DED6CC]">|</span>
            <button
              onClick={() => setLanguage("fr")}
              className={`px-1 ${language === "fr" ? "text-[#A65F4B] font-bold" : ""}`}
            >
              FR
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-[#3A171C] active:scale-90 transition-transform cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-[#F3EFEA] border-b border-[#DED6CC] px-4 pt-3 pb-6"
          >
            <nav className="flex flex-col gap-3 text-xs font-medium uppercase tracking-wider">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  prefetch={true}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[#242222] hover:text-[#A65F4B] py-2"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-[#DED6CC] mt-2">
                <Link
                  href="/#contact"
                  prefetch={true}
                  onClick={(e) => {
                    trackEvent("CTA_START_PROJECT", { source: "navbar_mobile", destination: "contact" });
                    handleNavClick(e, "/#contact");
                  }}
                  className="inline-flex items-center justify-center gap-1.5 w-full bg-[#3A171C] text-[#F3EFEA] px-4 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider active:scale-95"
                >
                  {t("nav.startProject")}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
