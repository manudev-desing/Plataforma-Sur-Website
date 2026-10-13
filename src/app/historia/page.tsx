"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import { getAssetPath } from "@/utils/assets";
import { Globe, Heart, Target, Eye, Compass, Shield, Award, ArrowRight } from "lucide-react";

export default function HistoriaPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-outfit">
      <Header />

      <main className="flex-1 pt-20">
        {/* Compact Hero Section */}
        <section className="relative overflow-hidden bg-midnight-green text-white py-24 md:py-32">
          {/* Subtle Isotipo Watermark */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 opacity-5 pointer-events-none select-none">
            <Image
              src={getAssetPath("/images/logos/isotipo.png")}
              alt=""
              fill
              className="object-contain"
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <ScrollReveal variant="fade-up">
              <span className="inline-block rounded-full bg-emerald/20 border border-emerald/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-light mb-4">
                Identidad & Trayectoria
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight max-w-3xl">
                Nuestra Historia
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                Un puente de confianza entre culturas, regiones y personas: conectamos la riqueza productiva de Sudamérica con el comercio global.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Narrative Section (Alternating White Section) */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid gap-12 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7">
                <ScrollReveal variant="fade-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald block mb-2">
                    Orígenes del Proyecto
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-midnight-green tracking-tight mb-6">
                    Del sur al mundo con vocación de largo plazo
                  </h2>
                  <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
                    <p>
                      <strong className="text-midnight-green">Plataforma Sur nació con una convicción clara:</strong> llevar la riqueza agrícola de América Latina al mundo sin fricciones ni asimetrías. Exportar no es simplemente trasladar toneladas de grano; es edificar alianzas duraderas donde la palabra empeñada tenga valor de garantía.
                    </p>
                    <p>
                      Desde los primeros embarques de legumbres y granos andinos hacia mercados de alta exigencia, la premisa fue innegociable: excelencia en origen, rigor fitosanitario y cumplimiento puntual de cada contrato.
                    </p>
                    <p>
                      Hoy consolidamos operaciones multiorigen en <strong className="text-midnight-green">Argentina, Bolivia y Perú</strong>, ofreciendo una puerta transparente para empresas internacionales que buscan regularidad, trazabilidad y trato profesional.
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              <div className="lg:col-span-5">
                <ScrollReveal variant="fade-right">
                  <div className="relative overflow-hidden rounded-3xl bg-midnight-green p-8 md:p-10 text-white shadow-xl">
                    <Heart className="w-10 h-10 text-emerald mb-6" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-light block mb-2">
                      Esencia de Marca
                    </span>
                    <blockquote className="text-2xl md:text-3xl font-bold leading-snug mb-6">
                      “Conectamos al mundo con lo mejor de Latinoamérica.”
                    </blockquote>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Cada contenedor despachado representa una promesa honrada con nuestros productores en origen y con nuestros compradores en ultramar.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Misión y Visión (Alternating Muted Section per Brandbook §7.5) */}
        <section className="py-20 md:py-28 bg-muted/40 border-y border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <ScrollReveal variant="fade-up">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald block mb-2">
                  Ejes de Rumbo
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-midnight-green tracking-tight">
                  Misión y Visión Estratégica
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid gap-8 md:grid-cols-2">
              <ScrollReveal variant="fade-up" delay={0.1}>
                <div className="h-full rounded-3xl border border-border/80 bg-white p-8 md:p-10 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald/10 text-emerald flex items-center justify-center mb-6">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-midnight-green mb-4">Nuestra Misión</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Brindar soluciones eficientes de exportación desde América del Sur al mundo, asegurando el cumplimiento estricto de estándares internacionales, tiempos pactados y un servicio confiable. Construimos relaciones comerciales basadas en la transparencia y la cercanía proactiva.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={0.2}>
                <div className="h-full rounded-3xl border border-border/80 bg-white p-8 md:p-10 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-midnight-green/10 text-midnight-green flex items-center justify-center mb-6">
                      <Eye className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-midnight-green mb-4">Nuestra Visión</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Consolidarnos como la principal plataforma exportadora de Latinoamérica, reconocida internacionalmente por su solidez de palabra, capacidad de suministro continuo y estándares de trazabilidad en alimentos y materias primas.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* CTA Inter-page */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-4xl mx-auto px-6">
            <ScrollReveal variant="scale-in">
              <h2 className="text-3xl md:text-4xl font-extrabold text-midnight-green mb-4">
                Conozca nuestra oferta de exportación
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Explore nuestras 17 fichas técnicas de granos, legumbres y semillas de Argentina, Bolivia y Perú.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/#productos" className="btn-primary">
                  Ver Catálogo B2B <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href="/servicios" className="btn-secondary">
                  Servicios y Territorio
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
