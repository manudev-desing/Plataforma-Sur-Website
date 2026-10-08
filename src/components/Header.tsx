"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { getAssetPath } from "@/utils/assets";
import { BrandLogo } from "@/components/BrandLogo";
import { Menu, X } from "lucide-react";

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const navItems = [
    { href: "#inicio", label: t("nav_home") },
    { href: "#origenes", label: t("nav_origins") },
    { href: "#productos", label: t("nav_products") },
    { href: "#nosotros", label: t("nav_about") },
    { href: "#contacto", label: t("nav_contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6 md:h-20 md:px-12">
        {/* Brand Logo */}
        <a href="#inicio" aria-label="Plataforma Sur · Global Business">
          <BrandLogo size="md" theme="light" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/85 transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Language Switcher */}
          <div className="flex overflow-hidden rounded-full border border-border text-xs font-semibold">
            <button
              type="button"
              onClick={() => setLang("ES")}
              className={`px-3 py-1 transition-colors ${
                lang === "ES"
                  ? "bg-primary text-white"
                  : "bg-transparent text-foreground/70 hover:bg-muted"
              }`}
              aria-pressed={lang === "ES"}
            >
              ESP
            </button>
            <button
              type="button"
              onClick={() => setLang("EN")}
              className={`px-3 py-1 transition-colors ${
                lang === "EN"
                  ? "bg-primary text-white"
                  : "bg-transparent text-foreground/70 hover:bg-muted"
              }`}
              aria-pressed={lang === "EN"}
            >
              ENG
            </button>
          </div>

          <a
            href="#contacto"
            className="inline-flex items-center justify-center rounded-md bg-emerald px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald/90"
          >
            {t("cta_contact")}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-white md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex flex-1 overflow-hidden rounded-full border border-border text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setLang("ES")}
                  className={`flex-1 px-3 py-1.5 transition-colors ${
                    lang === "ES" ? "bg-primary text-white" : "bg-transparent text-foreground/70"
                  }`}
                >
                  ESP
                </button>
                <button
                  type="button"
                  onClick={() => setLang("EN")}
                  className={`flex-1 px-3 py-1.5 transition-colors ${
                    lang === "EN" ? "bg-primary text-white" : "bg-transparent text-foreground/70"
                  }`}
                >
                  ENG
                </button>
              </div>
            </div>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-emerald py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald/90"
            >
              {t("cta_contact")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
