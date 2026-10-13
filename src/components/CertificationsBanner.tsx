"use client";

import React from "react";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { getAssetPath } from "@/utils/assets";
import { ShieldCheck, Award } from "lucide-react";

interface CertItem {
  id: string;
  name: string;
  category: string;
  logo: string;
  scope: string;
}

const CERTIFICATIONS_DATA: CertItem[] = [
  {
    id: "haccp",
    name: "HACCP",
    category: "Inocuidad Alimentaria",
    logo: "/images/certifications/haccp.svg",
    scope: "Análisis de Peligros y Puntos Críticos de Control en toda la cadena de exportación.",
  },
  {
    id: "brcgs",
    name: "BRCGS Food Safety",
    category: "Estándar Global GFSI",
    logo: "/images/certifications/brcgs.svg",
    scope: "Auditoría de inocuidad alimentaria requerida por compradores de ultramar y retail.",
  },
  {
    id: "senasa-ar",
    name: "SENASA Argentina",
    category: "Sanidad Oficial",
    logo: "/images/certifications/senasa-ar.svg",
    scope: "Certificado Fitosanitario Oficial de Exportación (FTO) e inspección de origen.",
  },
  {
    id: "senasa-pe",
    name: "SENASA Perú",
    category: "Sanidad Oficial",
    logo: "/images/certifications/senasa-pe.svg",
    scope: "Inspección sanitaria y habilitación de cuencas de exportación en Ica y Puno.",
  },
  {
    id: "senasag-bo",
    name: "SENASAG Bolivia",
    category: "Sanidad Oficial",
    logo: "/images/certifications/senasag-bo.svg",
    scope: "Registro fitosanitario nacional y autorización de embarque de granos y semillas.",
  },
  {
    id: "gacc-china",
    name: "GACC China",
    category: "Aduana de Destino",
    logo: "/images/certifications/gacc-china.svg",
    scope: "Habilitación oficial de exportador registrado ante la Aduana General de China.",
  },
  {
    id: "usda-organic",
    name: "USDA Organic",
    category: "Mercado Norteamericano",
    logo: "/images/certifications/usda-organic.svg",
    scope: "Certificación NOP Orgánico para ingreso al mercado de Estados Unidos y Canadá.",
  },
  {
    id: "surveyor-control",
    name: "Surveyor Control",
    category: "Inspección Independiente",
    logo: "/images/certifications/surveyor-control.svg",
    scope: "Supervisión de calidad, pesaje y muestreo por peritos internacionales (SGS / Bureau Veritas).",
  },
  {
    id: "organico",
    name: "Orgánico Certificado",
    category: "Calidad de Origen",
    logo: "/images/certifications/organico.svg",
    scope: "Cultivos limpios 100% libres de pesticidas sintéticos y organismos genéticamente modificados.",
  },
];

export const CertificationsBanner: React.FC = () => {
  const { t } = useLang();

  // Duplicado para loop continuo de la cinta sin saltos visuales
  const marqueeItems = [...CERTIFICATIONS_DATA, ...CERTIFICATIONS_DATA];

  return (
    <section
      id="certificaciones"
      aria-label={t("cert_title") || "Certificaciones de Exportación"}
      className="relative border-y border-border/80 bg-muted/40 pt-8 pb-10 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 mb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald" />
          <span className="font-outfit text-sm font-bold uppercase tracking-wider text-midnight-green">
            {t("cert_title") || "Certificaciones Internacionales y Sellos Oficiales"}
          </span>
        </div>
        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-emerald" />
          Pasa el cursor sobre cada sello para ver detalles de acreditación
        </span>
      </div>

      {/* Cinta continua con espacio superior para el popup en mouseover */}
      <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] pt-28 pb-4">
        <div className="flex w-max animate-marquee space-x-6 hover:[animation-play-state:paused]">
          {marqueeItems.map((cert, idx) => (
            <div
              key={`${cert.id}-${idx}`}
              className="relative group flex items-center justify-center"
            >
              {/* Tarjeta con SOLAMENTE el logo grande en estado normal */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl border border-border/80 bg-white p-4 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-emerald group-hover:ring-2 group-hover:ring-emerald/20 flex items-center justify-center cursor-pointer">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                  <Image
                    src={getAssetPath(cert.logo)}
                    alt={`Sello oficial ${cert.name}`}
                    fill
                    className="object-contain filter transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* POPUP / TOOLTIP EN MOUSEOVER (Aparece sobre el logo con detalles completos) */}
              <div className="absolute bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-64 sm:w-72 bg-midnight-green text-white p-4 rounded-2xl shadow-2xl border border-emerald/40 z-50 pointer-events-none opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                {/* Flecha indicadora hacia abajo */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-midnight-green border-r border-b border-emerald/40 rotate-45" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-outfit text-sm font-bold text-white tracking-tight">
                      {cert.name}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-light bg-emerald/20 px-2 py-0.5 rounded-full shrink-0">
                      {cert.category}
                    </span>
                  </div>

                  <p className="text-xs text-gray-200 leading-relaxed font-light">
                    {cert.scope}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[10px] font-mono text-emerald-light">
                    <span>Acreditación verificada</span>
                    <span>✓ Vigente</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsBanner;
