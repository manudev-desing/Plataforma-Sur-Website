"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import { getAssetPath } from "@/utils/assets";
import { Shield, Award, Heart, CheckCircle2, ArrowRight } from "lucide-react";

export default function ValoresPage() {
  const coreValues = [
    {
      icon: Shield,
      title: "Responsabilidad",
      badge: "Compromiso de entrega",
      description:
        "Cumplimos lo prometido, en tiempo y forma. Nuestra palabra es el aval fundamental que sostiene cada operación comercial a través de fronteras y continentes.",
      bullets: [
        "Plazos pactados respetados al 100%",
        "Informes de trazabilidad en tiempo real",
        "Pólizas y garantías contractuales sólidas",
      ],
    },
    {
      icon: Award,
      title: "Calidad",
      badge: "Estándar de ultramar",
      description:
        "Exigencia internacional en cada lote. Desde la selección por color y calibre hasta los análisis de humedad y fitosanitarios, comercializamos productos que superan auditorías globales.",
      bullets: [
        "Lotes zarandeados y calibrados",
        "Certificaciones SENASA, SENASAG y HACCP",
        "Inspección independiente Surveyor / SGS",
      ],
    },
    {
      icon: Heart,
      title: "Confianza",
      badge: "Relaciones duraderas",
      description:
        "Base irremplazable de todo negocio sostenible. Priorizamos alianzas plurianuales con importadores e industrias que valoran la honestidad operativa sobre transacciones ocasionales.",
      bullets: [
        "Trato directo con directores de operaciones",
        "Resolución proactiva de contingencias",
        "Transparencia en estructuras de costos e Incoterms",
      ],
    },
  ];

  const personalityTraits = [
    { title: "Confiable", desc: "Cumple con rigor lo acordado en cada contrato." },
    { title: "Ágil", desc: "Responde y resuelve con rapidez, sin fricciones burocráticas." },
    { title: "Cercana", desc: "Crea vínculos humanos, no solo transacciones comerciales." },
    { title: "Inspiradora", desc: "Proyecta solidez, energía y visión de futuro para la región." },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-outfit">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-midnight-green text-white py-24 md:py-32">
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
                ADN de Marca
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight max-w-3xl">
                Valores & Personalidad
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                Plataforma Sur es el socio confiable que cumple, resuelve y piensa en el próximo paso: sólida, estratégica y humana.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* 3 Core Values (Brandbook §1.6) */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <ScrollReveal variant="fade-up">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald block mb-2">
                  Pilares de Conducta
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-midnight-green tracking-tight">
                  Nuestros Tres Valores Fundamentales
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid gap-8 lg:grid-cols-3">
              {coreValues.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <ScrollReveal key={val.title} variant="fade-up" delay={idx * 0.1}>
                    <div className="h-full rounded-3xl border border-border/80 bg-muted/30 p-8 md:p-10 shadow-sm transition-all duration-300 hover:bg-white hover:border-emerald/40 hover:shadow-card-hover flex flex-col justify-between">
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-midnight-green text-white flex items-center justify-center mb-6 shadow-md">
                          <Icon className="w-7 h-7 text-emerald" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald block mb-1">
                          {val.badge}
                        </span>
                        <h3 className="text-2xl font-bold text-midnight-green mb-3">
                          {val.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                          {val.description}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-border/60">
                        <ul className="space-y-2.5">
                          {val.bullets.map((b) => (
                            <li key={b} className="flex items-center gap-2 text-xs font-medium text-midnight-green">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald shrink-0" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Personality Traits (Brandbook §1.7) */}
        <section className="py-20 md:py-28 bg-muted/40 border-y border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <ScrollReveal variant="fade-up">
              <div className="max-w-2xl mx-auto text-center mb-16">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald block mb-2">
                  Tono & Actitud
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-midnight-green tracking-tight">
                  Personalidad de Marca
                </h2>
                <p className="mt-3 text-muted-foreground text-sm md:text-base">
                  Equilibrio exacto entre el rigor del Sabio (conocimiento y precisión) y la energía del Héroe (entrega y expansión).
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {personalityTraits.map((t, idx) => (
                <ScrollReveal key={t.title} variant="fade-up" delay={idx * 0.1}>
                  <div className="h-full rounded-2xl bg-white border border-border/80 p-6 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-emerald">0{idx + 1}</span>
                      <h4 className="text-xl font-bold text-midnight-green mt-2 mb-2">{t.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-4xl mx-auto px-6">
            <ScrollReveal variant="scale-in">
              <h2 className="text-3xl md:text-4xl font-extrabold text-midnight-green mb-4">
                Construyamos una relación comercial duradera
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Hablemos sobre los requerimientos de suministro de su mercado para la próxima campaña agrícola.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contacto" className="btn-primary">
                  Contactar al Equipo <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href="/#productos" className="btn-secondary">
                  Ver Fichas Técnicas
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
