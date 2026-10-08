"use client";

import React from "react";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { companyConfig, createWhatsAppUrl, createEmailUrl } from "@/data/company";
import { MapPin, MessageCircle, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();

  const offices = [
    { city: "Buenos Aires", country: t("country_Argentina") },
    { city: "Santa Cruz", country: t("country_Bolivia") },
    { city: "Lima", country: t("country_Perú") },
  ];

  return (
    <footer id="contacto" className="border-t border-border/60 bg-white text-foreground">
      {/* Commercial Inquiry CTA Banner */}
      <div className="border-b border-border/60 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-16 md:px-12 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {t("footer_eyebrow")}
              </span>
              <h2 className="font-outfit text-3xl font-bold text-foreground md:text-4xl">
                {t("footer_title")}
              </h2>
              <p className="mt-4 max-w-lg text-muted-foreground">{t("footer_subtitle")}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <a
                href={createWhatsAppUrl("Hola, vengo del sitio web y me interesa cotizar productos.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald/90"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={createEmailUrl("Consulta de importación", "Estimado equipo de Plataforma Sur,\n\n")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90"
              >
                <Mail className="h-5 w-5" />
                <span>{t("contact_email")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Info Columns */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:px-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand & Purpose */}
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/logos/isotipo.png"
                alt="Plataforma Sur"
                width={120}
                height={170}
                className="h-10 w-auto"
              />
              <span className="flex flex-col leading-[1.05]">
                <span className="font-outfit text-lg font-extrabold tracking-tight text-accent">
                  Plataforma Sur
                </span>
                <span className="font-outfit text-[10px] font-medium uppercase tracking-[0.18em] text-primary/80">
                  Global Business
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("footer_about")}
            </p>
          </div>

          {/* Offices */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">
              {t("footer_offices")}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/85">
              {offices.map((office, i) => (
                <li key={i} className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {office.city}, {office.country}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">
              {t("footer_contact")}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-foreground/85">
              <li>
                <a
                  href={createWhatsAppUrl("Hola, consulta desde la web.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-accent"
                >
                  <MessageCircle className="h-4 w-4 text-emerald" />
                  <span>{companyConfig.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyConfig.email}`}
                  className="flex items-center gap-2 break-all transition-colors hover:text-accent"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{companyConfig.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © {currentYear} {companyConfig.companyName}. {t("footer_rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
