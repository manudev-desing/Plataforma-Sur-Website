"use client";

import { motion } from "framer-motion";
import { Wheat, Trees, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Productos() {
  const productCategories = [
    {
      icon: Wheat,
      title: "Granos",
      description: "Productos agrícolas de calidad desde América del Sur.",
      image: "/images/products/granos.jpg",
    },
    {
      icon: Trees,
      title: "Madera",
      description: "Productos forestales de origen sostenible.",
      image: "/images/products/madera.jpg",
    },
    {
      icon: Package,
      title: "Cuero",
      description: "Productos de cuero de alta calidad.",
      image: "/images/products/cuero.jpg",
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
              Nuestros Productos
            </h1>
            <p className="text-xl md:text-2xl font-outfit-regular max-w-3xl mx-auto text-gray-100">
              Conectamos productos latinoamericanos de calidad con el mundo
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
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
              Productos de Calidad
            </h2>
            <p className="text-lg font-outfit-regular text-gray-700 max-w-2xl mx-auto">
              Solo comercializamos productos que superan estándares
              internacionales
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {productCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                {/* Image Placeholder */}
                <div className="relative">
                  <div className="aspect-[4/3] bg-gray-200 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center">
                    <div className="text-center p-8">
                      <category.icon
                        className="text-gray-400 mx-auto mb-4"
                        size={64}
                      />
                      <p className="text-gray-500 font-outfit-semibold text-lg">
                        {category.title}
                      </p>
                      <p className="text-gray-400 font-outfit-regular text-sm mt-2">
                        Imagen placeholder
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Reemplazar: {category.image}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald to-midnight-green rounded-xl flex items-center justify-center">
                      <category.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-outfit-bold text-midnight-green">
                      {category.title}
                    </h3>
                  </div>

                  <p className="text-lg font-outfit-regular text-gray-700 leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-outfit-bold text-midnight-green mb-6">
                Nuestro Compromiso
              </h2>
              <p className="text-lg font-outfit-regular text-gray-700 mb-6 leading-relaxed">
                Cumplimos nuestros acuerdos, tiempos y compromisos. Nuestra
                palabra es la garantía para nuestros clientes.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-outfit-semibold text-midnight-green">
                      Responsabilidad
                    </h3>
                    <p className="text-gray-700 font-outfit-regular text-sm">
                      Cumplimos nuestros acuerdos, tiempos y compromisos
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-outfit-semibold text-midnight-green">
                      Calidad
                    </h3>
                    <p className="text-gray-700 font-outfit-regular text-sm">
                      Solo comercializamos productos que superan estándares
                      internacionales
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald rounded-full mt-2"></div>
                  <div>
                    <h3 className="font-outfit-semibold text-midnight-green">
                      Confianza
                    </h3>
                    <p className="text-gray-700 font-outfit-regular text-sm">
                      Construimos relaciones duraderas, no transacciones
                      pasajeras
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-emerald to-midnight-green p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-outfit-bold mb-6">
                  Conectamos al mundo con lo mejor de Latinoamérica
                </h3>
                <p className="font-outfit-regular leading-relaxed">
                  A través de una plataforma confiable, ágil y estructurada que
                  garantiza la calidad y la transparencia en cada operación.
                </p>
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
              ¿Interesado en nuestros productos?
            </h2>
            <p className="text-lg font-outfit-regular text-gray-200 mb-8 max-w-2xl mx-auto">
              Contáctanos para conocer más sobre nuestros productos de calidad
              internacional
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
