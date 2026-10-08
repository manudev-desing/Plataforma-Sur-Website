"use client";

import React from "react";
import { useLang } from "@/context/LanguageContext";
import { CheckCircle2 } from "lucide-react";

const CERTIFICATIONS = [
  "HACCP",
  "BRC",
  "SENASA PERU",
  "SENASA ARGENTINA",
  "SENASAG",
  "GACC CHINA",
  "USDA",
  "SURVEYOR CONTROL",
  "ORGANICO",
];

export const CertificationsBanner: React.FC = () => {
  const { t } = useLang();

  return (
    <section aria-label={t("cert_title")} className="border-y border-border/60 bg-white py-6">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h3 className="mb-5 text-center font-outfit text-sm font-bold uppercase tracking-wider text-primary md:text-base">
          {t("cert_title")}
        </h3>
        <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3">
          {CERTIFICATIONS.map((cert) => (
            <li
              key={cert}
              className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-3.5 py-2.5 text-xs font-semibold text-foreground md:text-sm"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
              <span>{cert}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CertificationsBanner;
