"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  TrendingUp,
  Shield,
  Users,
  Target,
  Eye,
  Heart,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-white rounded-full"></div>
          <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-white rounded-full"></div>
        </div>

        <div className="container-custom relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-outfit-bold leading-tight">
              Del sur al mundo:
              <br />
              <span className="text-emerald">calidad que cruza fronteras</span>
            </h1>

            {/* Subtitle - Narrativa clave del brandbook */}
            <p className="text-xl md:text-2xl font-outfit-regular max-w-3xl mx-auto text-gray-100">
              Relaciones que permanecen. Conectamos al mundo con la riqueza de
              Latinoamérica a través de una plataforma confiable, sólida y en
              constante expansión.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contacto"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Conectar con nosotros
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/servicios" className="btn-secondary">
                  Conocer servicios
                </Link>
              </motion.div>
            </div>

            {/* Key Messages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
              {[
                {
                  title: "Exportamos valor",
                  subtitle: "conectamos al mundo con propósito",
                },
                { title: "La confianza", subtitle: "también se exporta" },
                {
                  title: "Relaciones que",
                  subtitle: "trascienden formalidades",
                },
              ].map((message, index) => (
                <motion.div
                  key={message.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-lg md:text-xl font-outfit-bold text-emerald">
                    {message.title}
                  </div>
                  <div className="text-sm md:text-base font-outfit-regular text-gray-200">
                    {message.subtitle}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floating World Map Illustration */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-20 right-10 opacity-20"
          >
            <Globe size={200} />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Purpose Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-outfit-bold text-midnight-green mb-6">
              Nuestro propósito crea puentes
            </h2>
            <p className="text-xl font-outfit-regular text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Conectar al mundo con la riqueza de Latinoamérica a través de una
              plataforma confiable, sólida y en constante expansión.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-outfit-bold text-midnight-green mb-6">
                Una plataforma que conecta continentes
              </h3>
              <p className="text-lg font-outfit-regular text-gray-700 mb-8 leading-relaxed">
                En Plataforma Sur, somos más que una empresa exportadora. Somos
                el puente que conecta la riqueza de Latinoamérica con el mundo,
                construyendo relaciones sólidas basadas en confianza, calidad y
                responsabilidad.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: Shield,
                    title: "Confianza",
                    desc: "Relaciones sólidas y transparentes",
                  },
                  {
                    icon: TrendingUp,
                    title: "Crecimiento",
                    desc: "Oportunidades que trascienden fronteras",
                  },
                  {
                    icon: Users,
                    title: "Compromiso",
                    desc: "Con nuestros socios y el planeta",
                  },
                  {
                    icon: Globe,
                    title: "Alcance Global",
                    desc: "Conexiones en múltiples mercados",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 bg-emerald/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <item.icon className="text-emerald" size={24} />
                    </div>
                    <h4 className="font-outfit-semibold text-midnight-green mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 font-outfit-regular">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-midnight-green to-emerald p-8 rounded-2xl text-white">
                <h4 className="text-2xl font-outfit-bold mb-6">
                  Nuestros Valores
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-outfit-semibold">Responsabilidad</h5>
                      <p className="text-gray-200 font-outfit-regular text-sm">
                        Cumplimos nuestros acuerdos, tiempos y compromisos
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-outfit-semibold">Calidad</h5>
                      <p className="text-gray-200 font-outfit-regular text-sm">
                        Solo comercializamos productos que superan estándares
                        internacionales
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-outfit-semibold">Confianza</h5>
                      <p className="text-gray-200 font-outfit-regular text-sm">
                        Construimos relaciones duraderas, no transacciones
                        pasajeras
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Personalidad Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-outfit-bold text-midnight-green mb-6">
              Valores que nos definen
            </h2>
            <p className="text-lg font-outfit-regular text-gray-700 mb-8 leading-relaxed">
              Nuestra personalidad como empresa se refleja en cada interacción:
              somos confiables, ágiles, cercanos e inspiradores. Estos valores
              guían cada decisión y acción.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Confiable",
                desc: "Siempre cumple lo que promete",
                color: "from-emerald to-emerald/80",
              },
              {
                icon: Target,
                title: "Ágil",
                desc: "Responde con rapidez y eficiencia",
                color: "from-midnight-green to-midnight-green/80",
              },
              {
                icon: Users,
                title: "Cercana",
                desc: "Crea vínculos humanos, no solo negocios",
                color: "from-emerald to-midnight-green",
              },
              {
                icon: Eye,
                title: "Inspiradora",
                desc: "Contagia energía, transmite solidez y abre caminos",
                color: "from-midnight-green to-emerald",
              },
            ].map((trait, index) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg card-hover text-center"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${trait.color} rounded-xl flex items-center justify-center mx-auto mb-6`}
                >
                  <trait.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-outfit-bold text-midnight-green mb-4">
                  {trait.title}
                </h3>
                <p className="text-gray-700 font-outfit-regular leading-relaxed">
                  {trait.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-midnight-green text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Heart className="text-emerald mx-auto mb-6" size={48} />
            <h2 className="text-3xl md:text-4xl font-outfit-bold mb-6">
              "Conectamos al mundo con lo mejor de Latinoamérica"
            </h2>
            <p className="text-lg font-outfit-regular text-gray-200 mb-8 max-w-2xl mx-auto">
              Esta es nuestra esencia. ¿Listo para ser parte de esta conexión
              global?
            </p>
            <Link
              href="/contacto"
              className="btn-primary inline-flex items-center gap-2"
            >
              Comenzar ahora
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
