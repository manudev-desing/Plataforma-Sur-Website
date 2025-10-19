"use client";

import { motion } from "framer-motion";
import { Shield, Award, Heart, Target, Eye, Users } from "lucide-react";

export default function Valores() {
  const coreValues = [
    {
      icon: Shield,
      title: "Responsabilidad",
      description:
        "Cumplimos nuestros acuerdos, tiempos y compromisos. Nuestra palabra es la garantía para nuestros clientes.",
      color: "from-midnight-green to-emerald",
    },
    {
      icon: Award,
      title: "Calidad",
      description:
        "Solo comercializamos productos que superan estándares internacionales.",
      color: "from-emerald to-midnight-green",
    },
    {
      icon: Heart,
      title: "Confianza",
      description:
        "Construimos relaciones duraderas, no transacciones pasajeras.",
      color: "from-midnight-green/80 to-emerald/80",
    },
  ];

  const personalityTraits = [
    {
      title: "Confiable",
      description: "Siempre cumple lo que promete",
      icon: Shield,
    },
    {
      title: "Ágil",
      description: "Responde con rapidez y eficiencia",
      icon: Target,
    },
    {
      title: "Cercana",
      description: "Crea vínculos humanos, no solo negocios",
      icon: Users,
    },
    {
      title: "Inspiradora",
      description: "Contagia energía, transmite solidez y abre caminos",
      icon: Eye,
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-midnight-green via-midnight-green to-emerald">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-outfit-bold mb-6">
              Personalidad y Valores
            </h1>
            <p className="text-xl md:text-2xl font-outfit-regular max-w-4xl mx-auto text-gray-100">
              Plataforma Sur es como ese socio confiable que cumple, resuelve y
              siempre piensa en el próximo paso. Es sólida, estratégica y
              humana.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Personalidad */}
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
              Nuestra Personalidad
            </h2>
            <p className="text-lg font-outfit-regular text-gray-700 max-w-3xl mx-auto">
              Así es como nos comportamos, así es como nos relacionamos con el
              mundo
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {personalityTraits.map((trait, index) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 text-center card-hover"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald to-midnight-green rounded-xl flex items-center justify-center mx-auto mb-6">
                  <trait.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-outfit-bold text-midnight-green mb-4">
                  {trait.title}
                </h3>
                <p className="text-gray-700 font-outfit-regular leading-relaxed">
                  {trait.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
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
              Nuestros Valores
            </h2>
            <p className="text-lg font-outfit-regular text-gray-700 max-w-3xl mx-auto">
              Los principios fundamentales que guían cada una de nuestras
              decisiones y acciones
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden card-hover"
              >
                {/* Header with icon */}
                <div
                  className={`bg-gradient-to-br ${value.color} p-8 text-center`}
                >
                  <value.icon className="text-white mx-auto mb-4" size={64} />
                  <h3 className="text-2xl font-outfit-bold text-white">
                    {value.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-lg font-outfit-regular text-gray-700 leading-relaxed text-center">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Territorio de Marca */}
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
              Nuestro Territorio
            </h2>
            <p className="text-lg font-outfit-regular text-gray-700 max-w-3xl mx-auto">
              El espacio conceptual donde la marca se desenvuelve, se expresa y
              construye su identidad
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Exportación inteligente",
                description:
                  "No solo se trata de mover productos, sino de hacerlo con precisión, cumplimiento y visión estratégica.",
              },
              {
                title: "Conexión internacional",
                description:
                  "La marca actúa como un puente entre Latinoamérica y el mundo, generando relaciones duraderas con empresas y mercados globales.",
              },
              {
                title: "Confianza estructural",
                description:
                  "Un entorno donde la palabra vale, los tiempos se cumplen y la calidad es no negociable.",
              },
              {
                title: "Versatilidad y proyección",
                description:
                  "Desde granos hasta madera o cuero, el territorio de la marca es amplio y dinámico, abriendo nuevas rutas de comercio.",
              },
              {
                title: "Solidez corporativa sin rigidez",
                description:
                  "Actúa con estructura, pero sin burocracia. Plataforma Sur es ágil, cercana y resolutiva.",
              },
            ].map((territory, index) => (
              <motion.div
                key={territory.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald/5 to-midnight-green/5 rounded-2xl p-8 border border-emerald/10"
              >
                <h3 className="text-xl font-outfit-bold text-midnight-green mb-4">
                  {territory.title}
                </h3>
                <p className="text-gray-700 font-outfit-regular leading-relaxed">
                  {territory.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Valor Fundamental */}
      <section className="section-padding bg-gradient-to-r from-midnight-green to-emerald text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-outfit-bold mb-8">
              Nuestro Valor Fundamental
            </h2>
            <div className="bg-white/10 backdrop-blur-sm p-12 rounded-3xl max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-outfit-bold text-emerald mb-6">
                Comercio Internacional de Confianza
              </h3>
              <p className="text-xl font-outfit-regular mb-6">
                "Conectamos productos latinoamericanos de calidad con el mundo,
                a través de una plataforma confiable, ágil y estructurada."
              </p>
              <div className="w-16 h-1 bg-emerald mx-auto"></div>
              <p className="text-2xl font-outfit-bold mt-6">Confianza</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Palabras Clave */}
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
              Palabras que nos Definen
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "Conexión",
              "Seguridad",
              "Expansión",
              "Transparencia",
              "Negocios duraderos",
              "Precisión",
            ].map((word, index) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center shadow-md card-hover"
              >
                <span className="text-lg font-outfit-semibold text-midnight-green">
                  {word}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
