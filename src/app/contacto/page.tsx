'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

interface ContactFormData {
  name: string
  email: string
  company: string
  phone: string
  subject: string
  message: string
  productInterest: string
}

export default function Contacto() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Form data:', data)
    setIsSubmitted(true)
    setIsSubmitting(false)
    reset()
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Ubicación',
      details: [
        'Buenos Aires, Argentina',
        'Av. Corrientes 1234, Piso 10',
        'C1043AAZ - Microcentro'
      ]
    },
    {
      icon: Phone,
      title: 'Teléfono',
      details: [
        '+54 11 1234-5678',
        '+54 11 8765-4321',
        'WhatsApp disponible'
      ]
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'info@plataformasur.com',
        'ventas@plataformasur.com',
        'contacto@plataformasur.com'
      ]
    },
    {
      icon: Clock,
      title: 'Horarios',
      details: [
        'Lun - Vie: 9:00 - 18:00',
        'Sáb: 9:00 - 13:00',
        'GMT-3 (Buenos Aires)'
      ]
    }
  ]

  const offices = [
    {
      city: 'Buenos Aires',
      country: 'Argentina',
      address: 'Av. Corrientes 1234, Piso 10',
      phone: '+54 11 1234-5678',
      email: 'buenosaires@plataformasur.com'
    },
    {
      city: 'São Paulo',
      country: 'Brasil',
      address: 'Rua Augusta 2000, Sala 1501',
      phone: '+55 11 3456-7890',
      email: 'saopaulo@plataformasur.com'
    },
    {
      city: 'Montevideo',
      country: 'Uruguay',
      address: '18 de Julio 1234, Oficina 801',
      phone: '+598 2 345-6789',
      email: 'montevideo@plataformasur.com'
    }
  ]

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
              Conectemos
            </h1>
            <p className="text-xl md:text-2xl font-outfit-regular max-w-3xl mx-auto text-gray-100">
              Estamos aquí para construir el puente hacia nuevas oportunidades comerciales
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-outfit-bold text-midnight-green mb-6">
                Envíanos tu consulta
              </h2>
              <p className="text-lg text-gray-700 font-outfit-regular mb-8">
                Completa el formulario y nuestro equipo te contactará en menos de 24 horas.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald/10 border border-emerald rounded-lg p-8 text-center"
                >
                  <div className="w-16 h-16 bg-emerald rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-outfit-bold text-midnight-green mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-gray-700 font-outfit-regular">
                    Gracias por contactarnos. Te responderemos pronto.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-outfit-semibold text-midnight-green mb-2">
                        Nombre completo *
                      </label>
                      <input
                        {...register('name', { required: 'El nombre es requerido' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald focus:border-transparent font-outfit-regular"
                        placeholder="Tu nombre completo"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-outfit-semibold text-midnight-green mb-2">
                        Email *
                      </label>
                      <input
                        {...register('email', { 
                          required: 'El email es requerido',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Email no válido'
                          }
                        })}
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald focus:border-transparent font-outfit-regular"
                        placeholder="tu@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-outfit-semibold text-midnight-green mb-2">
                        Empresa
                      </label>
                      <input
                        {...register('company')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald focus:border-transparent font-outfit-regular"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-outfit-semibold text-midnight-green mb-2">
                        Teléfono
                      </label>
                      <input
                        {...register('phone')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald focus:border-transparent font-outfit-regular"
                        placeholder="+54 11 1234-5678"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-outfit-semibold text-midnight-green mb-2">
                      Área de interés
                    </label>
                    <select
                      {...register('productInterest')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald focus:border-transparent font-outfit-regular"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="granos">Granos y Cereales</option>
                      <option value="madera">Madera Certificada</option>
                      <option value="cueros">Cueros y Pieles</option>
                      <option value="especiales">Productos Especiales</option>
                      <option value="servicios">Servicios de Exportación</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-outfit-semibold text-midnight-green mb-2">
                      Asunto *
                    </label>
                    <input
                      {...register('subject', { required: 'El asunto es requerido' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald focus:border-transparent font-outfit-regular"
                      placeholder="Breve descripción del tema"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-outfit-semibold text-midnight-green mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      {...register('message', { required: 'El mensaje es requerido' })}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald focus:border-transparent font-outfit-regular resize-none"
                      placeholder="Cuéntanos más detalles sobre tu consulta..."
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar mensaje
                        <Send size={20} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-outfit-bold text-midnight-green mb-6">
                Información de contacto
              </h2>
              
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-emerald/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="text-emerald" size={24} />
                    </div>
                    <div>
                      <h3 className="font-outfit-semibold text-midnight-green mb-2">
                        {info.title}
                      </h3>
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-700 font-outfit-regular">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-outfit-semibold text-midnight-green mb-4">
                  Síguenos en redes sociales
                </h3>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, href: '#', name: 'Facebook' },
                    { icon: Twitter, href: '#', name: 'Twitter' },
                    { icon: Linkedin, href: '#', name: 'LinkedIn' },
                    { icon: Instagram, href: '#', name: 'Instagram' },
                  ].map(({ icon: Icon, href, name }) => (
                    <a
                      key={name}
                      href={href}
                      className="w-10 h-10 bg-emerald/10 rounded-lg flex items-center justify-center hover:bg-emerald hover:text-white transition-colors"
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offices */}
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
              Nuestras Oficinas
            </h2>
            <p className="text-lg font-outfit-regular text-gray-700 max-w-2xl mx-auto">
              Presencia regional para estar más cerca de nuestros socios comerciales
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg card-hover text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald to-midnight-green rounded-xl flex items-center justify-center mx-auto mb-6">
                  <MapPin className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-outfit-bold text-midnight-green mb-2">
                  {office.city}
                </h3>
                <p className="text-emerald font-outfit-semibold mb-4">
                  {office.country}
                </p>
                <div className="space-y-2 text-sm text-gray-700 font-outfit-regular">
                  <p>{office.address}</p>
                  <p>{office.phone}</p>
                  <p>{office.email}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-emerald/5">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-outfit-bold text-midnight-green mb-6">
              ¿Prefieres hablar directamente?
            </h2>
            <p className="text-lg font-outfit-regular text-gray-700 mb-8 max-w-2xl mx-auto">
              Nuestro equipo de especialistas está disponible para una consulta personalizada 
              sobre tus necesidades de exportación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+541112345678"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Phone size={20} />
                Llamar ahora
              </a>
              <a
                href="mailto:info@plataformasur.com"
                className="btn-secondary inline-flex items-center gap-2"
              >
                <Mail size={20} />
                Enviar email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}