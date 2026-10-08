"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import { translations, Locale } from "@/data/translations";

interface LanguageContextType {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Locale>("ES");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ps-lang") as Locale | null;
      if (saved && (saved === "ES" || saved === "EN")) {
        setLang(saved);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ps-lang", lang);
      document.documentElement.lang = lang === "EN" ? "en" : "es";
    }
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key: string): string => {
        return translations[lang]?.[key] ?? translations.ES?.[key] ?? key;
      },
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang must be used within LanguageProvider");
  }
  return context;
};
