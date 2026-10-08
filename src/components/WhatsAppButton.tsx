"use client";

import React from "react";
import { createWhatsAppUrl } from "@/data/company";
import { MessageCircle } from "lucide-react";

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={createWhatsAppUrl(
        "Hola, vengo del sitio web y me interesa recibir información sobre sus productos."
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-white shadow-elegant transition-all duration-300 hover:scale-110 hover:bg-emerald/90 md:bottom-6 md:right-6"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="sr-only">Abrir chat de WhatsApp</span>
    </a>
  );
};

export default WhatsAppButton;
