"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function Services() {
  const { t, language } = useLanguage();

  const services = [
    {
      number: "01",
      title: language === "fr" ? "Sites Web Vitrines" : "Business Websites",
      description: language === "fr"
        ? "Sites web modernes conçus pour valoriser votre marque, vos contenus et vos objectifs commerciaux."
        : "Modern websites designed around your brand, content, and key business goals."
    },
    {
      number: "02",
      title: language === "fr" ? "Boutiques E-commerce" : "E-commerce",
      description: language === "fr"
        ? "Boutiques en ligne optimisées pour la découverte des produits, la fluidité d'achat et la conversion."
        : "Online stores focused on product discovery, usability, and conversion."
    },
    {
      number: "03",
      title: language === "fr" ? "Applications Web" : "Web Applications",
      description: language === "fr"
        ? "Tableaux de bord sur mesure, outils de gestion CRM et applications d'entreprise."
        : "Custom dashboards, management systems, and business tools."
    },
    {
      number: "04",
      title: language === "fr" ? "Landing Pages" : "Landing Pages",
      description: language === "fr"
        ? "Pages ciblées à forte conversion conçues pour communiquer clairement et inciter à l'action."
        : "Focused, high-converting pages designed to communicate clearly and drive action."
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-[#F3EFEA]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 pb-6 border-b border-[#DED6CC]">
          <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-1 font-semibold">
            02 / {t("services.badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] mb-3">
            {t("services.heading")}
          </h2>
          <p className="text-[#242222]/70 text-sm leading-relaxed">
            {t("services.subheading")}
          </p>
        </div>

        {/* Editorial Numbered List with Thin Hairline Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {services.map((item) => (
            <div key={item.number} className="border-b border-[#DED6CC] pb-8 space-y-3">
              <span className="text-xs font-mono text-[#A65F4B] font-bold block">
                {item.number}
              </span>
              <h3 className="text-xl font-bold text-[#242222] tracking-tight">
                {item.title}
              </h3>
              <p className="text-[#242222]/80 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Clean CTA Link */}
        <div className="pt-12">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#3A171C] uppercase tracking-widest hover:text-[#A65F4B] transition-colors"
          >
            <span>{t("hero.startProject")}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
