"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";

interface NavItem {
  id: string;
  label: string;
}

interface CaseStudyNavProps {
  hasLiveDemo?: boolean;
  hasDecisions?: boolean;
  hasLearnings?: boolean;
}

export function CaseStudyNav({
  hasLiveDemo = true,
  hasDecisions = false,
  hasLearnings = false,
}: CaseStudyNavProps) {
  const { t } = useLanguage();
  const [activeId, setActiveId] = useState<string>("overview");
  const navRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = React.useMemo(() => [
    { id: "overview", label: t("caseStudy.nav.overview") || "Overview" },
    { id: "problem", label: t("caseStudy.nav.problem") || "The Problem" },
    { id: "solution", label: t("caseStudy.nav.solution") || "The Solution" },
    { id: "capabilities", label: t("caseStudy.nav.capabilities") || "Capabilities" },
    { id: "engineering", label: t("caseStudy.nav.engineering") || "Engineering" },
    ...(hasDecisions ? [{ id: "decisions", label: t("caseStudy.nav.decisions") || "Decisions" }] : []),
    ...(hasLearnings ? [{ id: "learnings", label: t("caseStudy.nav.learnings") || "Learnings" }] : []),
    ...(hasLiveDemo ? [{ id: "demo", label: t("caseStudy.nav.demo") || "Live Demo" }] : []),
  ], [t, hasDecisions, hasLearnings, hasLiveDemo]);

  // Smooth scroll handler with accessible state update
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
      window.history.replaceState(null, "", `#${id}`);
    }
  }, []);

  // Track active section via scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const elem = document.getElementById(item.id);
        if (elem) {
          const top = elem.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <nav
      aria-label={t("caseStudy.nav.ariaLabel") || "Case study sections"}
      className="sticky top-[69px] sm:top-[73px] z-30 bg-[#F3EFEA]/95 backdrop-blur-md border-b border-[#DED6CC] transition-all duration-200 shadow-2xs"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={navRef}
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2 sm:py-2.5 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          <span className="hidden lg:inline text-[11px] font-mono uppercase tracking-widest text-[#242222]/50 font-bold mr-2 shrink-0 select-none">
            Index:
          </span>
          {navItems.map((item, idx) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                aria-current={isActive ? "location" : undefined}
                className={`group shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-mono uppercase tracking-wider transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65F4B] ${
                  isActive
                    ? "bg-[#3A171C] text-[#F3EFEA] font-bold shadow-xs"
                    : "text-[#242222]/75 hover:text-[#3A171C] hover:bg-[#DED6CC]/40 font-medium"
                }`}
              >
                <span
                  className={`text-[10px] ${
                    isActive ? "text-[#A65F4B]" : "text-[#242222]/40 group-hover:text-[#A65F4B]"
                  }`}
                  aria-hidden="true"
                >
                  0{idx + 1}
                </span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
