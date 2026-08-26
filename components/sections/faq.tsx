"use client";

import React, { useState, useCallback } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { trackEvent } from "@/lib/analytics";

export function FAQ() {
  const { language } = useLanguage();
  const isFr = language === "fr";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleCtaClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent("CTA_START_PROJECT", { source: "faq", destination: "contact" });
    const elem = document.getElementById("contact");
    if (elem) {
      e.preventDefault();
      elem.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const faqItems = [
    {
      question: isFr ? "Comment débute un projet ?" : "How does a project start?",
      answer: isFr
        ? "Chaque projet commence par une discussion sur vos objectifs, vos besoins et vos priorités. De là, le périmètre, les livrables et les étapes suivantes sont définis avant le début du développement."
        : "Every project starts with a conversation about your goals, requirements, and priorities. From there, the scope, deliverables, and next steps can be defined before development begins.",
    },
    {
      question: isFr ? "Combien de temps prend un projet ?" : "How long does a project take?",
      answer: isFr
        ? "Les délais dépendent de l'étendue et de la complexité du projet. Les sites web plus simples sont souvent réalisés en 1 à 2 semaines, tandis que les applications sur mesure peuvent nécessiter plusieurs semaines."
        : "Timelines depend on the scope and complexity of the project. Smaller websites can often be completed within 1–2 weeks, while custom web applications may take several weeks or longer.",
    },
    {
      question: isFr ? "Travailliez-vous avec des petites entreprises ?" : "Do you work with small businesses?",
      answer: isFr
        ? "Oui. Les projets peuvent être cadrés autour des besoins spécifiques, des priorités et du budget d'une petite entreprise sans complexité inutile."
        : "Yes. Projects can be scoped around the specific needs, priorities, and budget of a small business rather than starting with unnecessary complexity.",
    },
    {
      question: isFr ? "Travailliez-vous à distance ?" : "Do you work remotely?",
      answer: isFr
        ? "Oui. Les échanges, le suivi d'avancement, les retours et la livraison peuvent tous s'effectuer à distance."
        : "Yes. Project discussions, progress updates, feedback, and delivery can all be handled remotely.",
    },
    {
      question: isFr ? "Que se passe-t-il après l'envoi du formulaire ?" : "What happens after I submit the contact form?",
      answer: isFr
        ? "Votre message est examiné et je reviens vers vous pour discuter du projet, préciser les besoins et déterminer les prochaines étapes."
        : "Your message is reviewed and I'll get back to you to discuss the project, clarify requirements, and determine the appropriate next steps.",
    },
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#F3EFEA] border-t border-[#DED6CC]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 pb-6 border-b border-[#DED6CC]">
          <p className="text-xs font-mono text-[#A65F4B] uppercase tracking-widest mb-1 font-semibold">
            FAQ / {isFr ? "QUESTIONS FRÉQUENTES" : "CLIENT INQUIRIES"}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#242222] mb-3 leading-tight">
            {isFr ? "Foire Aux Questions" : "Frequently Asked Questions"}
          </h2>
          <p className="text-[#242222]/80 text-base leading-relaxed">
            {isFr
              ? "Réponses claires aux questions fréquentes concernant le lancement, les délais, la collaboration à distance et le cadrage."
              : "Clear answers to common questions regarding project kickoff, timelines, remote collaboration, and scope."}
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl space-y-4">
          {faqItems.map((item, idx) => {
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
                    className="pt-2 pb-3 text-sm text-[#242222]/80 leading-relaxed font-sans"
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Conversion CTA Banner */}
        <div className="mt-16 p-8 sm:p-10 rounded-xs bg-[#3A171C] text-[#F3EFEA] border border-[#DED6CC]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F3EFEA]">
              {isFr ? "Un projet en tête ?" : "Have a project in mind?"}
            </h3>
            <p className="text-sm text-[#DED6CC]/80 leading-relaxed">
              {isFr ? "Discutons de ce que vous souhaitez créer." : "Let's discuss what you want to build."}
            </p>
          </div>

          <a
            href="/#contact"
            onClick={handleCtaClick}
            className="inline-flex items-center gap-2 bg-[#F3EFEA] text-[#3A171C] px-6 py-3 rounded-xs text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all active:scale-[0.98] shrink-0"
          >
            <span>{isFr ? "DÉMARRER UN PROJET" : "START A PROJECT"}</span>
            <ArrowRight className="w-4 h-4 text-[#A65F4B]" />
          </a>
        </div>

      </div>
    </section>
  );
}
