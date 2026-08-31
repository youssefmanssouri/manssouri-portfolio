"use client";

import React, { useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export function FAQ() {
  const { t, dictionary } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const faqItems = dictionary?.faq?.items || [];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.youssefmanssouri.site/#faq",
    "mainEntity": faqItems.map((item: any) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-28 lg:py-32 bg-[#F3EFEA] text-[#242222] border-t border-[#DED6CC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 pb-6 border-b border-[#DED6CC]">
          <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-2 font-semibold">
            05 / {t("faq.badge")}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] mb-3 leading-tight">
            {t("faq.heading")}
          </h2>
          <p className="text-[#242222]/80 text-base sm:text-lg leading-relaxed">
            {t("faq.subheading")}
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl space-y-4">
          {faqItems.map((item: any, idx: number) => {
            const isOpen = openIndex === idx;
            const questionId = `faq-question-${idx}`;
            const answerId = `faq-answer-${idx}`;

            return (
              <div
                key={idx}
                className="border-b border-[#DED6CC] pb-4 transition-colors"
              >
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left py-3 flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-[#242222] min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] rounded-xs cursor-pointer group"
                >
                  <span className="group-hover:text-[#A65F4B] transition-colors pr-2">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#A65F4B] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    className="pt-2 pb-3 text-sm sm:text-base text-[#242222]/80 leading-relaxed font-sans"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
