"use client";

import React, { useState, useMemo } from "react";
import { products, localizeProduct, Product } from "@/data/products";
import { useLang } from "@/context/LanguageContext";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";
import CountryFlag, { CountryName } from "./CountryFlag";

const COUNTRIES: CountryName[] = ["Argentina", "Bolivia", "Perú"];
const CATEGORIES = ["Legumbres", "Granos", "Semillas", "Andinos"] as const;

export const ProductCatalog: React.FC = () => {
  const { t, lang } = useLang();
  const [selectedCountry, setSelectedCountry] = useState<string>("Todos");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter and localize products
  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (p) =>
          (selectedCountry === "Todos" || p.country === selectedCountry) &&
          (selectedCategory === "Todas" || p.category === selectedCategory)
      )
      .map((p) => localizeProduct(p, lang));
  }, [selectedCountry, selectedCategory, lang]);

  const handleOpenModal = (prod: Product) => {
    setActiveProduct(prod);
    setModalOpen(true);
  };

  return (
    <section id="productos" className="bg-gradient-subtle py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {t("catalog_eyebrow")}
          </span>
          <h2 className="font-outfit text-3xl font-bold text-foreground md:text-4xl">
            {t("catalog_title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {t("catalog_subtitle")}
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-10 flex flex-col gap-5 rounded-2xl border border-border/80 bg-white p-5 shadow-sm md:p-6">
          {/* Origin filter */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {t("filter_origin")}:
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCountry("Todos")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedCountry === "Todos"
                    ? "bg-primary text-white shadow-sm"
                    : "border border-border bg-muted/40 text-foreground hover:bg-muted"
                }`}
              >
                {t("filter_all_origins")}
              </button>
              {COUNTRIES.map((country) => (
                <button
                  key={country}
                  type="button"
                  onClick={() => setSelectedCountry(country)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    selectedCountry === country
                      ? "bg-primary text-white shadow-sm"
                      : "border border-border bg-muted/40 text-foreground hover:bg-muted"
                  }`}
                >
                  <CountryFlag country={country} className="h-3 w-[18px]" />
                  <span>{t(`country_${country}`)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Category filter */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              {t("filter_category")}:
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("Todas")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === "Todas"
                    ? "bg-accent text-white shadow-sm"
                    : "border border-border bg-muted/40 text-foreground hover:bg-muted"
                }`}
              >
                {t("filter_all_categories")}
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-accent text-white shadow-sm"
                      : "border border-border bg-muted/40 text-foreground hover:bg-muted"
                  }`}
                >
                  {t(`cat_${cat}`)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-white py-16 text-center text-muted-foreground">
            {t("no_results")}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((prod, idx) => (
              <ProductCard
                key={prod.id}
                product={prod}
                index={idx}
                onOpen={handleOpenModal}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeProduct}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};

export default ProductCatalog;
