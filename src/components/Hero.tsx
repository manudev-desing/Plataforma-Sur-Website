"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { catalogFacade } from "@/facades/catalog-facade";
import { getAssetPath } from "@/utils/assets";
import { ArrowRight, MessageCircle, ChevronRight } from "lucide-react";

const heroImages = [
  getAssetPath("/images/hero/hero-1.jpg"),
  getAssetPath("/images/hero/hero-2.jpg"),
  getAssetPath("/images/hero/hero-3.jpg"),
  getAssetPath("/images/hero/hero-4.jpg"),
  getAssetPath("/images/hero/hero-5.jpg"),
  getAssetPath("/images/hero/hero-6.jpg"),
  getAssetPath("/images/hero/hero-7.jpg"),
  getAssetPath("/images/hero/hero-8.jpg"),
  getAssetPath("/images/hero/hero-9.jpg"),
];

export const Hero: React.FC = () => {
  const { t } = useLang();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="inicio" className="relative flex min-h-[92vh] items-center overflow-hidden pt-20 bg-midnight-green">
      {/* Background Slides with Slow Zoom (Ken Burns effect) */}
      {heroImages.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className={`relative w-full h-full transform transition-transform duration-[7000ms] ease-out ${
            idx === currentSlide ? "scale-105" : "scale-100"
          }`}>
            <Image
              src={src}
              alt="Granos de exportación Sudamérica"
              fill
              priority={idx === 0}
              className="object-cover object-center"
            />
          </div>
        </div>
      ))}

      {/* Cinematic Midnight Green Overlay (Brandbook §7.4 - Sage + Hero archetype) */}
      <div className="absolute inset-0 bg-gradient-to-r from-midnight-green/95 via-midnight-green/85 to-midnight-green/40 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-green via-transparent to-midnight-green/30" />

      {/* Decorative Oversized Isotipo Watermark */}
      <div className="absolute -right-24 -bottom-24 w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-[0.04] pointer-events-none select-none">
        <Image
          src={getAssetPath("/images/logos/isotipo.png")}
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </div>

      {/* Main Content with Staggered Entrance */}
      <div className="max-w-7xl mx-auto relative z-10 w-full px-6 py-24 text-white md:py-32 md:px-12">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase text-emerald-light backdrop-blur-md mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
            <span>{t("brand_essence") || "Conectamos al mundo con lo mejor de Latinoamérica"}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-outfit text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t("hero_title_1")}{" "}
            <span className="text-emerald underline decoration-emerald/30 decoration-wavy decoration-2 underline-offset-8">
              {t("hero_title_2")}
            </span>
          </motion.h1>

          {/* Narrative Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-6 max-w-2xl text-base text-gray-200 leading-relaxed sm:text-lg md:text-xl font-normal"
          >
            {t("brand_narrative") || "Del sur al mundo: calidad que cruza fronteras, relaciones que permanecen."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href="#productos"
              className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-emerald px-7 py-4 text-base font-semibold text-white shadow-lg shadow-emerald/25 transition-all duration-300 hover:bg-emerald-light hover:shadow-emerald/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{t("hero_cta_catalog")}</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href={catalogFacade.buildWhatsAppLink(t("hero_wa_message"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-white/20 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="h-5 w-5 text-emerald" />
              <span>{t("hero_cta_whatsapp")}</span>
            </a>
          </motion.div>
        </div>

        {/* Carousel Indicators / Controls */}
        <div className="absolute bottom-8 left-6 md:left-12 z-10 flex items-center gap-3">
          <div className="flex gap-2 items-center">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentSlide
                    ? "w-8 bg-emerald"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-mono font-medium text-white/50 ml-2">
            0{currentSlide + 1} / 0{heroImages.length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
