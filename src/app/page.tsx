'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="w-full flex flex-col">
      {/* 1. Hero */}
      <section className="relative w-full min-h-[90vh] bg-midnight-green text-white flex items-center pt-20 pb-24 overflow-hidden">
        <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="lg:col-span-8 flex flex-col items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-outfit-bold leading-[1.05] tracking-tight mb-12">
              Conectando <br />
              <span className="text-emerald">Latinoamérica</span> <br />
              con el mundo.
            </h1>
            <Link href="/contacto" className="btn-primary group">
              Iniciar operaciones
              <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-4 hidden lg:flex justify-end items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <div className="text-[18rem] leading-none font-outfit-bold text-white/5 tracking-tighter">
              S.
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Proof strip */}
      <section className="w-full bg-white border-b border-gray-200 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-gray-200">
            <div className="flex flex-col md:px-8 first:pl-0 last:pr-0">
              <span className="text-5xl md:text-6xl font-outfit-semibold text-midnight-green mb-2">15+</span>
              <span className="text-sm font-outfit-medium text-gray-500 uppercase tracking-widest">Países destino</span>
            </div>
            <div className="flex flex-col md:px-8">
              <span className="text-5xl md:text-6xl font-outfit-semibold text-midnight-green mb-2">2.5M</span>
              <span className="text-sm font-outfit-medium text-gray-500 uppercase tracking-widest">Ton. exportadas</span>
            </div>
            <div className="flex flex-col md:px-8">
              <span className="text-5xl md:text-6xl font-outfit-semibold text-midnight-green mb-2">25</span>
              <span className="text-sm font-outfit-medium text-gray-500 uppercase tracking-widest">Años de exp.</span>
            </div>
            <div className="flex flex-col md:px-8">
              <span className="text-5xl md:text-6xl font-outfit-semibold text-midnight-green mb-2">200+</span>
              <span className="text-sm font-outfit-medium text-gray-500 uppercase tracking-widest">Partners</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What we do */}
      <section className="section-padding bg-[#f8fafc]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-6 flex flex-col">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-outfit-bold text-midnight-green leading-tight mb-8">
                Logística global sin fricción.
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                Gestionamos cadenas de suministro complejas, conectando productores de materias primas con los mercados de mayor demanda global. Nuestro enfoque es pragmático, eficiente y basado en datos reales.
              </p>
            </div>
            
            <div className="lg:col-span-6 flex flex-col justify-center space-y-12">
              <div className="pl-6 border-l-2 border-emerald">
                <h3 className="text-2xl font-outfit-semibold text-midnight-green mb-3">Originación y Sourcing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Identificamos y consolidamos volumen de productos de alta calidad en toda la región sur del continente, asegurando trazabilidad y cumplimiento de estándares internacionales.
                </p>
              </div>
              
              <div className="pl-6 border-l-2 border-emerald">
                <h3 className="text-2xl font-outfit-semibold text-midnight-green mb-3">Transporte Multimodal</h3>
                <p className="text-gray-600 leading-relaxed">
                  Optimizamos rutas marítimas y terrestres para maximizar la eficiencia en costos y tiempos de tránsito, con monitoreo continuo de la carga.
                </p>
              </div>
              
              <div className="pl-6 border-l-2 border-emerald">
                <h3 className="text-2xl font-outfit-semibold text-midnight-green mb-3">Gestión Aduanera</h3>
                <p className="text-gray-600 leading-relaxed">
                  Resolvemos la complejidad regulatoria transfronteriza, minimizando tiempos de retención y asegurando operaciones transparentes en cada jurisdicción.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Values */}
      <section className="section-padding bg-white border-y border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
            <div className="flex flex-col">
              <h3 className="text-4xl md:text-5xl font-outfit-bold text-midnight-green mb-6 tracking-tight">Certeza.</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                En el comercio internacional, la incertidumbre es el mayor costo. Ejecutamos cada operación con precisión milimétrica para garantizar resultados predecibles.
              </p>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-4xl md:text-5xl font-outfit-bold text-midnight-green mb-6 tracking-tight">Escala.</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Nuestra infraestructura y red de contactos nos permite manejar volúmenes significativos sin comprometer la agilidad ni la atención al detalle.
              </p>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-4xl md:text-5xl font-outfit-bold text-midnight-green mb-6 tracking-tight">Visión.</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                No solo respondemos al mercado actual; anticipamos tendencias globales para posicionar la oferta de nuestros clientes en los mercados más rentables del futuro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-24 md:py-32 bg-midnight-green text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-outfit-bold leading-tight max-w-2xl">
              Escale sus operaciones globales hoy.
            </h2>
            <Link href="/contacto" className="btn-primary group shrink-0">
              Contactar equipo
              <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
