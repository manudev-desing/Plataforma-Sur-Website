"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero — nombre como pieza gráfica, sin decoración */}
      <section className="bg-midnight-green pt-36 md:pt-48 pb-20 md:pb-32">
        <div className="container-custom">
          <h1 className="text-[clamp(2.5rem,8vw,7.5rem)] font-outfit-bold leading-[0.92] tracking-[-0.03em] text-white max-w-[950px]">
            Plataforma Sur
          </h1>
          <p className="mt-10 md:mt-14 text-white/50 text-base md:text-lg max-w-lg leading-relaxed font-outfit-regular">
            Comercio exterior de commodities agrícolas, forestales y cueros
            desde Argentina, Paraguay y Uruguay.
          </p>
        </div>
      </section>

      {/* Accent line — el único elemento decorativo de la página */}
      <div className="h-1 bg-emerald" />

      {/* About — dos columnas asimétricas, texto editorial */}
      <section className="py-24 md:py-40">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-[2.75rem] font-outfit-bold text-midnight-green leading-[1.1]">
              Veinticinco años moviendo carga real.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-2">
            <p className="text-lg text-midnight-green/65 leading-[1.75] font-outfit-regular mb-6">
              Arrancamos con un contrato de soja al sudeste asiático y una
              oficina en San Nicolás. Hoy operamos desde Buenos Aires con
              embarques a más de quince países y un volumen que supera las dos
              millones de toneladas anuales.
            </p>
            <p className="text-lg text-midnight-green/65 leading-[1.75] font-outfit-regular">
              No somos un marketplace ni una plataforma digital. Somos una
              empresa de comercio exterior con gente que conoce los puertos, los
              productores y las regulaciones de cada mercado donde operamos.
            </p>
          </div>
        </div>
      </section>

      {/* Operations — índice editorial, no cards */}
      <section className="pb-24 md:pb-40">
        <div className="container-custom border-t border-midnight-green/10 pt-16 md:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
            <div className="lg:col-span-3">
              <span className="text-sm text-midnight-green/30 font-outfit-regular">
                Operaciones
              </span>
            </div>
            <div className="lg:col-span-9 space-y-10 md:space-y-14">
              <div>
                <h3 className="text-xl font-outfit-semibold text-midnight-green mb-2">
                  Granos y oleaginosas
                </h3>
                <p className="text-midnight-green/55 leading-relaxed font-outfit-regular max-w-xl">
                  Soja, trigo, maíz, sorgo y cebada. Trabajamos con productores
                  certificados y cooperativas del litoral argentino y el Chaco
                  paraguayo.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-outfit-semibold text-midnight-green mb-2">
                  Productos forestales
                </h3>
                <p className="text-midnight-green/55 leading-relaxed font-outfit-regular max-w-xl">
                  Madera aserrada de pino y eucalipto, tableros y chips.
                  Originación en Misiones, Corrientes y la región oriental de
                  Paraguay.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-outfit-semibold text-midnight-green mb-2">
                  Cueros
                </h3>
                <p className="text-midnight-green/55 leading-relaxed font-outfit-regular max-w-xl">
                  Cueros vacunos wet-blue y curtidos con destino a curtiembres
                  en Italia, Turquía y el sudeste asiático.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-outfit-semibold text-midnight-green mb-2">
                  Logística integral
                </h3>
                <p className="text-midnight-green/55 leading-relaxed font-outfit-regular max-w-xl">
                  Embarques desde los puertos de Rosario, Buenos Aires y Zárate.
                  Gestión documental, despacho aduanero y seguimiento puerta a
                  puerta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact — sin botones, sin iconos, solo la información */}
      <section className="bg-midnight-green py-20 md:py-28">
        <div className="container-custom flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-white/30 text-sm font-outfit-regular mb-3">
              Contacto
            </p>
            <a
              href="mailto:info@plataformasur.com"
              className="text-white text-xl md:text-3xl font-outfit-bold hover:text-emerald transition-colors duration-300"
            >
              info@plataformasur.com
            </a>
          </div>
          <p className="text-white/25 text-sm font-outfit-regular">
            Buenos Aires, Argentina
          </p>
        </div>
      </section>
    </>
  );
}
