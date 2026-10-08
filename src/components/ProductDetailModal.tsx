"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { useLang } from "@/context/LanguageContext";
import { companyConfig, createWhatsAppUrl, createEmailUrl } from "@/data/company";
import { getAssetPath } from "@/utils/assets";
import CountryFlag from "./CountryFlag";
import {
  X,
  Printer,
  MessageCircle,
  Mail,
  MapPin,
  CheckCircle,
  FileCheck,
  Package,
  Calendar,
  Layers,
  Sparkles,
  Info,
} from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { t } = useLang();

  if (!isOpen || !product) return null;

  const waMessage = `Hola, estoy interesado en *${product.name}* (origen ${product.country}). Me gustaría recibir cotización y disponibilidad. Gracias.`;
  const emailSubject = `Consulta comercial — ${product.name} (${product.country})`;
  const emailBody = `Hola,\n\nEstoy interesado en el producto "${product.name}" originario de ${product.country}.\n\nPor favor envíenme cotización indicando:\n- Cantidad disponible\n- Calibre / variedad\n- Presentación\n- Incoterm y puerto de embarque\n- Tiempo de entrega\n\nDestino: \nVolumen estimado: \n\nMuchas gracias.`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-6">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card */}
      <div className="relative z-10 my-8 w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Close Button Top-Right */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-muted/80 text-foreground transition-colors hover:bg-muted hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Scrollable Printable Container */}
        <div id="printable-sheet" className="max-h-[85vh] overflow-y-auto p-6 md:p-8">
          {/* Header Brand */}
          <div className="flex flex-col items-center gap-2 pb-4 text-center">
            <Image
              src={getAssetPath("/images/logos/isotipo.png")}
              alt="Plataforma Sur"
              width={100}
              height={140}
              className="h-10 w-auto"
            />
            <div className="font-outfit text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {companyConfig.companyName}
            </div>
            <div className="h-0.5 w-16 bg-accent" />
          </div>

          {/* Title & Origin Badge */}
          <div className="text-center">
            <h2 className="font-outfit text-2xl font-extrabold uppercase leading-tight tracking-tight text-primary sm:text-3xl">
              {t("sheet_title")}
              <br />
              <span className="text-accent">{product.name}</span>
            </h2>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
              <MapPin className="h-3.5 w-3.5" />
              <span>
                {t("sheet_origin")}: {t(`country_${product.country}`)} · {product.region}
              </span>
              <CountryFlag country={product.country} className="h-3 w-[18px]" />
            </div>
          </div>

          {/* Product Image */}
          <div className="my-6 flex items-center justify-center rounded-xl bg-muted/30 p-4">
            <div className="relative h-48 w-48 sm:h-56 sm:w-56">
              <Image
                src={getAssetPath(product.image)}
                alt={`${product.name} — ${product.country}`}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Short Bio */}
          <div className="pb-6 text-center text-sm leading-relaxed text-foreground sm:text-base">
            <p>
              <strong className="text-primary">{product.name}</strong>{" "}
              <em className="text-muted-foreground">({product.scientific})</em>.{" "}
              {product.description}
            </p>
          </div>

          {/* 6 Numbered Sections */}
          <div className="divide-y divide-border/60 rounded-xl border border-border/80 bg-white">
            {/* 1. Descripción */}
            <div className="p-4 sm:p-5">
              <h4 className="flex items-center gap-2 font-outfit text-sm font-bold uppercase tracking-wide text-primary">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                  1
                </span>
                {t("sec_1")}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {product.description}
              </p>
            </div>

            {/* 2. Características Físicas */}
            <div className="p-4 sm:p-5">
              <h4 className="flex items-center gap-2 font-outfit text-sm font-bold uppercase tracking-wide text-primary">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                  2
                </span>
                {t("sec_2")}
              </h4>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground sm:text-sm">
                <li>
                  <strong className="text-foreground">• {t("label_color")}:</strong>{" "}
                  {product.physical.color}
                </li>
                <li>
                  <strong className="text-foreground">• {t("label_smell")}:</strong>{" "}
                  {product.physical.smellTaste}
                </li>
                <li>
                  <strong className="text-foreground">• {t("label_appearance")}:</strong>{" "}
                  {product.physical.appearance}
                </li>
              </ul>
            </div>

            {/* 3. Parámetros de Calidad */}
            <div className="p-4 sm:p-5">
              <h4 className="flex items-center gap-2 font-outfit text-sm font-bold uppercase tracking-wide text-primary">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                  3
                </span>
                {t("sec_3")}
              </h4>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {product.qualityParameters.map((param, i) => (
                  <div key={i} className="rounded-md border border-border/60 bg-muted/30 p-2 text-xs">
                    <span className="block text-muted-foreground">{param.label}</span>
                    <span className="font-semibold text-primary">{param.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Parámetros Químicos */}
            <div className="p-4 sm:p-5">
              <h4 className="flex items-center gap-2 font-outfit text-sm font-bold uppercase tracking-wide text-primary">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                  4
                </span>
                {t("sec_4")}
              </h4>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {product.chemicalParameters.map((param, i) => (
                  <div key={i} className="rounded-md border border-border/60 bg-muted/30 p-2 text-xs">
                    <span className="block text-muted-foreground">{param.label}</span>
                    <span className="font-semibold text-primary">{param.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Condición */}
            <div className="p-4 sm:p-5">
              <h4 className="flex items-center gap-2 font-outfit text-sm font-bold uppercase tracking-wide text-primary">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                  5
                </span>
                {t("sec_5")}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {product.condition}
              </p>
            </div>

            {/* 6. Observación */}
            <div className="bg-accent/5 p-4 sm:p-5">
              <h4 className="flex items-center gap-2 font-outfit text-sm font-bold uppercase tracking-wide text-accent">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
                  6
                </span>
                {t("sec_6")}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-foreground sm:text-sm">
                {product.observation}
              </p>
            </div>
          </div>

          {/* Operational & Logistic Grid */}
          <div className="mt-6 grid gap-4 rounded-xl border border-border/80 bg-muted/20 p-5 sm:grid-cols-2">
            <div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                <Layers className="h-4 w-4 text-accent" /> {t("info_varieties")}
              </span>
              <p className="mt-1 text-xs text-muted-foreground">{product.varieties.join(", ")}</p>
            </div>

            <div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                <Sparkles className="h-4 w-4 text-accent" /> {t("info_calibers")}
              </span>
              <p className="mt-1 text-xs text-muted-foreground">{product.calibers.join(", ")}</p>
            </div>

            <div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                <Package className="h-4 w-4 text-accent" /> {t("info_packaging")}
              </span>
              <p className="mt-1 text-xs text-muted-foreground">{product.packaging.join(" · ")}</p>
            </div>

            <div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                <Calendar className="h-4 w-4 text-accent" /> {t("info_harvest")}
              </span>
              <p className="mt-1 text-xs text-muted-foreground">{product.harvestSeason}</p>
            </div>

            <div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                <CheckCircle className="h-4 w-4 text-accent" /> {t("info_incoterms")}
              </span>
              <p className="mt-1 text-xs text-muted-foreground">{product.incoterms.join(", ")}</p>
            </div>

            <div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                <FileCheck className="h-4 w-4 text-accent" /> {t("info_certifications")}
              </span>
              <p className="mt-1 text-xs text-muted-foreground">{product.certifications.join(", ")}</p>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={createWhatsAppUrl(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-emerald/90"
            >
              <MessageCircle className="h-4 w-4" />
              {t("cta_quote_wa")}
            </a>

            <a
              href={createEmailUrl(emailSubject, emailBody)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90"
            >
              <Mail className="h-4 w-4" />
              {t("cta_send_email")}
            </a>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent px-4 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
            >
              <Printer className="h-4 w-4" />
              {t("cta_download_pdf")}
            </button>
          </div>

          {/* Footer Contacts */}
          <div className="mt-6 rounded-lg bg-primary p-3 text-center text-xs text-white sm:flex sm:justify-around">
            <div>
              <strong>WhatsApp:</strong> {companyConfig.whatsappDisplay}
            </div>
            <div>
              <strong>Email:</strong> {companyConfig.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
