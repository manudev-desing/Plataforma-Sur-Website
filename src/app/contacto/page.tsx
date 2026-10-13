"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollReveal from "@/components/ScrollReveal";
import { catalogFacade } from "@/facades/catalog-facade";
import { getAssetPath } from "@/utils/assets";
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, ShieldCheck } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  country: string;
  phone: string;
  productInterest: string;
  volume: string;
  message: string;
}

export default function ContactoPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const companyConfig = catalogFacade.getCompanyInfo();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Generar mensaje enriquecido para canal comercial y fallback
    const waText = `*Consulta Comercial Web Plataforma Sur*\n\n` +
      `*Nombre:* ${data.name}\n` +
      `*Empresa:* ${data.company || "N/A"} (${data.country || "Internacional"})\n` +
      `*Email:* ${data.email}\n` +
      `*Producto de interés:* ${data.productInterest}\n` +
      `*Volumen estimado:* ${data.volume || "A coordinar"}\n` +
      `*Mensaje:* ${data.message}`;

    const waUrl = catalogFacade.buildWhatsAppLink(waText);

    // Abrir WhatsApp en pestaña nueva y confirmar en pantalla
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }

    setIsSubmitted(true);
    reset();
  };

  const offices = [
    {
      city: "Buenos Aires",
      country: "Argentina",
      role: "Hub Logístico Atlántico & NOA",
      address: "Puerto Madero, CABA",
    },
    {
      city: "Santa Cruz de la Sierra",
      country: "Bolivia",
      role: "Eje Agroindustrial Granos & Quinua",
      address: "Equipetrol Norte",
    },
    {
      city: "Lima",
      country: "Perú",
      role: "Hub Pacífico & Granos Andinos",
      address: "Miraflores / Callao",
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
                Atención Comercial B2B
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight max-w-3xl">
                Contacto & Cotizaciones
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                Inicie una consulta formal con nuestro equipo de exportación. Respuesta garantizada en menos de 24 horas laborables.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Split Form & Info */}
        <section className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid gap-16 lg:grid-cols-12 items-start">
              {/* Form Column (7 cols) */}
              <div className="lg:col-span-7">
                <ScrollReveal variant="fade-left">
                  <div className="rounded-3xl border border-border bg-white p-8 md:p-12 shadow-sm">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-midnight-green tracking-tight mb-2">
                      Solicitud de Cotización Internacional
                    </h2>
                    <p className="text-sm text-muted-foreground mb-8">
                      Complete los datos de su requerimiento para asignarle un ejecutivo comercial especializado.
                    </p>

                    {isSubmitted ? (
                      <div className="rounded-2xl border border-emerald/30 bg-emerald/10 p-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-emerald text-white flex items-center justify-center mx-auto mb-4 shadow-md">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-midnight-green mb-2">
                          ¡Solicitud enviada con éxito!
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                          Se ha generado la conexión directa con nuestro desk de exportación. Si no se abrió la ventana de WhatsApp, puede hacer clic a continuación:
                        </p>
                        <a
                          href={catalogFacade.buildWhatsAppLink("Hola, acabo de enviar el formulario en la web.")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Abrir WhatsApp Directo
                        </a>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-midnight-green mb-2">
                              Nombre Completo *
                            </label>
                            <input
                              {...register("name", { required: "El nombre es obligatorio" })}
                              type="text"
                              placeholder="Ej: Roberto Gómez"
                              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-midnight-green focus:border-emerald focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald/20"
                            />
                            {errors.name && (
                              <p className="text-red-600 text-xs mt-1 font-medium">{errors.name.message}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-midnight-green mb-2">
                              Correo Corporativo *
                            </label>
                            <input
                              {...register("email", {
                                required: "El correo es obligatorio",
                                pattern: {
                                  value: /^\S+@\S+$/i,
                                  message: "Formato de correo inválido",
                                },
                              })}
                              type="email"
                              placeholder="nombre@empresa.com"
                              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-midnight-green focus:border-emerald focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald/20"
                            />
                            {errors.email && (
                              <p className="text-red-600 text-xs mt-1 font-medium">{errors.email.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-midnight-green mb-2">
                              Empresa Importadora *
                            </label>
                            <input
                              {...register("company", { required: "La empresa es obligatoria" })}
                              type="text"
                              placeholder="Razón social o comercial"
                              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-midnight-green focus:border-emerald focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald/20"
                            />
                            {errors.company && (
                              <p className="text-red-600 text-xs mt-1 font-medium">{errors.company.message}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-midnight-green mb-2">
                              País de Destino *
                            </label>
                            <input
                              {...register("country", { required: "El país es obligatorio" })}
                              type="text"
                              placeholder="Ej: España, Brasil, Turquía..."
                              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-midnight-green focus:border-emerald focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald/20"
                            />
                            {errors.country && (
                              <p className="text-red-600 text-xs mt-1 font-medium">{errors.country.message}</p>
                            )}
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-midnight-green mb-2">
                              Línea de Interés *
                            </label>
                            <select
                              {...register("productInterest", { required: "Seleccione un rubro" })}
                              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-midnight-green focus:border-emerald focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald/20"
                            >
                              <option value="">Seleccione una opción...</option>
                              <option value="Alubia Blanco">Alubia Blanco (Argentina)</option>
                              <option value="Frijol Negro">Frijol Negro (Argentina / Bolivia)</option>
                              <option value="Sésamo Blanco/Negro">Sésamo Natural / Seleccionado (Bolivia)</option>
                              <option value="Quinua Real (Blanca, Roja, Negra)">Quinua Real Orgánica (Bolivia / Perú)</option>
                              <option value="Chía">Semillas de Chía (Argentina / Bolivia)</option>
                              <option value="Maíz Amarillo">Maíz Amarillo (Argentina)</option>
                              <option value="Maní Runner">Maní Runner (Argentina)</option>
                              <option value="Otro producto agrícola">Otro requerimiento a medida</option>
                            </select>
                            {errors.productInterest && (
                              <p className="text-red-600 text-xs mt-1 font-medium">{errors.productInterest.message}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-midnight-green mb-2">
                              Volumen Estimado (FCL / TM)
                            </label>
                            <input
                              {...register("volume")}
                              type="text"
                              placeholder="Ej: 1 x 20' FCL (24 TM)"
                              className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-midnight-green focus:border-emerald focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald/20"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-midnight-green mb-2">
                            Detalles del Requerimiento / Puerto Destino *
                          </label>
                          <textarea
                            {...register("message", { required: "Por favor detalle su consulta" })}
                            rows={4}
                            placeholder="Especifique especificaciones de calidad, Incoterm deseado (FOB/CFR/CIF) o calendario de embarque previsto..."
                            className="w-full rounded-xl border border-border bg-muted/30 p-4 text-sm text-midnight-green focus:border-emerald focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald/20 resize-none"
                          />
                          {errors.message && (
                            <p className="text-red-600 text-xs mt-1 font-medium">{errors.message.message}</p>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full btn-primary py-4 text-base font-bold flex items-center justify-center gap-2"
                        >
                          <Send className="w-5 h-5" />
                          <span>{isSubmitting ? "Procesando..." : "Enviar Consulta Comercial"}</span>
                        </button>
                      </form>
                    )}
                  </div>
                </ScrollReveal>
              </div>

              {/* Information Column (5 cols) */}
              <div className="lg:col-span-5 space-y-8">
                <ScrollReveal variant="fade-right">
                  <div className="rounded-3xl bg-midnight-green text-white p-8 md:p-10 shadow-lg">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-light block mb-2">
                      Atención Directa
                    </span>
                    <h3 className="text-2xl font-bold mb-4">Canales Inmediatos</h3>
                    <p className="text-sm text-gray-200 leading-relaxed mb-6">
                      Para consultas urgentes de cotización FOB/CIF o confirmación de disponibilidad de cosecha, comuníquese con nuestro desk central:
                    </p>

                    <div className="space-y-4">
                      <a
                        href={catalogFacade.buildWhatsAppLink("Hola, deseo consultar directamente con un asesor.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 hover:bg-emerald transition-colors"
                      >
                        <MessageCircle className="w-6 h-6 text-emerald group-hover:text-white shrink-0" />
                        <div>
                          <span className="text-xs text-gray-300 block">WhatsApp Desk</span>
                          <span className="text-sm font-bold text-white">{companyConfig.whatsappDisplay}</span>
                        </div>
                      </a>

                      <a
                        href={`mailto:${companyConfig.email}`}
                        className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 hover:bg-emerald transition-colors"
                      >
                        <Mail className="w-6 h-6 text-emerald shrink-0" />
                        <div>
                          <span className="text-xs text-gray-300 block">Correo Oficial</span>
                          <span className="text-sm font-bold text-white break-all">{companyConfig.email}</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Regional Presence Cards */}
                <ScrollReveal variant="fade-right" delay={0.1}>
                  <div className="rounded-3xl border border-border bg-muted/30 p-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-midnight-green mb-6">
                      Oficinas y Nodos de Embarque
                    </h4>
                    <div className="space-y-5">
                      {offices.map((off) => (
                        <div key={off.city} className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-midnight-green block text-sm">
                              {off.city}, {off.country}
                            </span>
                            <span className="text-xs text-muted-foreground block">{off.role}</span>
                            <span className="text-[11px] text-muted-foreground/70">{off.address}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}