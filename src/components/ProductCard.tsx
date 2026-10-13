"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { useLang } from "@/context/LanguageContext";
import { getAssetPath } from "@/utils/assets";
import CountryFlag from "./CountryFlag";
import { FileText, ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
  onOpen: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index, onOpen }) => {
  const { t } = useLang();
  const formattedIndex = String(index + 1).padStart(2, "0");
  const presentation = product.packaging[0] ?? "Bolsas PP 25/50 kg";

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald/40 hover:shadow-card-hover">
      {/* Top Bar with Number & Flag */}
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-2.5">
        <span className="font-mono text-xs font-bold text-emerald">
          #{formattedIndex}
        </span>
        <div className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 shadow-xs border border-border/60">
          <CountryFlag country={product.country} className="h-3 w-[18px] rounded-xs" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-midnight-green">
            {t(`country_${product.country}`)}
          </span>
        </div>
      </div>

      {/* Product Image Area with Hover Zoom */}
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-muted/20 to-muted/60 cursor-pointer p-4"
        aria-label={`${t("card_view_sheet")} — ${product.name}`}
      >
        <div className="relative w-full h-full">
          <Image
            src={getAssetPath(product.image)}
            alt={`${product.name} — ${product.country}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-108"
          />
        </div>

        {/* Category Pill Badge */}
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-midnight-green shadow-sm backdrop-blur-sm border border-border/60">
          {t(`cat_${product.category}`)}
        </span>
      </button>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-outfit text-lg font-bold leading-tight text-midnight-green transition-colors group-hover:text-emerald">
              {product.name}
            </h3>
            <span className="text-muted-foreground/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>

          <p className="mt-1 text-xs italic text-muted-foreground font-mono">{product.scientific}</p>

          <p className="mt-2.5 text-xs text-midnight-green font-medium">
            <span className="text-muted-foreground font-normal">Región:</span> {product.region}
          </p>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>
        </div>

        {/* Footer info & CTA */}
        <div className="mt-5 border-t border-border/60 pt-3.5">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-3">
            <span>{t("card_presentation") || "Presentación"}</span>
            <span className="font-semibold text-midnight-green truncate max-w-[140px] text-right">
              {presentation}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onOpen(product)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald/10 py-2.5 text-xs font-bold text-midnight-green transition-all duration-200 hover:bg-emerald hover:text-white"
          >
            <FileText className="h-3.5 w-3.5 text-emerald group-hover:text-white" />
            <span>{t("card_view_sheet") || "Ver Ficha Técnica"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
