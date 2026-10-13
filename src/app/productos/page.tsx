"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductosRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirige transparentemente al catálogo interactivo principal con ancla
    router.replace("/#productos");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-outfit">
      <div className="text-center p-8">
        <div className="w-10 h-10 border-4 border-emerald border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-midnight-green">
          Cargando catálogo oficial de Plataforma Sur...
        </p>
      </div>
    </div>
  );
}
