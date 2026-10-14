"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { BrandLogo } from "@/components/BrandLogo";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const navItems = [
    { href: "/#inicio", label: t("nav_home") || "Inicio" },
    { href: "/#origenes", label: t("nav_origins") || "Orígenes" },
    { href: "/#productos", label: t("nav_products") || "Catálogo" },
    { href: "/#nosotros", label: t("nav_about") || "Nosotros" },
    { href: "/historia", label: "Historia" },
    { href: "/#contacto", label: t("nav_contact") || "Contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-white/95 backdrop-blur-md shadow-sm py-2"
          : "bg-white/80 backdrop-blur-sm py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12">
        {/* Brand Logo */}
        <Link href="/" aria-label="Plataforma Sur · Global Business">
          <BrandLogo size="md" theme="light" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs lg:text-sm font-semibold text-midnight-green/85 transition-colors hover:text-emerald"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Language Switcher */}
          <div className="flex overflow-hidden rounded-full border border-border text-xs font-bold p-0.5 bg-muted/40">
            <button
              type="button"
              onClick={() => setLang("ES")}
              className={`px-3 py-1 rounded-full transition-all ${
                lang === "ES"
                  ? "bg-midnight-green text-white shadow-xs"
                  : "bg-transparent text-midnight-green/70 hover:text-midnight-green"
              }`}
              aria-pressed={lang === "ES"}
            >
              ESP
            </button>
            <button
              type="button"
              onClick={() => setLang("EN")}
              className={`px-3 py-1 rounded-full transition-all ${
                lang === "EN"
                  ? "bg-midnight-green text-white shadow-xs"
                  : "bg-transparent text-midnight-green/70 hover:text-midnight-green"
              }`}
              aria-pressed={lang === "EN"}
            >
              ENG
            </button>
          </div>

          <a
            href="/#contacto"
            className="inline-flex items-center justify-center rounded-lg bg-emerald px-4 py-2 text-xs lg:text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-emerald-light hover:-translate-y-0.5 active:translate-y-0"
          >
            {t("cta_contact") || "Cotizar"}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-midnight-green hover:bg-muted md:hidden"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Fullscreen Mobile Overlay per Brandbook §7.3 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] min-h-[calc(100vh-60px)] bg-midnight-green text-white p-8 flex flex-col justify-between md:hidden z-50 overflow-y-auto"
          >
            <nav className="flex flex-col gap-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-light mb-2">
                Navegación
              </span>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-outfit text-2xl font-bold text-white hover:text-emerald transition-colors py-1 flex items-center justify-between border-b border-white/10"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-emerald" />
                </Link>
              ))}
            </nav>

            <div className="pt-8 mt-6 border-t border-white/20 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white/70">Idioma</span>
                <div className="flex rounded-full border border-white/20 p-0.5 bg-white/5">
                  <button
                    type="button"
                    onClick={() => setLang("ES")}
                    className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
                      lang === "ES" ? "bg-emerald text-white" : "text-white/70"
                    }`}
                  >
                    Español
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("EN")}
                    className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${
                      lang === "EN" ? "bg-emerald text-white" : "text-white/70"
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              <a
                href="/#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center rounded-xl bg-emerald py-3.5 text-base font-bold text-white shadow-lg transition-colors hover:bg-emerald-light"
              >
                {t("cta_contact") || "Solicitar Cotización"}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
