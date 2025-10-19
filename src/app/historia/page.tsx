"use client";

import { motion } from "framer-motion";
import { Globe, Heart, Target, Eye } from "lucide-react";

export default function Historia() {
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
              Historia de la Marca
            </h1>
            <p className="text-xl md:text-2xl font-outfit-regular max-w-3xl mx-auto text-gray-100">
              Un viaje de construcción de puentes entre culturas, regiones y
              personas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Historia Principal del Brandbook */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-outfit-bold text-midnight-green mb-6">
                Nuestros Inicios
              </h2>
              <div className="space-y-6 text-lg font-outfit-regular text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-midnight-green">
                    Plataforma Sur nació con una visión clara:
                  </strong>{" "}
                  llevar la riqueza de América Latina al mundo, sin barreras. Su
                  historia comienza hace tres años, impulsada por un grupo de
                  soñadores que entendieron que exportar no era solo mover
                  productos, sino construir puentes de confianza entre culturas,
                  entre regiones, entre personas.
                </p>
                <p>
                  Desde sus primeras exportaciones de granos hacia mercados
                  internacionales, la empresa supo que lo suyo no era un negocio
                  puntual:{" "}
                  <strong className="text-emerald">
                    era un compromiso con la excelencia, con el cumplimiento,
                    con la palabra empeñada.
                  </strong>
                </p>
                <p>
                  Hoy, Plataforma Sur representa una nueva forma de hacer
                  comercio internacional: cercana, confiable y sólida. Es una
                  marca que cree en la visión a largo plazo, que se mueve rápido
                  pero construye con paciencia. Que respeta los tiempos del
                  mundo, pero nunca pierde su origen.
                </p>
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
                <Globe className="text-emerald mb-6" size={48} />
                <h3 className="text-2xl font-outfit-bold mb-4">
                  Más que una empresa
                </h3>
                <p className="font-outfit-regular leading-relaxed text-gray-100 mb-4">
                  Plataforma Sur es más que una empresa. Es un estilo de vida.
                  Es movimiento. Es expansión.
                </p>
                <p className="font-outfit-bold text-emerald text-lg">
                  Es el sur que exporta al mundo, con corazón y estrategia.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Misión y Visión del Brandbook */}
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
              Misión y Visión
            </h2>
            <p className="text-lg font-outfit-regular text-gray-700 max-w-2xl mx-auto">
              Los pilares que definen nuestro propósito y guían nuestro camino
              hacia el futuro
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <Target className="text-emerald mb-6" size={48} />
              <h3 className="text-2xl font-outfit-bold text-midnight-green mb-6">
                Misión
              </h3>
              <div className="space-y-4 font-outfit-regular text-gray-700 leading-relaxed">
                <p>
                  Brindar soluciones eficientes de exportación desde América del
                  Sur al mundo, asegurando el cumplimiento de estándares
                  internacionales, tiempos pactados y un servicio confiable.
                </p>
                <p>
                  <strong className="text-midnight-green">
                    Creamos relaciones de largo plazo
                  </strong>{" "}
                  con nuestros clientes a través de un servicio estructurado,
                  cercano y proactivo.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <Eye className="text-emerald mb-6" size={48} />
              <h3 className="text-2xl font-outfit-bold text-midnight-green mb-6">
                Visión
              </h3>
              <div className="space-y-4 font-outfit-regular text-gray-700 leading-relaxed">
                <p>
                  Convertirnos en la principal plataforma exportadora de
                  Latinoamérica, reconocida a nivel mundial por su solidez,
                  compromiso y capacidad de conectar productos de calidad con
                  mercados globales.
                </p>
                <p>
                  <strong className="text-midnight-green">
                    Ser un referente de confianza, innovación y crecimiento
                    sostenible
                  </strong>{" "}
                  en el comercio internacional y mundial.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Propósito */}
      <section className="section-padding bg-midnight-green text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-outfit-bold mb-6">
              Nuestro Propósito
            </h2>
            <p className="text-lg font-outfit-regular text-gray-200 mb-8 max-w-2xl mx-auto">
              Nuestro propósito crea puentes
            </p>
            <div className="bg-emerald/10 backdrop-blur-sm p-8 rounded-2xl border border-emerald/20">
              <h3 className="text-2xl md:text-3xl font-outfit-bold text-emerald mb-4">
                CONECTAR AL MUNDO CON LA RIQUEZA DE LATINOAMÉRICA
              </h3>
              <p className="text-xl font-outfit-regular text-gray-100">
                a través de una plataforma confiable, sólida y en constante
                expansión.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Personalidad y Valores */}
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
              Personalidad y Valores
            </h2>
            <p className="text-lg font-outfit-regular text-gray-700 max-w-3xl mx-auto">
              Plataforma Sur es como ese socio confiable que cumple, resuelve y
              siempre piensa en el próximo paso. Es sólida, estratégica y
              humana.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Personalidad */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-outfit-bold text-midnight-green mb-8">
                Personalidad
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: "Confiable", desc: "Siempre cumple lo que promete" },
                  { title: "Ágil", desc: "Responde con rapidez y eficiencia" },
                  {
                    title: "Cercana",
                    desc: "Crea vínculos humanos, no solo negocios",
                  },
                  {
                    title: "Inspiradora",
                    desc: "Contagia energía, transmite solidez y abre caminos",
                  },
                ].map((trait, index) => (
                  <motion.div
                    key={trait.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-emerald/5 p-6 rounded-lg"
                  >
                    <h4 className="font-outfit-bold text-midnight-green text-lg mb-2">
                      {trait.title}
                    </h4>
                    <p className="font-outfit-regular text-gray-600 text-sm">
                      {trait.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Valores */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-outfit-bold text-midnight-green mb-8">
                Valores
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Responsabilidad",
                    desc: "Cumplimos nuestros acuerdos, tiempos y compromisos. Nuestra palabra es la garantía para nuestros clientes.",
                  },
                  {
                    title: "Calidad",
                    desc: "Solo comercializamos productos que superan estándares internacionales.",
                  },
                  {
                    title: "Confianza",
                    desc: "Construimos relaciones duraderas, no transacciones pasajeras.",
                  },
                ].map((valor, index) => (
                  <motion.div
                    key={valor.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-3 h-3 bg-emerald rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-outfit-bold text-midnight-green text-lg mb-2">
                        {valor.title}
                      </h4>
                      <p className="font-outfit-regular text-gray-700 leading-relaxed">
                        {valor.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Esencia de Marca */}
      <section className="section-padding bg-gradient-to-r from-emerald to-midnight-green text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-outfit-bold mb-8">
              Esencia de Marca
            </h2>
            <div className="bg-white/10 backdrop-blur-sm p-12 rounded-3xl">
              <Heart className="text-emerald mx-auto mb-8" size={64} />
              <h3 className="text-4xl md:text-5xl font-outfit-bold mb-6">
                "Conectamos al mundo con lo mejor de Latinoamérica"
              </h3>
              <p className="text-xl font-outfit-regular text-gray-200 max-w-2xl mx-auto">
                Esta es nuestra esencia, el corazón que late en cada operación,
                en cada relación que construimos
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
