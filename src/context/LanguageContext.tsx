"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from "react";
import { Locale } from "@/data/translations";
import { catalogFacade } from "@/facades/catalog-facade";
import { cmsFacade } from "@/facades/cms-facade";

interface LanguageContextType {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: (key: string) => string;
  cmsRevision: number;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Locale>("ES");
  const [cmsRevision, setCmsRevision] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ps-lang") as Locale | null;
      if (saved && (saved === "ES" || saved === "EN")) {
        setLang(saved);
      }
      setCmsRevision((r) => r + 1);

      // Sync from Supabase in background if configured
      cmsFacade.syncWithSupabase().then((res) => {
        if (res.synced) {
          setCmsRevision((r) => r + 1);
        }
      });

      const handleCmsUpdate = () => setCmsRevision((r) => r + 1);
      window.addEventListener("ps-cms-updated", handleCmsUpdate);
      window.addEventListener("storage", handleCmsUpdate);
      return () => {
        window.removeEventListener("ps-cms-updated", handleCmsUpdate);
        window.removeEventListener("storage", handleCmsUpdate);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ps-lang", lang);
      document.documentElement.lang = lang === "EN" ? "en" : "es";
    }
  }, [lang]);

  const value = useMemo(() => {
    const activeTranslations = catalogFacade.getTranslations();
    return {
      lang,
      setLang,
      cmsRevision,
      t: (key: string): string => {
        return activeTranslations[lang]?.[key] ?? activeTranslations.ES?.[key] ?? key;
      },
    };
  }, [lang, cmsRevision]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLang must be used within LanguageProvider");
  }
  return context;
};
