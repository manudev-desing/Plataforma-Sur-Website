"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import { getAssetPath } from "@/utils/assets";
import { Globe2, Truck, ShieldCheck, Target, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServiciosPage() {
  const territoryPillars = [
    {
      icon: Globe2,
      number: "01",
      title: "Exportación Inteligente",
      subtitle: "Precisión, cumplimiento y visión estratégica",
      description:
        "No nos limitamos a transportar mercadería; articulamos una operación integral que contempla certificaciones de aduana, ventanas de embarque estacionales y asesoramiento fitosanitario para evitar sobrecostos.",
      tags: ["Trazabilidad documental", "Inspección previa a carga", "Análisis de laboratorio"],
    },
    {
      icon: Truck,
      number: "02",
      title: "Conexión Internacional",
      subtitle: "Puente directo entre Sudamérica y mercados globales",
      description:
        "Coordinamos rutas marítimas desde puertos del Atlántico (Buenos Aires, Rosario) y del Pacífico (Callao, Arica, Iquique), optimizando tiempos de tránsito hacia Europa, Asia y Norteamérica.",
      tags: ["Logística multimodal", "Gestión de forwarders", "Incoterms FOB / CFR / CIF"],
    },
    {
      icon: ShieldCheck,
      number: "03",
      title: "Confianza Estructural",
      subtitle: "La palabra vale y los plazos se cumplen",
      description:
        "Operamos con contratos transparentes y seguimiento de cada lote. Nuestra solvencia operativa garantiza que los calibres, purezas y niveles de humedad pactados sean exactamente los entregados.",
      tags: ["Garantía contractual", "Supervisión SENASA / SENASAG", "Protocolos HACCP"],
    },
    {
      icon: Target,
      number: "04",
      title: "Versatilidad & Proyección",
      subtitle: "Amplitud y dinamismo para nuevas oportunidades",
      description:
        "Desde legumbres selectas como alubia y frijol negro, hasta superalimentos andinos (quinua real, chía, sésamo), adaptamos envases y calibres a las exigencias industriales del comprador.",
      tags: ["Bolsas PP 25/50 kg", "Big Bags 1000 kg", "Etiquetado bilingüe personalizado"],
    },
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
                Territorio & Soluciones
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight max-w-3xl">
                Servicios de Exportación
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                Estructura, cumplimiento y rigor operativo para conectar su empresa con las cadenas agrícolas más competitivas de Sudamérica.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Territory Pillars (Alternating Rhythm) */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <ScrollReveal variant="fade-up">
              <div className="max-w-2xl mb-16">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald block mb-2">
                  Los 4 Pilares del Territorio
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-midnight-green tracking-tight">
                  Solidez corporativa sin rigidez burocrática
                </h2>
                <p className="mt-3 text-muted-foreground text-base">
                  Actuamos con estructura, pero sin burocracia: ágiles, cercanos y resolutivos en cada etapa de la exportación.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid gap-8 md:grid-cols-2">
              {territoryPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <ScrollReveal key={pillar.number} variant="fade-up" delay={idx * 0.1}>
                    <div className="group h-full rounded-3xl border border-border/80 bg-muted/30 p-8 md:p-10 shadow-sm transition-all duration-300 hover:bg-white hover:border-emerald/40 hover:shadow-card-hover flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-midnight-green/10 text-midnight-green group-hover:bg-emerald group-hover:text-white flex items-center justify-center transition-colors">
                            <Icon className="w-7 h-7" />
                          </div>
                          <span className="font-mono text-xl font-bold text-emerald">
                            {pillar.number}
                          </span>
                        </div>

                        <h3 className="font-outfit text-2xl font-bold text-midnight-green mb-1">
                          {pillar.title}
                        </h3>
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald mb-4">
                          {pillar.subtitle}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                          {pillar.description}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-border/60">
                        <ul className="space-y-2">
                          {pillar.tags.map((tag) => (
                            <li key={tag} className="flex items-center gap-2 text-xs font-medium text-midnight-green">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald shrink-0" />
                              <span>{tag}</span>
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

        {/* CTA Banner */}
        <section className="py-20 bg-muted/40 border-t border-border">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <ScrollReveal variant="scale-in">
              <h2 className="text-3xl md:text-4xl font-extrabold text-midnight-green mb-4">
                ¿Desea cotizar un embarque para su país?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Nuestro departamento comercial le responderá con disponibilidad de lote y ficha técnica en menos de 24 horas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contacto" className="btn-primary">
                  Contactar al Equipo <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link href="/#productos" className="btn-secondary">
                  Explorar Catálogo
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
