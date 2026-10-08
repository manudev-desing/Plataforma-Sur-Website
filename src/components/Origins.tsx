"use client";

import React from "react";
import { useLang } from "@/context/LanguageContext";
import { products } from "@/data/products";
import CountryFlag, { CountryName } from "./CountryFlag";

const ORIGINS: CountryName[] = ["Argentina", "Bolivia", "Perú"];

const ORIGIN_SUMMARY_KEYS: Record<CountryName, string> = {
  Argentina: "origin_summary_AR",
  Bolivia: "origin_summary_BO",
  Perú: "origin_summary_PE",
};

export const Origins: React.FC = () => {
  const { t } = useLang();

  return (
    <section id="origenes" className="border-b border-border bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            {t("origins_eyebrow")}
          </span>
          <h2 className="font-outfit text-3xl font-bold text-foreground md:text-4xl">
            {t("origins_title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("origins_subtitle")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {ORIGINS.map((country) => {
            const count = products.filter((p) => p.country === country).length;
            return (
              <div
                key={country}
                className="group rounded-xl border border-border/60 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover"
              >
                <div className="flex items-center gap-3">
                  <CountryFlag country={country} className="h-7 w-10 shadow-sm" />
                  <div>
                    <h3 className="font-outfit text-xl font-bold text-foreground">
                      {t(`country_${country}`)}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                      {count} {t("origins_products")}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t(ORIGIN_SUMMARY_KEYS[country])}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Origins;
