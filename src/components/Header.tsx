"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Nosotros", href: "/historia" },
  { name: "Servicios", href: "/servicios" },
  { name: "Contacto", href: "/contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container-custom flex items-center justify-between h-20">
          <Link
            href="/"
            className={`font-outfit-bold text-sm tracking-wide transition-colors duration-500 ${
              scrolled ? "text-midnight-green" : "text-white"
            }`}
          >
            Plataforma Sur
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-outfit-regular transition-colors duration-300 ${
                  scrolled
                    ? "text-midnight-green/70 hover:text-midnight-green"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className={`md:hidden transition-colors duration-500 ${
              scrolled ? "text-midnight-green" : "text-white"
            }`}
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-midnight-green flex flex-col transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-white"
            aria-label="Cerrar menú"
          >
            <X className="w-7 h-7" />
          </button>
        </div>
        <nav className="flex-1 flex flex-col items-center justify-center gap-8">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-white text-2xl font-outfit-regular hover:text-emerald transition-colors"
          >
            Inicio
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-2xl font-outfit-regular hover:text-emerald transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
