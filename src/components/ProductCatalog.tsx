"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/data/products";
import { catalogFacade } from "@/facades/catalog-facade";
import { useLang } from "@/context/LanguageContext";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";
import CountryFlag, { CountryName } from "./CountryFlag";
import ScrollReveal from "./ScrollReveal";
import { Search, Sparkles, Filter, Layers } from "lucide-react";

const COUNTRIES: CountryName[] = ["Argentina", "Bolivia", "Perú"];
const CATEGORIES = ["Legumbres", "Granos", "Semillas", "Andinos"] as const;

export const ProductCatalog: React.FC = () => {
  const { t, lang, cmsRevision } = useLang();
  const [selectedCountry, setSelectedCountry] = useState<string>("Todos");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Filter and localize products via CatalogFacade
  const filteredProducts = useMemo(() => {
    const list = catalogFacade.getFilteredProducts({
      country: selectedCountry,
      category: selectedCategory,
      lang,
    });

    if (!searchFilter.trim()) return list;

    const query = searchFilter.trim().toLowerCase();
    return list.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.scientific.toLowerCase().includes(query) ||
        p.region.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query)
    );
  }, [selectedCountry, selectedCategory, searchFilter, lang, cmsRevision]);

  const handleOpenModal = (prod: Product) => {
    setActiveProduct(prod);
    setModalOpen(true);
  };

  return (
    <section id="productos" className="relative bg-gradient-subtle py-24 md:py-32 border-t border-border">
      {/* Background radial accent */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Editorial Header */}
        <ScrollReveal variant="fade-up">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 border border-emerald/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-midnight-green mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald" />
              {t("catalog_eyebrow") || "Líneas de Exportación Verificadas"}
            </span>
            <h2 className="font-outfit text-3xl font-extrabold text-midnight-green sm:text-4xl lg:text-5xl tracking-tight">
              {t("catalog_title") || "Catálogo de Granos & Legumbres"}
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t("catalog_subtitle") || "Consulte especificaciones de humedad, calibres, pureza y temporadas de cosecha para cada producto con trazabilidad de origen."}
            </p>
          </div>
        </ScrollReveal>

        {/* Refined Interactive Filter Control Bar */}
        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="mb-12 rounded-3xl border border-border/80 bg-white p-6 shadow-sm backdrop-blur-sm">
            <div className="grid gap-6 lg:grid-cols-12 items-center">
              {/* Search input (4 cols) */}
              <div className="lg:col-span-4 relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Buscar por grano, variedad o región..."
                  className="w-full rounded-2xl border border-border bg-muted/30 pl-10 pr-4 py-2.5 text-xs text-midnight-green placeholder:text-muted-foreground focus:border-emerald focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald/20 transition-all"
                />
              </div>

              {/* Country & Category Filters (8 cols) */}
              <div className="lg:col-span-8 flex flex-wrap items-center justify-between gap-4">
                {/* Origins */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-midnight-green mr-2 hidden sm:inline">
                    Origen:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedCountry("Todos")}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                      selectedCountry === "Todos"
                        ? "bg-midnight-green text-white shadow-xs"
                        : "border border-border/80 bg-muted/40 text-midnight-green hover:bg-muted"
                    }`}
                  >
                    Todos
                  </button>
                  {COUNTRIES.map((country) => (
                    <button
                      key={country}
                      type="button"
                      onClick={() => setSelectedCountry(country)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                        selectedCountry === country
                          ? "bg-midnight-green text-white shadow-xs"
                          : "border border-border/80 bg-muted/40 text-midnight-green hover:bg-muted"
                      }`}
                    >
                      <CountryFlag country={country} className="h-2.5 w-4 rounded-2xs" />
                      <span>{t(`country_${country}`)}</span>
                    </button>
                  ))}
                </div>

                {/* Categories */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-midnight-green mr-2 hidden sm:inline">
                    Rubro:
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory("Todas")}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                      selectedCategory === "Todas"
                        ? "bg-emerald text-white shadow-xs"
                        : "border border-border/80 bg-muted/40 text-midnight-green hover:bg-muted"
                    }`}
                  >
                    Todas
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                        selectedCategory === cat
                          ? "bg-emerald text-white shadow-xs"
                          : "border border-border/80 bg-muted/40 text-midnight-green hover:bg-muted"
                      }`}
                    >
                      {t(`cat_${cat}`)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Counter Bar */}
            <div className="mt-4 pt-3.5 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Mostrando <strong className="text-midnight-green font-bold">{filteredProducts.length}</strong> de{" "}
                <strong className="text-midnight-green font-bold">17</strong> fichas técnicas oficiales
              </span>
              {(selectedCountry !== "Todos" || selectedCategory !== "Todas" || searchFilter) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCountry("Todos");
                    setSelectedCategory("Todas");
                    setSearchFilter("");
                  }}
                  className="text-xs font-semibold text-emerald hover:underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-white py-20 text-center text-muted-foreground">
            <Layers className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-base font-semibold text-midnight-green">No se encontraron productos coincidentes</p>
            <p className="text-xs text-muted-foreground mt-1">Pruebe ajustando el país de origen o el rubro de búsqueda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((prod, idx) => (
              <ScrollReveal key={prod.id} variant="fade-up" delay={(idx % 4) * 0.08}>
                <ProductCard
                  product={prod}
                  index={idx}
                  onOpen={handleOpenModal}
                />
              </ScrollReveal>
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
