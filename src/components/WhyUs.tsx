"use client";

import React from "react";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { getAssetPath } from "@/utils/assets";
import {
  ShieldCheck,
  Compass,
  Ship,
  Clock,
  CheckCircle2,
  Anchor,
  ArrowRight,
  Globe2,
  Sparkles,
} from "lucide-react";

export const WhyUs: React.FC = () => {
  const { t } = useLang();

  return (
    <section
      id="nosotros"
      className="relative bg-gradient-to-b from-[#032f35] via-midnight-green to-[#022328] text-white py-24 md:py-36 overflow-hidden border-t border-emerald/20"
    >
      {/* Luz ambiental sutil y filigrana de fondo (El Sabio) */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-emerald-light/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.035] pointer-events-none select-none">
        <Image
          src={getAssetPath("/images/logos/isotipo.png")}
          alt=""
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Cabecera Editorial Imponente: El Sabio */}
        <div className="max-w-4xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald/40 bg-emerald/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-emerald-light mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span>{t("whyus_eyebrow") || "Por qué elegirnos"} · El Valor de la Certeza</span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
            {t("whyus_title")}
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed font-light max-w-2xl">
            {t("brand_narrative")}
          </p>
        </div>

        {/* Nivel 1: EL GRAN HORIZONTE DE ORIGEN (Panorámica Asimétrica y Orgánica) */}
        <div className="mb-8">
          <div className="group relative w-full min-h-[440px] lg:min-h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/15 flex flex-col justify-between">
            {/* Fotografía Panorámica de los Campos de Legumbres y Granos */}
            <Image
              src={getAssetPath("/images/landscapes/grain-field-argentina.jpg")}
              alt="Paisaje panorámico de campos de cultivo de granos y legumbres en Salta y las Pampas"
              fill
              priority
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
            />

            {/* Máscara de gradiente orgánico Midnight Green */}
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-green-dark via-midnight-green/80 to-midnight-green/30" />

            {/* Encabezado del Gran Panorama */}
            <div className="relative z-10 p-8 md:p-12 pb-0 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold uppercase tracking-widest bg-emerald/20 text-emerald-light border border-emerald/30 px-3 py-1 rounded-full backdrop-blur-md">
                  01 · {t("feat2_title")}
                </span>
                <span className="text-xs text-gray-300 font-mono hidden sm:inline-block">
                  Coordenadas Agrícolas · NOA & Pampa Húmeda
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-light shadow-inner">
                <Compass className="w-6 h-6" />
              </div>
            </div>

            {/* Cuerpo del Panorama */}
            <div className="relative z-10 px-8 md:px-12 my-auto py-8 max-w-3xl">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-light block mb-3">
                Sabiduría del Terreno · Trazabilidad Integral
              </span>
              <h3 className="font-outfit text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                {t("brand_narrative")}
              </h3>
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-light">
                {t("feat2_text")}
              </p>
            </div>

            {/* Pie del Gran Panorama: Cápsula de Orígenes */}
            <div className="relative z-10 p-8 md:p-12 pt-6 border-t border-white/15 bg-midnight-green-dark/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-gray-200">
                <CheckCircle2 className="w-5 h-5 text-emerald shrink-0" />
                <span>Cadena de custodia verificada: Campo → Planta seleccionadora → Contenedor</span>
              </div>
              <div className="flex items-center gap-2">
                {["Argentina", "Bolivia", "Perú"].map((country) => (
                  <span
                    key={country}
                    className="text-xs font-mono uppercase tracking-wider bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full text-emerald-light backdrop-blur-sm"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Nivel 2: LA TRÍADA ESTRATÉGICA (Formas Asimétricas Muy Redondeadas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* Card: CALIDAD Y CERTIFICACIONES (Andes & Quinua) */}
          <div className="group relative min-h-[400px] rounded-[2rem] overflow-hidden shadow-xl border border-white/15 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:border-emerald/40">
            <Image
              src={getAssetPath("/images/landscapes/quinoa-altiplano.jpg")}
              alt="Cultivos de quinua en el altiplano andino"
              fill
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-green-dark via-midnight-green/85 to-midnight-green/45" />

            <div className="relative z-10 p-7 pb-0 flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-light bg-emerald/20 border border-emerald/30 px-3 py-1 rounded-full backdrop-blur-md">
                02 · {t("feat1_title")}
              </span>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-light">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="relative z-10 px-7 my-auto py-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-light block mb-2">
                Altiplano Andino · 3.800 msnm
              </span>
              <h3 className="font-outfit text-xl sm:text-2xl font-bold text-white mb-3">
                {t("feat1_title")}
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed font-light">
                {t("feat1_text")}
              </p>
            </div>

            <div className="relative z-10 p-7 pt-5 border-t border-white/15 bg-midnight-green-dark/60 backdrop-blur-sm flex items-center justify-between">
              <span className="text-xs text-gray-200">
                Auditorías GFSI y fitosanitarias de ultramar
              </span>
              <a
                href="#certificaciones"
                className="text-xs font-mono text-emerald-light hover:underline flex items-center gap-1"
              >
                <span>Ver sellos oficiales</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card: LOGÍSTICA DE ULTRAMAR (Puertos Bioceánicos) */}
          <div className="group relative min-h-[400px] rounded-[2rem] overflow-hidden shadow-xl border border-white/15 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:border-emerald/40">
            <Image
              src={getAssetPath("/images/landscapes/port-logistics.jpg")}
              alt="Terminal portuaria de ultramar para exportación de granos"
              fill
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-green-dark via-midnight-green/85 to-midnight-green/45" />

            <div className="relative z-10 p-7 pb-0 flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-light bg-emerald/20 border border-emerald/30 px-3 py-1 rounded-full backdrop-blur-md">
                03 · {t("feat3_title")}
              </span>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-light">
                <Ship className="w-5 h-5" />
              </div>
            </div>

            <div className="relative z-10 px-7 my-auto py-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-light block mb-2">
                Corredores Atlántico & Pacífico
              </span>
              <h3 className="font-outfit text-xl sm:text-2xl font-bold text-white mb-3">
                {t("feat3_title")}
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed font-light">
                {t("feat3_text")}
              </p>
            </div>

            <div className="relative z-10 p-7 pt-5 border-t border-white/15 bg-midnight-green-dark/60 backdrop-blur-sm">
              <span className="block text-[11px] font-mono font-bold uppercase tracking-wider text-gray-300 mb-2">
                Puertos de ultramar
              </span>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {["Buenos Aires", "Rosario", "Arica", "Iquique", "Callao"].map((port) => (
                  <span
                    key={port}
                    className="text-xs font-medium bg-white/15 text-white border border-white/20 px-2.5 py-0.5 rounded-full"
                  >
                    {port}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-light font-semibold">
                <Anchor className="w-3.5 h-3.5" />
                <span>Incoterms: FOB · CIF · CFR</span>
              </div>
            </div>
          </div>

          {/* Card: ATENCIÓN B2B DIRECTA (Valles de Santa Cruz) */}
          <div className="group relative min-h-[400px] rounded-[2rem] overflow-hidden shadow-xl border border-white/15 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:border-emerald/40 md:col-span-2 lg:col-span-1">
            <Image
              src={getAssetPath("/images/landscapes/sesame-bolivia.jpg")}
              alt="Campos de sésamo y chía en Santa Cruz"
              fill
              className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-green-dark via-midnight-green/85 to-midnight-green/45" />

            <div className="relative z-10 p-7 pb-0 flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-light bg-emerald/20 border border-emerald/30 px-3 py-1 rounded-full backdrop-blur-md">
                04 · {t("feat4_title")}
              </span>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-light">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="relative z-10 px-7 my-auto py-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-light block mb-2">
                Mesa Comercial Ejecutiva
              </span>
              <h3 className="font-outfit text-xl sm:text-2xl font-bold text-white mb-3">
                {t("feat4_title")}
              </h3>
              <p className="text-sm text-gray-200 leading-relaxed font-light">
                {t("feat4_text")}
              </p>
            </div>

            <div className="relative z-10 p-7 pt-5 border-t border-white/15 bg-midnight-green-dark/60 backdrop-blur-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="font-outfit text-3xl font-black text-white">
                  &lt; 24h
                </span>
                <span className="text-xs text-gray-200 leading-tight">
                  Respuesta formal de cotización
                </span>
              </div>
              <a
                href="#contacto"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-midnight-green bg-emerald-light hover:bg-emerald px-4 py-2.5 rounded-full transition-all shadow-md font-outfit"
              >
                <span>Contactar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
