"use client";

import React from "react";
import { useLang } from "@/context/LanguageContext";
import { ShieldCheck, Compass, Ship, Clock } from "lucide-react";

export const WhyUs: React.FC = () => {
  const { t } = useLang();

  const features = [
    {
      icon: ShieldCheck,
      title: t("feat1_title"),
      text: t("feat1_text"),
    },
    {
      icon: Compass,
      title: t("feat2_title"),
      text: t("feat2_text"),
    },
    {
      icon: Ship,
      title: t("feat3_title"),
      text: t("feat3_text"),
    },
    {
      icon: Clock,
      title: t("feat4_title"),
      text: t("feat4_text"),
    },
  ];

  return (
    <section id="nosotros" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            {t("whyus_eyebrow")}
          </span>
          <h2 className="font-outfit text-3xl font-bold text-foreground md:text-4xl">
            {t("whyus_title")}
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {t("brand_narrative")}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl border border-border/70 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-card-hover"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-outfit text-lg font-bold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
