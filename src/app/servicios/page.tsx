"use client";

import { motion } from "framer-motion";
import { Truck, Shield, Globe2, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Servicios() {
  const services = [
    {
      icon: Globe2,
      title: "Exportación inteligente",
      description:
        "No solo se trata de mover productos, sino de hacerlo con precisión, cumplimiento y visión estratégica.",
      image: "/images/services/exportacion.jpg",
    },
    {
      icon: Truck,
      title: "Conexión internacional",
      description:
        "La marca actúa como un puente entre Latinoamérica y el mundo, generando relaciones duraderas con empresas y mercados globales.",
      image: "/images/services/conexion.jpg",
    },
    {
      icon: Shield,
      title: "Confianza estructural",
      description:
        "Un entorno donde la palabra vale, los tiempos se cumplen y la calidad es no negociable.",
      image: "/images/services/confianza.jpg",
    },
    {
      icon: Target,
      title: "Versatilidad y proyección",
      description:
        "Desde granos hasta madera o cuero, el territorio de la marca es amplio y dinámico, abriendo nuevas rutas de comercio.",
      image: "/images/services/versatilidad.jpg",
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
              Nuestros Servicios
            </h1>
            <p className="text-xl md:text-2xl font-outfit-regular max-w-3xl mx-auto text-gray-100">
              Brindar soluciones eficientes de exportación desde América del Sur
              al mundo
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
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
            <p className="text-lg font-outfit-regular text-gray-700 max-w-2xl mx-auto">
              El espacio conceptual donde la marca se desenvuelve, se expresa y
              construye su identidad
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                {/* Image Placeholder */}
                <div className="relative">
                  <div className="aspect-[16/9] bg-gray-200 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center">
                    <div className="text-center p-8">
                      <service.icon
                        className="text-gray-400 mx-auto mb-4"
                        size={64}
                      />
                      <p className="text-gray-500 font-outfit-semibold text-lg">
                        {service.title}
                      </p>
                      <p className="text-gray-400 font-outfit-regular text-sm mt-2">
                        Imagen placeholder
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Reemplazar: {service.image}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald to-midnight-green rounded-xl flex items-center justify-center">
                      <service.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-outfit-bold text-midnight-green">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-700 font-outfit-regular leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
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
                Nuestra Misión
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
              <Shield className="text-emerald mb-6" size={48} />
              <h3 className="text-2xl font-outfit-bold text-midnight-green mb-6">
                Nuestra Visión
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

      {/* Additional Territory Elements */}
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
              Solidez Corporativa sin Rigidez
            </h2>
            <p className="text-lg font-outfit-regular text-gray-700 max-w-3xl mx-auto">
              Actúa con estructura, pero sin burocracia. Plataforma Sur es ágil,
              cercana y resolutiva.
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
                Nuestra Personalidad
              </h3>
              <p className="text-lg font-outfit-regular text-gray-700 mb-8 leading-relaxed">
                Plataforma Sur es como ese socio confiable que cumple, resuelve
                y siempre piensa en el próximo paso. Es sólida, estratégica y
                humana.
              </p>
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
                    className="bg-emerald/5 p-4 rounded-lg"
                  >
                    <h4 className="font-outfit-bold text-midnight-green mb-2">
                      {trait.title}
                    </h4>
                    <p className="font-outfit-regular text-gray-600 text-sm">
                      {trait.desc}
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
                  Propuesta de Valor
                </h4>
                <p className="font-outfit-regular leading-relaxed text-lg">
                  "Conectamos productos latinoamericanos de calidad con el
                  mundo, a través de una plataforma confiable, ágil y
                  estructurada."
                </p>
                <div className="mt-8">
                  <div className="w-16 h-1 bg-emerald"></div>
                  <p className="text-2xl font-outfit-bold mt-4">Confianza</p>
                  <p className="text-emerald font-outfit-semibold">
                    Valor fundamental
                  </p>
                </div>
              </div>
            </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-outfit-bold mb-6">
              ¿Listo para conectar con el mundo?
            </h2>
            <p className="text-lg font-outfit-regular text-gray-200 mb-8 max-w-2xl mx-auto">
              Conectamos al mundo con la riqueza de Latinoamérica a través de
              una plataforma confiable, sólida y en constante expansión
            </p>
            <Link
              href="/contacto"
              className="btn-primary inline-flex items-center gap-2"
            >
              Conectar con nosotros
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
