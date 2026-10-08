"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { useLang } from "@/context/LanguageContext";
import { getAssetPath } from "@/utils/assets";
import CountryFlag from "./CountryFlag";
import { FileText } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
  onOpen: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index, onOpen }) => {
  const { t } = useLang();
  const formattedIndex = String(index + 1).padStart(2, "0");
  const presentation = product.packaging[0] ?? "—";

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-primary/15 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-card-hover">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between bg-primary px-4 py-2.5 text-white">
        <span className="font-outfit text-sm font-bold tracking-widest text-emerald">
          {formattedIndex}
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider">
          <CountryFlag country={product.country} className="h-3 w-[18px]" />
          {t(`country_${product.country}`)}
        </span>
      </div>

      {/* Product Image */}
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative aspect-square w-full overflow-hidden bg-white cursor-pointer"
        aria-label={`${t("card_view_sheet")} — ${product.name}`}
      >
        <Image
          src={getAssetPath(product.image)}
          alt={`${product.name} — ${product.country}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover p-3 transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm backdrop-blur-sm">
          {t(`cat_${product.category}`)}
        </span>
      </button>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-outfit text-lg font-bold uppercase leading-tight text-primary">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs italic text-muted-foreground">{product.scientific}</p>
          <p className="mt-2 text-xs font-medium text-primary/80">
            <span className="text-muted-foreground">Región:</span> {product.region}
          </p>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>
        </div>

        <div className="mt-4 border-t border-border/60 pt-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{t("card_presentation")}</span>
            <span className="font-medium text-foreground">{presentation}</span>
          </div>

          <button
            type="button"
            onClick={() => onOpen(product)}
            className="mt-3.5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary/5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            <FileText className="h-4 w-4" />
            {t("card_view_sheet")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
