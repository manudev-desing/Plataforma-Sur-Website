"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { createWhatsAppUrl } from "@/data/company";
import { ArrowRight, MessageCircle } from "lucide-react";

const heroImages = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
  "/images/hero/hero-4.jpg",
  "/images/hero/hero-5.jpg",
  "/images/hero/hero-6.jpg",
  "/images/hero/hero-7.jpg",
  "/images/hero/hero-8.jpg",
  "/images/hero/hero-9.jpg",
];

export const Hero: React.FC = () => {
  const { t } = useLang();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="inicio" className="relative flex min-h-[88vh] items-center overflow-hidden pt-20">
      {/* Background Slides */}
      {heroImages.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt="Granos de exportación Sudamérica"
            fill
            priority={idx === 0}
            className="object-cover"
          />
        </div>
      ))}

      {/* Subtle Backdrop Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/75 to-white/90" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative z-10 w-full px-6 py-20 text-foreground md:py-28 md:px-12">
        <div className="max-w-3xl">
          <h1 className="font-outfit text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            {t("hero_title_1")}{" "}
            <span className="bg-gradient-brand bg-clip-text text-transparent">
              {t("hero_title_2")}
            </span>
          </h1>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#productos"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-brand px-6 py-3.5 text-base font-semibold text-white shadow-elegant transition-all hover:opacity-95"
            >
              {t("hero_cta_catalog")}
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href={createWhatsAppUrl(t("hero_wa_message"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-primary/30 bg-white/80 px-6 py-3.5 text-base font-semibold text-primary backdrop-blur transition-colors hover:bg-white"
            >
              <MessageCircle className="h-5 w-5 text-accent" />
              {t("hero_cta_whatsapp")}
            </a>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentSlide ? "w-6 bg-primary" : "w-1.5 bg-primary/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
