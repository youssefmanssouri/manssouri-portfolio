"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import enDictionary from "@/locales/en/common.json";
import frDictionary from "@/locales/fr/common.json";

export type Language = "en" | "fr";

type Dictionary = typeof enDictionary;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dictionary: Dictionary;
}

const dictionaries: Record<Language, any> = {
  en: enDictionary,
  fr: frDictionary,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // 1. Check URL param or stored cookie / localStorage
    const savedLanguage = localStorage.getItem("ym_portfolio_lang") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
      setLanguageState(savedLanguage);
      document.cookie = `ym_locale=${savedLanguage}; path=/; max-age=31536000`;
    } else {
      // Check browser language preference
      const browserLang = navigator.language.slice(0, 2).toLowerCase();
      if (browserLang === "fr") {
        setLanguageState("fr");
        document.cookie = "ym_locale=fr; path=/; max-age=31536000";
      }
    }
  }, []);

  const setLanguage = React.useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("ym_portfolio_lang", lang);
    document.cookie = `ym_locale=${lang}; path=/; max-age=31536000`;
  }, []);

  const t = React.useCallback(
    (keyPath: string): string => {
      const keys = keyPath.split(".");
      let current: any = dictionaries[language] || dictionaries.en;

      for (const key of keys) {
        if (current && typeof current === "object" && key in current) {
          current = current[key];
        } else {
          // Fallback to English if key missing in current language
          let fallback: any = dictionaries.en;
          for (const fKey of keys) {
            if (fallback && typeof fallback === "object" && fKey in fallback) {
              fallback = fallback[fKey];
            } else {
              return keyPath;
            }
          }
          return typeof fallback === "string" ? fallback : keyPath;
        }
      }

      return typeof current === "string" ? current : keyPath;
    },
    [language]
  );

  const value = React.useMemo(
    () => ({
      language,
      setLanguage,
      t,
      dictionary: dictionaries[language] || dictionaries.en,
    }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
