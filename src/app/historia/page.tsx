"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getAssetPath } from "@/utils/assets";
import {
  Compass,
  ShieldCheck,
  Ship,
  Sparkles,
  ArrowRight,
  Globe2,
  CheckCircle2,
  Layers,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";

const CINEMATIC_SLIDES = [
  {
    image: "/images/landscapes/grain-silos-dawn.jpg",
    title: "El Origen de la Certeza",
    subtitle: "Acopio y nodos agroindustriales al amanecer en las cuencas productivas del sur.",
    location: "Cuenca Fluvial & Pampa Húmeda",
    year: "Fundación",
  },
  {
    image: "/images/landscapes/grain-field-argentina.jpg",
    title: "Cultivo y Palabra Empeñada",
    subtitle: "Alianzas directas con productores en los valles del NOA y las llanuras agrícolas.",
    location: "Salta & Jujuy · Argentina",
    year: "Trazabilidad",
  },
  {
    image: "/images/landscapes/quinoa-altiplano.jpg",
    title: "La Riqueza Andina",
    subtitle: "Cosechas de Quinua Real a más de 3.800 metros de altitud con pureza ancestral.",
    location: "Altiplano · Bolivia & Perú",
    year: "Identidad",
  },
  {
    image: "/images/landscapes/port-logistics.jpg",
    title: "La Puerta Abierta al Mundo",
    subtitle: "Embarques coordinados en puertos del Atlántico y del Pacífico hacia mercados de ultramar.",
    location: "Terminales Bioceánicas",
    year: "Expansión Global",
  },
];

const TIMELINE_CHAPTERS = [
  {
    number: "01",
    tag: "Génesis & Principio",
    title: "La Palabra en Origen",
    description:
      "Plataforma Sur no nació como un intermediario financiero, sino como una alianza directa con quienes trabajan la tierra. En Salta, Jujuy y la Pampa Húmeda entendimos que exportar requiere honrar los compromisos: calidad inalterable, pureza garantizada y presencia constante en el campo.",
    highlight: "Control directo en finca y acopio con identidad preservada.",
    stat: "100%",
    statLabel: "Cumplimiento contractual",
    image: "/images/landscapes/grain-field-argentina.jpg",
  },
  {
    number: "02",
    tag: "Integración Regional",
    title: "El Eje Multiorigen: Tres Naciones",
    description:
      "Para ofrecer suministro confiable a escala global, articulamos la riqueza de tres geografías complementarias: las legumbres premium de Argentina, la Quinua Real y semillas de Bolivia, y el Pallar de Ica junto a los superalimentos andinos de Perú.",
    highlight: "Argentina · Bolivia · Perú unidos bajo una sola plataforma estructurada.",
    stat: "3 Orígenes",
    statLabel: "Ecosistemas agrícolas complementarios",
    image: "/images/landscapes/quinoa-altiplano.jpg",
  },
  {
    number: "03",
    tag: "Corredores de Ultramar",
    title: "Logística Bioceánica Sin Fricciones",
    description:
      "La distancia se vence con precisión. Desarrollamos conexiones multimodales hacia terminales marítimas clave del Atlántico (Buenos Aires y Rosario) y del Pacífico (Callao, Arica e Iquique), coordinando despachos bajo reglas Incoterms FOB, CFR y CIF.",
    highlight: "Salida estratégica tanto por el océano Atlántico como por el Pacífico.",
    stat: "5 Puertos",
    statLabel: "Terminales marítimas de ultramar",
    image: "/images/landscapes/port-logistics.jpg",
  },
  {
    number: "04",
    tag: "Estándar Global",
    title: "La Certeza de los Parámetros",
    description:
      "Hoy consolidamos un catálogo de 17 productos con fichas técnicas exhaustivas, análisis físico-químicos por lote y certificaciones internacionales requeridas por aduanas de Europa, Norteamérica y Asia.",
    highlight: "HACCP, Kosher, Orgánico NOP, GLOBAL G.A.P. y auditorías independientes SGS.",
    stat: "17 Fichas",
    statLabel: "Especialidades con ficha técnica oficial",
    image: "/images/landscapes/grain-silos-dawn.jpg",
  },
];

export default function HistoriaPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-rotación cinematográfica estilo Kimi K3 / Ambient reel
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CINEMATIC_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-[#021f24] text-white flex flex-col font-outfit selection:bg-emerald selection:text-white">
      <Header />

      <main className="flex-1 pt-20">
        {/* ========================================================================= */}
        {/* 1. HERO CINEMATOGRÁFICO: Ambient Motion Reel (Estilo Kimi K3 / El Sabio) */}
        {/* ========================================================================= */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-midnight-green-dark">
          {/* Capas fotográficas con transición suave y efecto de cámara lenta */}
          {CINEMATIC_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={slide.image}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={getAssetPath(slide.image)}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  className={`object-cover object-center transition-transform duration-[6500ms] ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />
                {/* Degradados cinemáticos oscuros: Midnight Green profundo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#021f24] via-midnight-green/80 to-[#021f24]/50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#021f24_90%)]" />
              </div>
            );
          })}

          {/* Filigrana del Isotipo sutil en filigrana */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-96 h-96 opacity-[0.035] pointer-events-none select-none z-10">
            <Image
              src={getAssetPath("/images/logos/isotipo.png")}
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Contenido Central del Hero */}
          <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 py-20 w-full">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-emerald/40 bg-emerald/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-emerald-light mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                <span>Trayectoria & Filosofía Institucional</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] mb-8">
                Del sur al mundo:{" "}
                <span className="bg-gradient-to-r from-emerald-light via-white to-gray-200 bg-clip-text text-transparent">
                  una historia de palabra y certeza.
                </span>
              </h1>

              <p className="text-lg sm:text-2xl text-gray-200 font-light leading-relaxed max-w-2xl mb-12">
                Conectamos la riqueza productiva de Sudamérica con el comercio global a través de una plataforma estructurada sobre la confianza y el rigor técnico.
              </p>

              {/* Botón de acción */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#cronica"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald px-7 py-4 text-sm font-bold text-white shadow-lg shadow-emerald/20 hover:bg-emerald-light transition-all hover:scale-105"
                >
                  <span>Explorar la Crónica</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/#productos"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all"
                >
                  <span>Ver Catálogo de Granos</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Consola de Control Cinemático inferior (Estilo Kimi K3) */}
            <div className="mt-16 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pausar presentación" : "Reproducir presentación"}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-emerald transition-colors backdrop-blur-md"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <div className="text-left">
                  <span className="block text-[11px] font-mono uppercase tracking-widest text-emerald-light">
                    {CINEMATIC_SLIDES[currentSlide].location}
                  </span>
                  <span className="text-xs font-semibold text-gray-300">
                    {CINEMATIC_SLIDES[currentSlide].title}
                  </span>
                </div>
              </div>

              {/* Selector de diapositivas interactivas */}
              <div className="flex items-center gap-2">
                {CINEMATIC_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.title}
                    onClick={() => {
                      setCurrentSlide(idx);
                      setIsPlaying(false);
                    }}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      idx === currentSlide
                        ? "w-10 bg-emerald"
                        : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Ir a escena ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. MANIFIESTO INSTITUCIONAL: El Sabio (Conocimiento, Tierra y Palabra)  */}
        {/* ========================================================================= */}
        <section className="py-24 md:py-36 relative overflow-hidden bg-gradient-to-b from-[#021f24] via-midnight-green to-[#032f35]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              {/* Manifiesto Editorial */}
              <div className="lg:col-span-7">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-light block mb-4">
                  Fundamento de Identidad
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-8">
                  Exportar no es mover volumen:{" "}
                  <span className="text-emerald-light font-light block">
                    es honrar una promesa.
                  </span>
                </h2>

                <div className="space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed font-light">
                  <p>
                    <strong className="text-white font-semibold">
                      Plataforma Sur nació en el corazón productivo de América del Sur
                    </strong>{" "}
                    con una visión tajante: el comercio internacional de alimentos requiere una seriedad intransigente. Los mercados exigentes de ultramar no perdonan la improvisación ni la inconsistencia en los calibres.
                  </p>
                  <p>
                    Por eso, cada tonelada de frijol Alubia, sésamo, quinua real o legumbre que coordinamos cuenta con identificación de origen, supervisión de humedad, pureza zarandeada y certificación fitosanitaria antes de ingresar al contenedor.
                  </p>
                  <p>
                    Construimos una arquitectura de negocios duradera donde tanto el productor local como el importador internacional encuentran certeza jurídica, transparencia operativa y agilidad logística.
                  </p>
                </div>
              </div>

              {/* Portal de la Esencia: Glassmorphism Ultra Premium */}
              <div className="lg:col-span-5">
                <div className="relative rounded-[2.5rem] border border-white/15 bg-white/[0.04] p-8 md:p-12 shadow-2xl backdrop-blur-xl overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="w-14 h-14 rounded-2xl bg-emerald/20 border border-emerald/40 flex items-center justify-center text-emerald-light mb-8 shadow-inner">
                    <Compass className="w-7 h-7" />
                  </div>

                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-light block mb-3">
                    Esencia de Marca
                  </span>

                  <blockquote className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-8">
                    “Conectamos al mundo con lo mejor de Latinoamérica.”
                  </blockquote>

                  <p className="text-sm text-gray-300 leading-relaxed font-light pt-6 border-t border-white/15">
                    Somos el puente del sur que traduce la riqueza natural de nuestros campos en relaciones comerciales de largo plazo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. CRÓNICA POR CAPÍTULOS: La Trayectoria en 4 Paisajes Reales             */}
        {/* ========================================================================= */}
        <section id="cronica" className="py-24 md:py-36 bg-[#021f24] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl mb-20">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-light block mb-3">
                Línea de Tiempo y Territorio
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Cuatro hitos en la construcción de una plataforma global
              </h2>
            </div>

            {/* Lista fluida de capítulos sin cajas rígidas */}
            <div className="space-y-16">
              {TIMELINE_CHAPTERS.map((chapter, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={chapter.number}
                    className="rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8 md:p-14 backdrop-blur-xl shadow-2xl overflow-hidden"
                  >
                    <div
                      className={`grid gap-12 lg:grid-cols-12 items-center ${
                        isEven ? "" : "lg:flex-row-reverse"
                      }`}
                    >
                      {/* Texto del Capítulo */}
                      <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-2"}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="font-mono text-sm font-bold text-emerald px-3 py-1 rounded-full bg-emerald/10 border border-emerald/30">
                            Capítulo {chapter.number}
                          </span>
                          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                            {chapter.tag}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
                          {chapter.title}
                        </h3>

                        <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light mb-8">
                          {chapter.description}
                        </p>

                        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-light font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                            <span>{chapter.highlight}</span>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-outfit text-2xl font-black text-white block">
                              {chapter.stat}
                            </span>
                            <span className="text-[11px] text-gray-400 block font-mono">
                              {chapter.statLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Portal Fotográfico del Capítulo */}
                      <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-1"}`}>
                        <div className="group relative h-[320px] sm:h-[400px] w-full rounded-3xl overflow-hidden border border-white/20 shadow-xl">
                          <Image
                            src={getAssetPath(chapter.image)}
                            alt={chapter.title}
                            fill
                            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-midnight-green-dark via-midnight-green/40 to-transparent" />
                          <div className="absolute bottom-6 left-6 right-6">
                            <span className="inline-block text-xs font-mono uppercase tracking-wider text-emerald-light bg-midnight-green/80 border border-white/15 px-3 py-1 rounded-full backdrop-blur-md">
                              {chapter.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. MISIÓN Y VISIÓN: Consola Estratégica Dual (El Sabio)                   */}
        {/* ========================================================================= */}
        <section className="py-24 md:py-36 bg-gradient-to-b from-[#021f24] via-midnight-green to-[#032f35] border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-light block mb-3">
                Dirección Estratégica
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Misión y Visión hacia el Futuro
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Misión */}
              <div className="rounded-[2.5rem] border border-white/15 bg-white/[0.04] p-10 md:p-12 backdrop-blur-xl shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-emerald/40 hover:-translate-y-1">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-emerald/20 text-emerald-light border border-emerald/40 flex items-center justify-center mb-8">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-light block mb-2">
                    Propósito Operativo
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                    Nuestra Misión
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-light text-base sm:text-lg">
                    Brindar soluciones eficientes de exportación desde América del Sur al mundo, asegurando el cumplimiento riguroso de estándares internacionales, tiempos pactados y un servicio confiable. Construimos relaciones comerciales basadas en la transparencia y la cercanía proactiva con cada cliente.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-emerald-light">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Cumplimiento en tiempo y forma garantizado</span>
                </div>
              </div>

              {/* Visión */}
              <div className="rounded-[2.5rem] border border-white/15 bg-white/[0.04] p-10 md:p-12 backdrop-blur-xl shadow-xl flex flex-col justify-between transition-all duration-300 hover:border-emerald/40 hover:-translate-y-1">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-midnight-green-light text-emerald-light border border-white/20 flex items-center justify-center mb-8">
                    <Globe2 className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-light block mb-2">
                    Proyección Continental
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                    Nuestra Visión
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-light text-base sm:text-lg">
                    Ser la principal plataforma exportadora de Latinoamérica, reconocida por su solidez de palabra, capacidad de suministro continuo y estándares de trazabilidad en alimentos y materias primas. Un referente global de confianza, innovación y crecimiento sostenible.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-emerald-light">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Referente de comercio exterior estructurado</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CTA INTER-PAGE: Conexión con el Catálogo                               */}
        {/* ========================================================================= */}
        <section className="py-24 bg-[#021f24] text-center border-t border-white/10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
              Conozca nuestra oferta de exportación
            </h2>
            <p className="text-gray-300 mb-10 text-base sm:text-lg max-w-xl mx-auto font-light">
              Explore nuestras 17 fichas técnicas de granos, legumbres y semillas de Argentina, Bolivia y Perú, con especificaciones físicas y químicas completas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#productos"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald px-8 py-4 text-sm font-bold text-white shadow-lg shadow-emerald/25 hover:bg-emerald-light transition-all hover:scale-105"
              >
                <span>Ver Catálogo B2B</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-md hover:bg-white/20 transition-all"
              >
                <span>Mesa Comercial Directa</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
