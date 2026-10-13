"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { catalogFacade } from "@/facades/catalog-facade";
import { BrandLogo } from "@/components/BrandLogo";
import { getAssetPath } from "@/utils/assets";
import { MapPin, MessageCircle, Mail, Globe, ArrowRight, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();
  const companyConfig = catalogFacade.getCompanyInfo();

  const offices = [
    { city: "Buenos Aires", country: t("country_Argentina"), address: "Puerto Madero & Nodo NOA" },
    { city: "Santa Cruz de la Sierra", country: t("country_Bolivia"), address: "Eje Agroindustrial" },
    { city: "Lima", country: t("country_Perú"), address: "Hub Pacífico / Callao" },
  ];

  return (
    <footer id="contacto" className="border-t border-border bg-white text-midnight-green">
      {/* Brandbook Repeating Accent Header Band (§6.3) */}
      <div className="h-1.5 w-full bg-gradient-to-r from-midnight-green via-emerald to-emerald-light" />

      {/* Commercial Inquiry CTA Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-midnight-green via-midnight-green to-midnight-green-dark text-white py-16 md:py-20 px-6 md:px-12">
        {/* Background Isotipo Watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none select-none">
          <Image
            src={getAssetPath("/images/logos/isotipo.png")}
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald/20 border border-emerald/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-light">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald" />
                {t("footer_eyebrow") || "Comercio Internacional de Confianza"}
              </span>
              <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {t("footer_title") || "Conectemos su mercado con el sur"}
              </h2>
              <p className="mt-4 max-w-xl text-base text-gray-200 leading-relaxed">
                {t("footer_subtitle") || "Consulte por disponibilidad de cosechas, volúmenes mínimos, envíos de muestras y especificaciones aduaneras."}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4 lg:justify-end">
              <a
                href={catalogFacade.buildWhatsAppLink(
                  "Hola, me comunico desde el sitio web para solicitar cotización y disponibilidad de producto."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-emerald px-7 py-4 text-sm font-bold text-white shadow-lg shadow-emerald/30 transition-all duration-200 hover:bg-emerald-light hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Iniciar WhatsApp</span>
              </a>

              <a
                href={catalogFacade.buildEmailLink(
                  "Consulta Comercial de Exportación",
                  "Estimado equipo de Plataforma Sur,\n\nEscribo para solicitar cotización formal de los siguientes productos:\n\n"
                )}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/40"
              >
                <Mail className="h-5 w-5" />
                <span>{t("contact_email") || "Enviar Correo"}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Navigation & Info */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-4">
            <BrandLogo size="md" theme="light" />
            <p className="text-xs md:text-sm leading-relaxed text-muted-foreground">
              {t("footer_about") || "Plataforma de exportación B2B estructurada que conecta productos agrícolas selectos de Argentina, Bolivia y Perú con compradores de clase mundial."}
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-emerald block">
                Trazabilidad · Cumplimiento · Calidad
              </span>
            </div>
          </div>

          {/* Col 2: Internal Navigation */}
          <div>
            <h4 className="font-outfit text-xs font-bold uppercase tracking-wider text-midnight-green border-b border-border pb-2.5">
              Navegación Institucional
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs md:text-sm">
              <li>
                <Link href="/#inicio" className="text-muted-foreground hover:text-emerald transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald" /> Inicio
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="text-muted-foreground hover:text-emerald transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald" /> Catálogo de Productos
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="text-muted-foreground hover:text-emerald transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald" /> Servicios de Exportación
                </Link>
              </li>
              <li>
                <Link href="/historia" className="text-muted-foreground hover:text-emerald transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald" /> Historia & Propósito
                </Link>
              </li>
              <li>
                <Link href="/valores" className="text-muted-foreground hover:text-emerald transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald" /> Valores & Territorio
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Regional Offices */}
          <div>
            <h4 className="font-outfit text-xs font-bold uppercase tracking-wider text-midnight-green border-b border-border pb-2.5">
              {t("footer_offices") || "Presencia Regional"}
            </h4>
            <ul className="mt-4 space-y-3.5 text-xs md:text-sm text-foreground/85">
              {offices.map((office, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 shrink-0 text-emerald mt-0.5" />
                  <div>
                    <span className="font-bold text-midnight-green block">{office.city}, {office.country}</span>
                    <span className="text-[11px] text-muted-foreground">{office.address}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Direct Desk & WhatsApp */}
          <div>
            <h4 className="font-outfit text-xs font-bold uppercase tracking-wider text-midnight-green border-b border-border pb-2.5">
              {t("footer_contact") || "Atención Comercial B2B"}
            </h4>
            <ul className="mt-4 space-y-3 text-xs md:text-sm">
              <li>
                <a
                  href={catalogFacade.buildWhatsAppLink("Hola, consulta desde la web.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-emerald transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-emerald shrink-0" />
                  <span className="font-semibold text-midnight-green">{companyConfig.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyConfig.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-emerald transition-colors break-all"
                >
                  <Mail className="h-4 w-4 text-emerald shrink-0" />
                  <span>{companyConfig.email}</span>
                </a>
              </li>
              <li className="pt-2">
                <span className="text-[11px] text-muted-foreground block">
                  Horario de coordinación: Lunes a Viernes 08:00 - 18:00 (UTC-3)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground">
          <span>
            © {currentYear} {companyConfig.companyName}. {t("footer_rights") || "Todos los derechos reservados."}
          </span>
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-muted-foreground/60">
              Outfit Corporate Font · WCAG 2.1 AA Compliant
            </span>
            <Link
              href="/admin"
              className="text-[11px] font-semibold text-muted-foreground hover:text-emerald transition-colors"
            >
              CMS Studio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
