"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-midnight-green text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 bg-gray-200 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center">
                <span className="text-xs font-outfit-bold text-gray-500">
                  LOGO
                </span>
              </div>
              <span className="font-outfit-bold text-xl text-white">
                Plataforma Sur
              </span>
            </div>
            <p className="text-gray-300 font-outfit-regular">
              Del sur al mundo: calidad que cruza fronteras, relaciones que
              permanecen.
            </p>
            <p className="text-gray-300 text-sm font-outfit-regular">
              Conectando al mundo con la riqueza de Latinoamérica.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-outfit-bold text-lg text-white">Navegación</h3>
            <div className="space-y-2">
              {[
                { name: "Inicio", href: "/" },
                { name: "Historia", href: "/historia" },
                { name: "Servicios", href: "/servicios" },
                { name: "Productos", href: "/productos" },
                { name: "Valores", href: "/valores" },
                { name: "Contacto", href: "/contacto" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-300 hover:text-emerald transition-colors font-outfit-regular"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-outfit-bold text-lg text-white">Servicios</h3>
            <div className="space-y-2">
              {[
                "Exportación",
                "Logística Internacional",
                "Cumplimiento Normativo",
                "Trazabilidad",
                "Consultoría",
              ].map((service) => (
                <p key={service} className="text-gray-300 font-outfit-regular">
                  {service}
                </p>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-outfit-bold text-lg text-white">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-emerald" />
                <span className="text-gray-300 font-outfit-regular text-sm">
                  Buenos Aires, Argentina
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-emerald" />
                <span className="text-gray-300 font-outfit-regular text-sm">
                  +54 11 1234-5678
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-emerald" />
                <span className="text-gray-300 font-outfit-regular text-sm">
                  info@plataformasur.com
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <h4 className="font-outfit-semibold text-white">Síguenos</h4>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Instagram, href: "#" },
                ].map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="text-gray-300 hover:text-emerald transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm font-outfit-regular">
              © 2024 Plataforma Sur. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacidad"
                className="text-gray-300 hover:text-emerald transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terminos"
                className="text-gray-300 hover:text-emerald transition-colors"
              >
                Términos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
