"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { cmsFacade } from "@/facades/cms-facade";
import { catalogFacade } from "@/facades/catalog-facade";
import { BilingualProductRecord } from "@/services/cms-service";
import { Product, QualityParam } from "@/data/products";
import { CompanyConfig } from "@/data/company";
import { BrandLogo } from "@/components/BrandLogo";
import CountryFlag, { CountryName } from "@/components/CountryFlag";
import ProductDetailModal from "@/components/ProductDetailModal";
import { getAssetPath } from "@/utils/assets";
import {
  Lock,
  LogOut,
  Plus,
  Save,
  Trash2,
  Copy,
  Eye,
  Database,
  Globe,
  Building2,
  Package,
  Search,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  FileCode2,
  Sparkles,
} from "lucide-react";

const BUILTIN_PRODUCT_IMAGES = [
  "/images/products/alubia-blanco.jpg",
  "/images/products/frijol-negro.jpg",
  "/images/products/sesamo-blanco.jpg",
  "/images/products/sesamo-negro.jpg",
  "/images/products/soya.jpg",
  "/images/products/maiz-amarillo.jpg",
  "/images/products/mung.jpg",
  "/images/products/adzuki.jpg",
  "/images/products/chia.jpg",
  "/images/products/quinua-blanca.jpg",
  "/images/products/quinua-roja.jpg",
  "/images/products/quinua-negra.jpg",
  "/images/products/quinua-tricolor.jpg",
  "/images/products/lima-bean.jpg",
  "/images/products/mani-runner.jpg",
];

const SUPABASE_SQL_SNIPPET = `-- Ejecuta este script en el SQL Editor de tu proyecto Supabase:
CREATE TABLE IF NOT EXISTS public.cms_products (
  id TEXT PRIMARY KEY,
  country TEXT NOT NULL CHECK (country IN ('Argentina', 'Bolivia', 'Perú')),
  category TEXT NOT NULL CHECK (category IN ('Legumbres', 'Granos', 'Semillas', 'Andinos')),
  sort_order INTEGER NOT NULL DEFAULT 100,
  es_payload JSONB NOT NULL,
  en_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.cms_translations (
  locale TEXT PRIMARY KEY CHECK (locale IN ('ES', 'EN')),
  dictionary JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.cms_company_config (
  id TEXT PRIMARY KEY DEFAULT 'default',
  config_payload JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.cms_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_company_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read cms_products" ON public.cms_products FOR SELECT USING (true);
CREATE POLICY "Public Read cms_translations" ON public.cms_translations FOR SELECT USING (true);
CREATE POLICY "Public Read cms_company_config" ON public.cms_company_config FOR SELECT USING (true);
CREATE POLICY "CMS Write cms_products" ON public.cms_products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "CMS Write cms_translations" ON public.cms_translations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "CMS Write cms_company_config" ON public.cms_company_config FOR ALL USING (true) WITH CHECK (true);`;

const TRANSLATION_GROUPS: {
  title: string;
  keys: { key: string; label: string }[];
}[] = [
  {
    title: "Portada Principal (Hero & ADN de Marca)",
    keys: [
      { key: "tagline", label: "Tagline Corporativo" },
      { key: "brand_essence", label: "Esencia de Marca" },
      { key: "brand_narrative", label: "Narrativa Clave" },
      { key: "hero_title_1", label: "Título Hero (Línea 1)" },
      { key: "hero_title_2", label: "Título Hero (Línea 2 - Acento Esmeralda)" },
      { key: "hero_cta_catalog", label: "Botón Ver Catálogo" },
      { key: "hero_cta_whatsapp", label: "Botón WhatsApp Hero" },
    ],
  },
  {
    title: "Sección Nuestros Orígenes (Argentina, Bolivia, Perú)",
    keys: [
      { key: "origins_eyebrow", label: "Etiqueta Superior Orígenes" },
      { key: "origins_title", label: "Título Orígenes" },
      { key: "origins_subtitle", label: "Subtítulo Orígenes" },
      { key: "origin_summary_AR", label: "Resumen Argentina" },
      { key: "origin_summary_BO", label: "Resumen Bolivia" },
      { key: "origin_summary_PE", label: "Resumen Perú" },
    ],
  },
  {
    title: "Sección Catálogo y Fichas Técnicas",
    keys: [
      { key: "catalog_eyebrow", label: "Etiqueta Catálogo" },
      { key: "catalog_title", label: "Título Catálogo" },
      { key: "catalog_subtitle", label: "Subtítulo Catálogo" },
      { key: "card_view_sheet", label: "Botón Ver Ficha Técnica" },
      { key: "sheet_title", label: "Título Modal Ficha Técnica" },
    ],
  },
  {
    title: "Sección Por Qué Elegirnos (Pilares B2B)",
    keys: [
      { key: "whyus_eyebrow", label: "Etiqueta Por Qué Elegirnos" },
      { key: "whyus_title", label: "Título Por Qué Elegirnos" },
      { key: "feat1_title", label: "Pilar 1: Título" },
      { key: "feat1_text", label: "Pilar 1: Descripción" },
      { key: "feat2_title", label: "Pilar 2: Título" },
      { key: "feat2_text", label: "Pilar 2: Descripción" },
      { key: "feat3_title", label: "Pilar 3: Título" },
      { key: "feat3_text", label: "Pilar 3: Descripción" },
      { key: "feat4_title", label: "Pilar 4: Título" },
      { key: "feat4_text", label: "Pilar 4: Descripción" },
    ],
  },
  {
    title: "Pie de Página y Llamado a la Acción Comercial",
    keys: [
      { key: "footer_eyebrow", label: "Etiqueta Contacto Comercial" },
      { key: "footer_title", label: "Título CTA Footer" },
      { key: "footer_subtitle", label: "Subtítulo CTA Footer" },
      { key: "footer_about", label: "Descripción Corporativa Footer" },
      { key: "footer_rights", label: "Texto Derechos Reservados" },
    ],
  },
];

type MainTab = "products" | "copy" | "company" | "supabase";
type ProductSubTab = "general" | "bilingual" | "parameters" | "logistics";

const PRODUCT_SUB_TABS: { id: ProductSubTab; label: string }[] = [
  { id: "general", label: "1. Identidad, Origen e Imagen" },
  { id: "bilingual", label: "2. Textos y Descripciones (ES / EN)" },
  { id: "parameters", label: "3. Propiedades Físicas y Parámetros Lab" },
  { id: "logistics", label: "4. Calibres, Envases y Certificaciones" },
];

export default function AdminCmsPage() {
  const [adminToken, setAdminToken] = useState<string>("");
  const [passcodeInput, setPasscodeInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const [activeTab, setActiveTab] = useState<MainTab>("products");
  const [productSubTab, setProductSubTab] = useState<ProductSubTab>("general");

  // CMS Data States
  const [products, setProducts] = useState<BilingualProductRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [editingRecord, setEditingRecord] = useState<BilingualProductRecord | null>(null);

  // Filters in Product Manager
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterCountry, setFilterCountry] = useState<string>("Todos");
  const [filterCategory, setFilterCategory] = useState<string>("Todas");

  // Translations & Company States
  const [translationsEs, setTranslationsEs] = useState<Record<string, string>>({});
  const [translationsEn, setTranslationsEn] = useState<Record<string, string>>({});
  const [companyForm, setCompanyForm] = useState<CompanyConfig>({
    whatsapp: "",
    whatsappDisplay: "",
    email: "",
    companyName: "",
    tagline: "",
    website: "",
  });

  // Live Preview Modal
  const [previewLang, setPreviewLang] = useState<"ES" | "EN">("ES");
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);

  // Status banner
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );
  const [importJsonText, setImportJsonText] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);


  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  const refreshAllData = () => {
    const allProds = cmsFacade.getAllBilingualProducts();
    setProducts(allProds);
    const trans = cmsFacade.getSiteTranslations();
    setTranslationsEs(trans.ES ?? {});
    setTranslationsEn(trans.EN ?? {});
    setCompanyForm(cmsFacade.getCompanySettings());

    if (allProds.length > 0 && !selectedId) {
      setSelectedId(allProds[0].es.id);
      setEditingRecord(JSON.parse(JSON.stringify(allProds[0])));
    } else if (selectedId) {
      const found = allProds.find((p) => p.es.id === selectedId);
      if (found) {
        setEditingRecord(JSON.parse(JSON.stringify(found)));
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = window.sessionStorage.getItem("ps_cms_admin_token");
      if (savedToken && cmsFacade.verifyAdminToken(savedToken)) {
        setAdminToken(savedToken);
      }
    }
    refreshAllData();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = cmsFacade.authenticateAdmin(passcodeInput);
    if (!res.authenticated || !res.token) {
      setAuthError(res.error ?? "Clave incorrecta.");
      return;
    }
    setAdminToken(res.token);
    setAuthError("");
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("ps_cms_admin_token", res.token);
    }
    refreshAllData();
  };

  const handleLogout = () => {
    setAdminToken("");
    setPasscodeInput("");
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("ps_cms_admin_token");
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCountry =
        filterCountry === "Todos" || item.es.country === filterCountry;
      const matchesCategory =
        filterCategory === "Todas" || item.es.category === filterCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.es.name.toLowerCase().includes(q) ||
        (item.en.name ?? "").toLowerCase().includes(q) ||
        item.es.id.toLowerCase().includes(q) ||
        item.es.scientific.toLowerCase().includes(q) ||
        item.es.region.toLowerCase().includes(q);
      return matchesCountry && matchesCategory && matchesSearch;
    });
  }, [products, filterCountry, filterCategory, searchQuery]);

  const handleSelectProduct = (record: BilingualProductRecord) => {
    setSelectedId(record.es.id);
    setEditingRecord(JSON.parse(JSON.stringify(record)));
  };

  const handleCreateNewProduct = () => {
    const template = cmsFacade.createEmptyProductTemplate();
    setSelectedId(template.es.id);
    setEditingRecord(template);
    setProductSubTab("general");
    showToast("success", "Plantilla de nuevo producto lista para editar y guardar.");
  };

  const handleSaveProduct = async () => {
    if (!editingRecord) return;
    try {
      const saved = await cmsFacade.saveProduct(editingRecord, adminToken);
      setSelectedId(saved.es.id);
      refreshAllData();
      showToast(
        "success",
        `Ficha técnica "${saved.es.name}" guardada y sincronizada en el catálogo.`
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar el producto.";
      showToast("error", msg);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingRecord) return;
    try {
      setIsUploading(true);
      showToast("success", `Subiendo "${file.name}" a la nube (Cloudinary)...`);
      const res = await cmsFacade.uploadAsset(adminToken, file);
      setEditingRecord({
        ...editingRecord,
        es: { ...editingRecord.es, image: res.secureUrl },
      });
      showToast("success", `¡Imagen subida con éxito! URL vinculada al producto.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al subir imagen.";
      showToast("error", msg);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleDuplicateProduct = async (sourceId: string) => {

    try {
      const newId = `${sourceId}-copia-${Math.floor(10 + Math.random() * 89)}`;
      const dup = await cmsFacade.duplicateProduct(sourceId, newId, adminToken);
      setSelectedId(dup.es.id);
      setEditingRecord(JSON.parse(JSON.stringify(dup)));
      refreshAllData();
      showToast("success", `Producto duplicado como "${dup.es.id}".`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al duplicar.";
      showToast("error", msg);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (
      typeof window !== "undefined" &&
      !window.confirm(`¿Eliminar el producto "${name}" (${id}) del catálogo?`)
    ) {
      return;
    }
    try {
      await cmsFacade.deleteProduct(id, adminToken);
      const remaining = cmsFacade.getAllBilingualProducts();
      setProducts(remaining);
      if (remaining.length > 0) {
        setSelectedId(remaining[0].es.id);
        setEditingRecord(JSON.parse(JSON.stringify(remaining[0])));
      } else {
        setSelectedId("");
        setEditingRecord(null);
      }
      showToast("success", `Producto "${name}" eliminado.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al eliminar.";
      showToast("error", msg);
    }
  };

  const handleSaveTranslations = async () => {
    try {
      await cmsFacade.saveSiteTranslations("ES", translationsEs, adminToken);
      await cmsFacade.saveSiteTranslations("EN", translationsEn, adminToken);
      refreshAllData();
      showToast("success", "Textos bilingües (ES / EN) actualizados en toda la web.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar textos.";
      showToast("error", msg);
    }
  };

  const handleSaveCompany = async () => {
    try {
      await cmsFacade.saveCompanySettings(companyForm, adminToken);
      refreshAllData();
      showToast("success", "Datos comerciales de empresa actualizados.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar configuración.";
      showToast("error", msg);
    }
  };

  const handleSyncSupabase = async () => {
    const res = await cmsFacade.syncWithSupabase();
    refreshAllData();
    if (res.synced) {
      showToast("success", `Sincronizado con Supabase (${res.count} productos).`);
    } else {
      showToast(
        "success",
        `Modo Híbrido Local activo (${res.count} productos). Configura NEXT_PUBLIC_SUPABASE_URL para sincronizar en la nube.`
      );
    }
  };

  const handleDownloadBackup = () => {
    const json = cmsFacade.exportBackupJson();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `plataforma-sur-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("success", "Archivo de respaldo JSON descargado.");
  };

  const handleImportBackup = async () => {
    if (!importJsonText.trim()) {
      showToast("error", "Pega un JSON de respaldo válido primero.");
      return;
    }
    try {
      const res = await cmsFacade.importBackupJson(importJsonText, adminToken);
      setImportJsonText("");
      refreshAllData();
      showToast("success", `Respaldo restaurado (${res.importedProducts} productos).`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "JSON inválido.";
      showToast("error", msg);
    }
  };

  const handleResetFactory = async () => {
    if (
      typeof window !== "undefined" &&
      !window.confirm(
        "¿Restaurar los 17 productos y textos originales del Brandbook oficial?"
      )
    ) {
      return;
    }
    await cmsFacade.resetAllContentToSeed(adminToken);
    refreshAllData();
    showToast("success", "Catálogo y textos restaurados a los valores originales.");
  };

  // Build localized preview product for ProductDetailModal
  const previewProduct: Product | null = useMemo(() => {
    if (!editingRecord) return null;
    if (previewLang === "ES") return editingRecord.es;
    const en = editingRecord.en;
    return {
      ...editingRecord.es,
      name: en.name || editingRecord.es.name,
      region: en.region || editingRecord.es.region,
      shortDescription: en.shortDescription || editingRecord.es.shortDescription,
      description: en.description || editingRecord.es.description,
      physical: {
        color: en.physical?.color || editingRecord.es.physical.color,
        smellTaste: en.physical?.smellTaste || editingRecord.es.physical.smellTaste,
        appearance: en.physical?.appearance || editingRecord.es.physical.appearance,
      },
      qualityParameters:
        en.qualityParameters && en.qualityParameters.length > 0
          ? en.qualityParameters
          : editingRecord.es.qualityParameters,
      chemicalParameters:
        en.chemicalParameters && en.chemicalParameters.length > 0
          ? en.chemicalParameters
          : editingRecord.es.chemicalParameters,
      condition: en.condition || editingRecord.es.condition,
      observation: en.observation || editingRecord.es.observation,
      varieties: en.varieties?.length ? en.varieties : editingRecord.es.varieties,
      calibers: en.calibers?.length ? en.calibers : editingRecord.es.calibers,
      packaging: en.packaging?.length ? en.packaging : editingRecord.es.packaging,
      harvestSeason: en.harvestSeason || editingRecord.es.harvestSeason,
      certifications: en.certifications?.length
        ? en.certifications
        : editingRecord.es.certifications,
      incoterms: en.incoterms?.length ? en.incoterms : editingRecord.es.incoterms,
      uses: en.uses?.length ? en.uses : editingRecord.es.uses,
    };
  }, [editingRecord, previewLang]);

  const connectionStatus = cmsFacade.getConnectionStatus();

  // ============================================================================
  // 1. LOGIN GATE
  // ============================================================================
  if (!adminToken) {
    return (
      <div className="min-h-screen bg-[#04444D] flex flex-col justify-center items-center px-6 py-12 font-outfit">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl border border-[#D3E4E6]">
          <div className="flex flex-col items-center text-center mb-6">
            <BrandLogo size="md" theme="light" />
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#04BA70]/15 px-3 py-1 text-xs font-semibold text-[#04444D]">
              <Lock className="h-3.5 w-3.5 text-[#04BA70]" />
              Gestor de Contenidos B2B (CMS)
            </span>
            <h1 className="mt-3 text-2xl font-bold text-[#04444D]">
              Panel de Administración
            </h1>
            <p className="mt-1 text-sm text-[#3D6E75]">
              Edita productos, fichas técnicas (ES/EN), textos del sitio y conexión a Supabase.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="cms-passcode"
                className="block text-xs font-semibold uppercase tracking-wider text-[#04444D] mb-1.5"
              >
                Clave de Acceso Administrador
              </label>
              <input
                id="cms-passcode"
                type="password"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="Ingresa la clave de administrador..."
                className="w-full rounded-lg border border-[#D3E4E6] bg-[#F0F7F7]/50 px-4 py-2.5 text-sm text-[#04444D] focus:border-[#04BA70] focus:bg-white focus:outline-none"
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#04BA70] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#039A5C]"
            >
              Ingresar al Editor CMS
            </button>
          </form>

          <div className="mt-6 border-t border-[#D3E4E6] pt-4 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#04444D] hover:text-[#04BA70]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Volver al sitio web público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // 2. AUTHENTICATED WORDPRESS-STYLE CMS WORKSPACE
  // ============================================================================
  return (
    <div className="min-h-screen bg-[#F0F7F7] text-[#04444D] font-outfit flex flex-col">
      {/* Top Admin Bar (WordPress-inspired) */}
      <header className="sticky top-0 z-30 bg-[#04444D] text-white border-b border-[#065A66] shadow-md">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-4">
            <BrandLogo size="sm" theme="dark" />
            <span className="hidden sm:inline-block h-5 w-px bg-white/20" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#04BA70]">
              CMS Studio · WordPress Mode
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-medium ${
                connectionStatus.mode === "supabase"
                  ? "bg-[#04BA70]/20 text-[#2DD48D] border border-[#04BA70]/40"
                  : "bg-white/10 text-white/90 border border-white/20"
              }`}
            >
              <Database className="h-3.5 w-3.5 text-[#04BA70]" />
              {connectionStatus.mode === "supabase"
                ? "Supabase Conectado"
                : "Supabase Ready · Modo Híbrido"}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleSyncSupabase}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
            >
              <RefreshCw className="h-3.5 w-3.5 text-[#04BA70]" />
              <span>Sincronizar</span>
            </button>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#04BA70] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#039A5C]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Ver Web en Vivo</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Salir</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#033038] border-t border-white/10">
          <div className="max-w-[1600px] mx-auto flex overflow-x-auto px-6">
            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className={`inline-flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-semibold transition-colors ${
                activeTab === "products"
                  ? "border-[#04BA70] text-white bg-white/5"
                  : "border-transparent text-white/70 hover:text-white"
              }`}
            >
              <Package className="h-4 w-4 text-[#04BA70]" />
              <span>Catálogo y Fichas Técnicas ({products.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("copy")}
              className={`inline-flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-semibold transition-colors ${
                activeTab === "copy"
                  ? "border-[#04BA70] text-white bg-white/5"
                  : "border-transparent text-white/70 hover:text-white"
              }`}
            >
              <Globe className="h-4 w-4 text-[#04BA70]" />
              <span>Textos del Sitio (ES / EN)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("company")}
              className={`inline-flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-semibold transition-colors ${
                activeTab === "company"
                  ? "border-[#04BA70] text-white bg-white/5"
                  : "border-transparent text-white/70 hover:text-white"
              }`}
            >
              <Building2 className="h-4 w-4 text-[#04BA70]" />
              <span>Empresa y Contacto Comercial</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("supabase")}
              className={`inline-flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-semibold transition-colors ${
                activeTab === "supabase"
                  ? "border-[#04BA70] text-white bg-white/5"
                  : "border-transparent text-white/70 hover:text-white"
              }`}
            >
              <Database className="h-4 w-4 text-[#04BA70]" />
              <span>Supabase Cloud & Respaldos JSON</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-[#04BA70] bg-[#04444D] px-5 py-3.5 text-sm font-medium text-white shadow-2xl">
          {toast.type === "success" ? (
            <CheckCircle2 className="h-5 w-5 text-[#04BA70] shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Content Container */}
      <main className="max-w-[1600px] w-full mx-auto flex-1 p-6">
        {/* ===================================================================
            TAB 1: CATÁLOGO DE PRODUCTOS Y FICHAS TÉCNICAS (ES / EN)
        =================================================================== */}
        {activeTab === "products" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Sidebar: Product List & Filters (4 cols) */}
            <div className="lg:col-span-4 rounded-2xl border border-[#D3E4E6] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-[#04444D]">
                    Productos ({filteredProducts.length})
                  </h2>
                  <p className="text-xs text-[#3D6E75]">
                    Selecciona un producto o crea uno nuevo
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCreateNewProduct}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#04BA70] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#039A5C]"
                >
                  <Plus className="h-4 w-4" />
                  <span>Nuevo Producto</span>
                </button>
              </div>

              {/* Search & Filter */}
              <div className="space-y-3 mb-4">
                <div className="relative">
                  <Search className="h-4 w-4 text-[#3D6E75] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por nombre, ID o científico..."
                    className="w-full rounded-lg border border-[#D3E4E6] bg-[#F0F7F7]/60 pl-9 pr-3 py-2 text-xs text-[#04444D] focus:border-[#04BA70] focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={filterCountry}
                    onChange={(e) => setFilterCountry(e.target.value)}
                    className="rounded-lg border border-[#D3E4E6] bg-white px-2.5 py-1.5 text-xs font-medium text-[#04444D]"
                  >
                    <option value="Todos">Todos los orígenes</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Perú">Perú</option>
                  </select>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="rounded-lg border border-[#D3E4E6] bg-white px-2.5 py-1.5 text-xs font-medium text-[#04444D]"
                  >
                    <option value="Todas">Todas las categorías</option>
                    <option value="Legumbres">Legumbres</option>
                    <option value="Granos">Granos</option>
                    <option value="Semillas">Semillas</option>
                    <option value="Andinos">Andinos</option>
                  </select>
                </div>
              </div>

              {/* Scrollable List of Products */}
              <div className="max-h-[68vh] overflow-y-auto space-y-2 pr-1">
                {filteredProducts.map((item) => {
                  const isSelected = item.es.id === selectedId;
                  return (
                    <div
                      key={item.es.id}
                      onClick={() => handleSelectProduct(item)}
                      className={`cursor-pointer rounded-xl border p-3 transition-all ${
                        isSelected
                          ? "border-[#04BA70] bg-[#F0F7F7] shadow-sm"
                          : "border-[#D3E4E6]/80 bg-white hover:border-[#04444D]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={getAssetPath(item.es.image)}
                            alt={item.es.name}
                            className="h-10 w-10 rounded-lg object-cover border border-[#D3E4E6] bg-white shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-[#04444D] truncate">
                              {item.es.name}
                            </p>
                            <p className="text-[11px] text-[#3D6E75] truncate">
                              🇬🇧 {item.en.name || "Sin traducción EN"} ·{" "}
                              <span className="font-mono">{item.es.id}</span>
                            </p>
                          </div>
                        </div>
                        <CountryFlag
                          country={item.es.country as CountryName}
                          className="h-3.5 w-5 shrink-0"
                        />
                      </div>

                      <div className="mt-2.5 flex items-center justify-between border-t border-[#D3E4E6]/60 pt-2 text-[11px]">
                        <span className="rounded-full bg-[#04444D]/10 px-2 py-0.5 font-semibold text-[#04444D]">
                          {item.es.category}
                        </span>
                        <div
                          className="flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => handleDuplicateProduct(item.es.id)}
                            title="Duplicar producto"
                            className="rounded p-1 text-[#3D6E75] hover:bg-[#D3E4E6]/50 hover:text-[#04444D]"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteProduct(item.es.id, item.es.name)
                            }
                            title="Eliminar producto"
                            className="rounded p-1 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Workspace: Visual Technical Sheet Editor (8 cols) */}
            <div className="lg:col-span-8 rounded-2xl border border-[#D3E4E6] bg-white p-6 shadow-sm">
              {!editingRecord ? (
                <div className="py-20 text-center text-[#3D6E75]">
                  Selecciona un producto de la lista izquierda o haz clic en{" "}
                  <strong>Nuevo Producto</strong>.
                </div>
              ) : (
                <div>
                  {/* Editor Header & Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D3E4E6] pb-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#04BA70]/15 px-2.5 py-0.5 text-xs font-bold text-[#04444D]">
                          {editingRecord.es.country} · {editingRecord.es.category}
                        </span>
                        <span className="font-mono text-xs text-[#3D6E75]">
                          ID: {editingRecord.es.id}
                        </span>
                      </div>
                      <h2 className="mt-1 text-2xl font-bold text-[#04444D]">
                        {editingRecord.es.name}{" "}
                        <span className="text-base font-normal text-[#3D6E75]">
                          / {editingRecord.en.name || editingRecord.es.name}
                        </span>
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex rounded-lg border border-[#D3E4E6] bg-[#F0F7F7] p-0.5">
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewLang("ES");
                            setPreviewModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-[#04444D] hover:bg-white"
                        >
                          <Eye className="h-3.5 w-3.5 text-[#04BA70]" />
                          <span>Vista Previa Ficha (ES)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewLang("EN");
                            setPreviewModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-[#04444D] hover:bg-white"
                        >
                          <Eye className="h-3.5 w-3.5 text-[#04BA70]" />
                          <span>Preview Sheet (EN)</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={handleSaveProduct}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#04BA70] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[#039A5C]"
                      >
                        <Save className="h-4 w-4" />
                        <span>Guardar Ficha Técnica</span>
                      </button>
                    </div>
                  </div>

                  {/* Editor Sub-Tabs */}
                  <div className="flex flex-wrap gap-2 border-b border-[#D3E4E6] pb-3 mb-6">
                    {PRODUCT_SUB_TABS.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setProductSubTab(tab.id)}
                        className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                          productSubTab === tab.id
                            ? "bg-[#04444D] text-white"
                            : "bg-[#F0F7F7] text-[#04444D] hover:bg-[#E8F1F2]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* SUB-TAB 1: GENERAL, ORIGEN E IMAGEN */}
                  {productSubTab === "general" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#04444D] mb-1">
                            ID Único (Slug URL)
                          </label>
                          <input
                            type="text"
                            value={editingRecord.es.id}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                es: {
                                  ...editingRecord.es,
                                  id: e.target.value
                                    .toLowerCase()
                                    .replace(/[^a-z0-9-]/g, "-"),
                                },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] px-3 py-2 text-sm font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#04444D] mb-1">
                            País de Origen
                          </label>
                          <select
                            value={editingRecord.es.country}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                es: {
                                  ...editingRecord.es,
                                  country: e.target.value as Product["country"],
                                },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-sm"
                          >
                            <option value="Argentina">Argentina</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Perú">Perú</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#04444D] mb-1">
                            Categoría del Catálogo
                          </label>
                          <select
                            value={editingRecord.es.category}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                es: {
                                  ...editingRecord.es,
                                  category: e.target.value as Product["category"],
                                },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-sm"
                          >
                            <option value="Legumbres">Legumbres</option>
                            <option value="Granos">Granos</option>
                            <option value="Semillas">Semillas</option>
                            <option value="Andinos">Andinos</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-[#04444D] mb-1">
                            Nombre Científico (Botánico)
                          </label>
                          <input
                            type="text"
                            value={editingRecord.es.scientific}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                es: {
                                  ...editingRecord.es,
                                  scientific: e.target.value,
                                },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] px-3 py-2 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#04444D] mb-1">
                            Humedad de Referencia (Tarjeta)
                          </label>
                          <input
                            type="text"
                            value={editingRecord.es.moisture}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                es: {
                                  ...editingRecord.es,
                                  moisture: e.target.value,
                                },
                              })
                            }
                            placeholder="Ej: Máx. 14%"
                            className="w-full rounded-lg border border-[#D3E4E6] px-3 py-2 text-sm"
                          />
                        </div>
                      </div>

                      {/* Image Selector & Preview */}
                      <div className="rounded-xl border border-[#D3E4E6] bg-[#F0F7F7]/50 p-4">
                        <label className="block text-xs font-bold text-[#04444D] mb-2">
                          Fotografía del Producto (Ruta local o URL externa)
                        </label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <img
                            src={getAssetPath(editingRecord.es.image)}
                            alt={editingRecord.es.name}
                            className="h-24 w-24 rounded-xl object-contain bg-white border border-[#D3E4E6] p-1 shrink-0"
                          />
                          <div className="flex-1 w-full space-y-2">
                            <input
                              type="text"
                              value={editingRecord.es.image}
                              onChange={(e) =>
                                setEditingRecord({
                                  ...editingRecord,
                                  es: {
                                    ...editingRecord.es,
                                    image: e.target.value,
                                  },
                                })
                              }
                              placeholder="/images/products/alubia-blanco.jpg o https://..."
                              className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-xs font-mono"
                            />
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                              <label className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all cursor-pointer ${
                                isUploading
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-[#04BA70] hover:bg-[#039A5C]"
                              }`}>
                                <Upload className="h-4 w-4" />
                                <span>{isUploading ? "Subiendo a Cloudinary..." : "Subir Imagen desde mi Dispositivo (Cloudinary)"}</span>
                                <input
                                  type="file"
                                  accept="image/jpeg,image/png,image/webp,image/jpg"
                                  disabled={isUploading}
                                  onChange={handleFileUpload}
                                  className="hidden"
                                />
                              </label>
                              <span className="text-[11px] text-[#3D6E75]">
                                Formatos admitidos: JPG, PNG, WebP (Optimizado en la nube gratis)
                              </span>
                            </div>

                            <div>
                              <span className="block text-[11px] font-semibold text-[#3D6E75] mb-1">
                                O elige una fotografía oficial de la galería:
                              </span>

                              <div className="flex flex-wrap gap-1.5">
                                {BUILTIN_PRODUCT_IMAGES.map((imgPath) => (
                                  <button
                                    key={imgPath}
                                    type="button"
                                    onClick={() =>
                                      setEditingRecord({
                                        ...editingRecord,
                                        es: { ...editingRecord.es, image: imgPath },
                                      })
                                    }
                                    className={`rounded-md px-2 py-1 text-[11px] font-medium border transition-colors ${
                                      editingRecord.es.image === imgPath
                                        ? "border-[#04BA70] bg-[#04444D] text-white"
                                        : "border-[#D3E4E6] bg-white text-[#04444D] hover:bg-[#E8F1F2]"
                                    }`}
                                  >
                                    {imgPath.replace("/images/products/", "")}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB 2: TEXTOS BILINGÜES (ES / EN) */}
                  {productSubTab === "bilingual" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Español Column */}
                      <div className="space-y-4 rounded-xl border border-[#D3E4E6] bg-[#F0F7F7]/40 p-4">
                        <h3 className="text-sm font-bold text-[#04444D] border-b border-[#D3E4E6] pb-2">
                          🇪🇸 Versión en Español (Principal)
                        </h3>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Nombre del Producto (ES)
                          </label>
                          <input
                            type="text"
                            value={editingRecord.es.name}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                es: { ...editingRecord.es, name: e.target.value },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Región Productiva (ES)
                          </label>
                          <input
                            type="text"
                            value={editingRecord.es.region}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                es: { ...editingRecord.es, region: e.target.value },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Resumen Corto (Tarjeta Catálogo ES)
                          </label>
                          <textarea
                            rows={3}
                            value={editingRecord.es.shortDescription}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                es: {
                                  ...editingRecord.es,
                                  shortDescription: e.target.value,
                                },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-xs leading-relaxed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Descripción Completa Ficha Técnica (ES)
                          </label>
                          <textarea
                            rows={4}
                            value={editingRecord.es.description}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                es: {
                                  ...editingRecord.es,
                                  description: e.target.value,
                                },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-xs leading-relaxed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Condición del Producto (ES)
                          </label>
                          <textarea
                            rows={2}
                            value={editingRecord.es.condition}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                es: {
                                  ...editingRecord.es,
                                  condition: e.target.value,
                                },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Observación / Trazabilidad (ES)
                          </label>
                          <textarea
                            rows={2}
                            value={editingRecord.es.observation}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                es: {
                                  ...editingRecord.es,
                                  observation: e.target.value,
                                },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-xs"
                          />
                        </div>
                      </div>

                      {/* English Column */}
                      <div className="space-y-4 rounded-xl border border-[#D3E4E6] bg-[#F0F7F7]/40 p-4">
                        <h3 className="text-sm font-bold text-[#04444D] border-b border-[#D3E4E6] pb-2">
                          🇬🇧 Versión en Inglés (International B2B)
                        </h3>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Product Name (EN)
                          </label>
                          <input
                            type="text"
                            value={editingRecord.en.name ?? ""}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                en: { ...editingRecord.en, name: e.target.value },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Growing Region (EN)
                          </label>
                          <input
                            type="text"
                            value={editingRecord.en.region ?? ""}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                en: { ...editingRecord.en, region: e.target.value },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Short Summary (Catalog Card EN)
                          </label>
                          <textarea
                            rows={3}
                            value={editingRecord.en.shortDescription ?? ""}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                en: {
                                  ...editingRecord.en,
                                  shortDescription: e.target.value,
                                },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-xs leading-relaxed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Full Technical Sheet Description (EN)
                          </label>
                          <textarea
                            rows={4}
                            value={editingRecord.en.description ?? ""}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                en: {
                                  ...editingRecord.en,
                                  description: e.target.value,
                                },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-xs leading-relaxed"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Product Condition (EN)
                          </label>
                          <textarea
                            rows={2}
                            value={editingRecord.en.condition ?? ""}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                en: {
                                  ...editingRecord.en,
                                  condition: e.target.value,
                                },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold mb-1">
                            Remarks / Traceability (EN)
                          </label>
                          <textarea
                            rows={2}
                            value={editingRecord.en.observation ?? ""}
                            onChange={(e) =>
                              setEditingRecord({
                                ...editingRecord,
                                en: {
                                  ...editingRecord.en,
                                  observation: e.target.value,
                                },
                              })
                            }
                            className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUB-TAB 3: PROPIEDADES FÍSICAS Y PARÁMETROS LAB */}
                  {productSubTab === "parameters" && (
                    <div className="space-y-6">
                      {/* Physical Properties ES & EN */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-xl border border-[#D3E4E6] p-4 space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#04444D]">
                            🇪🇸 Características Físicas (ES)
                          </h4>
                          <div>
                            <label className="block text-xs font-medium mb-1">
                              Color
                            </label>
                            <input
                              type="text"
                              value={editingRecord.es.physical.color}
                              onChange={(e) =>
                                setEditingRecord({
                                  ...editingRecord,
                                  es: {
                                    ...editingRecord.es,
                                    physical: {
                                      ...editingRecord.es.physical,
                                      color: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-full rounded-lg border border-[#D3E4E6] px-3 py-1.5 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">
                              Olor y sabor
                            </label>
                            <input
                              type="text"
                              value={editingRecord.es.physical.smellTaste}
                              onChange={(e) =>
                                setEditingRecord({
                                  ...editingRecord,
                                  es: {
                                    ...editingRecord.es,
                                    physical: {
                                      ...editingRecord.es.physical,
                                      smellTaste: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-full rounded-lg border border-[#D3E4E6] px-3 py-1.5 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">
                              Apariencia
                            </label>
                            <input
                              type="text"
                              value={editingRecord.es.physical.appearance}
                              onChange={(e) =>
                                setEditingRecord({
                                  ...editingRecord,
                                  es: {
                                    ...editingRecord.es,
                                    physical: {
                                      ...editingRecord.es.physical,
                                      appearance: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-full rounded-lg border border-[#D3E4E6] px-3 py-1.5 text-xs"
                            />
                          </div>
                        </div>

                        <div className="rounded-xl border border-[#D3E4E6] p-4 space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#04444D]">
                            🇬🇧 Physical Characteristics (EN)
                          </h4>
                          <div>
                            <label className="block text-xs font-medium mb-1">
                              Color (EN)
                            </label>
                            <input
                              type="text"
                              value={editingRecord.en.physical?.color ?? ""}
                              onChange={(e) =>
                                setEditingRecord({
                                  ...editingRecord,
                                  en: {
                                    ...editingRecord.en,
                                    physical: {
                                      color: e.target.value,
                                      smellTaste:
                                        editingRecord.en.physical?.smellTaste ?? "",
                                      appearance:
                                        editingRecord.en.physical?.appearance ?? "",
                                    },
                                  },
                                })
                              }
                              className="w-full rounded-lg border border-[#D3E4E6] px-3 py-1.5 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">
                              Smell & Taste (EN)
                            </label>
                            <input
                              type="text"
                              value={editingRecord.en.physical?.smellTaste ?? ""}
                              onChange={(e) =>
                                setEditingRecord({
                                  ...editingRecord,
                                  en: {
                                    ...editingRecord.en,
                                    physical: {
                                      color: editingRecord.en.physical?.color ?? "",
                                      smellTaste: e.target.value,
                                      appearance:
                                        editingRecord.en.physical?.appearance ?? "",
                                    },
                                  },
                                })
                              }
                              className="w-full rounded-lg border border-[#D3E4E6] px-3 py-1.5 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1">
                              Appearance (EN)
                            </label>
                            <input
                              type="text"
                              value={editingRecord.en.physical?.appearance ?? ""}
                              onChange={(e) =>
                                setEditingRecord({
                                  ...editingRecord,
                                  en: {
                                    ...editingRecord.en,
                                    physical: {
                                      color: editingRecord.en.physical?.color ?? "",
                                      smellTaste:
                                        editingRecord.en.physical?.smellTaste ?? "",
                                      appearance: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-full rounded-lg border border-[#D3E4E6] px-3 py-1.5 text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Table: Quality Parameters ES */}
                      <ParameterListEditor
                        title="🇪🇸 Tabla de Parámetros de Calidad (ES)"
                        items={editingRecord.es.qualityParameters}
                        onChange={(next) =>
                          setEditingRecord({
                            ...editingRecord,
                            es: { ...editingRecord.es, qualityParameters: next },
                          })
                        }
                      />

                      {/* Dynamic Table: Chemical Parameters ES */}
                      <ParameterListEditor
                        title="🇪🇸 Tabla de Parámetros Químicos y Microbiológicos (ES)"
                        items={editingRecord.es.chemicalParameters}
                        onChange={(next) =>
                          setEditingRecord({
                            ...editingRecord,
                            es: { ...editingRecord.es, chemicalParameters: next },
                          })
                        }
                      />
                    </div>
                  )}

                  {/* SUB-TAB 4: LOGÍSTICA, CALIBRES, ENVASES Y CERTIFICACIONES */}
                  {productSubTab === "logistics" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <TagArrayEditor
                        label="Variedades (ES) — separadas por coma"
                        values={editingRecord.es.varieties}
                        onChange={(vals) =>
                          setEditingRecord({
                            ...editingRecord,
                            es: { ...editingRecord.es, varieties: vals },
                          })
                        }
                      />
                      <TagArrayEditor
                        label="Varieties (EN) — comma separated"
                        values={editingRecord.en.varieties ?? []}
                        onChange={(vals) =>
                          setEditingRecord({
                            ...editingRecord,
                            en: { ...editingRecord.en, varieties: vals },
                          })
                        }
                      />

                      <TagArrayEditor
                        label="Calibres Disponibles (ES)"
                        values={editingRecord.es.calibers}
                        onChange={(vals) =>
                          setEditingRecord({
                            ...editingRecord,
                            es: { ...editingRecord.es, calibers: vals },
                          })
                        }
                      />
                      <TagArrayEditor
                        label="Available Sizes / Calibers (EN)"
                        values={editingRecord.en.calibers ?? []}
                        onChange={(vals) =>
                          setEditingRecord({
                            ...editingRecord,
                            en: { ...editingRecord.en, calibers: vals },
                          })
                        }
                      />

                      <TagArrayEditor
                        label="Presentación / Packaging (ES)"
                        values={editingRecord.es.packaging}
                        onChange={(vals) =>
                          setEditingRecord({
                            ...editingRecord,
                            es: { ...editingRecord.es, packaging: vals },
                          })
                        }
                      />
                      <TagArrayEditor
                        label="Packaging Options (EN)"
                        values={editingRecord.en.packaging ?? []}
                        onChange={(vals) =>
                          setEditingRecord({
                            ...editingRecord,
                            en: { ...editingRecord.en, packaging: vals },
                          })
                        }
                      />

                      <div>
                        <label className="block text-xs font-bold text-[#04444D] mb-1">
                          Temporada de Cosecha (ES)
                        </label>
                        <input
                          type="text"
                          value={editingRecord.es.harvestSeason}
                          onChange={(e) =>
                            setEditingRecord({
                              ...editingRecord,
                              es: {
                                ...editingRecord.es,
                                harvestSeason: e.target.value,
                              },
                            })
                          }
                          className="w-full rounded-lg border border-[#D3E4E6] px-3 py-2 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#04444D] mb-1">
                          Harvest Season (EN)
                        </label>
                        <input
                          type="text"
                          value={editingRecord.en.harvestSeason ?? ""}
                          onChange={(e) =>
                            setEditingRecord({
                              ...editingRecord,
                              en: {
                                ...editingRecord.en,
                                harvestSeason: e.target.value,
                              },
                            })
                          }
                          className="w-full rounded-lg border border-[#D3E4E6] px-3 py-2 text-xs"
                        />
                      </div>

                      <TagArrayEditor
                        label="Certificaciones (ES)"
                        values={editingRecord.es.certifications}
                        onChange={(vals) =>
                          setEditingRecord({
                            ...editingRecord,
                            es: { ...editingRecord.es, certifications: vals },
                          })
                        }
                      />
                      <TagArrayEditor
                        label="Certifications (EN)"
                        values={editingRecord.en.certifications ?? []}
                        onChange={(vals) =>
                          setEditingRecord({
                            ...editingRecord,
                            en: { ...editingRecord.en, certifications: vals },
                          })
                        }
                      />

                      <TagArrayEditor
                        label="Incoterms (FOB, CIF, CFR...)"
                        values={editingRecord.es.incoterms}
                        onChange={(vals) =>
                          setEditingRecord({
                            ...editingRecord,
                            es: { ...editingRecord.es, incoterms: vals },
                            en: { ...editingRecord.en, incoterms: vals },
                          })
                        }
                      />

                      <TagArrayEditor
                        label="Aplicaciones / Usos Industriales (ES)"
                        values={editingRecord.es.uses}
                        onChange={(vals) =>
                          setEditingRecord({
                            ...editingRecord,
                            es: { ...editingRecord.es, uses: vals },
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: EDITOR DE TEXTOS DE SECCIONES DE LA WEB (ES / EN)
        =================================================================== */}
        {activeTab === "copy" && (
          <div className="rounded-2xl border border-[#D3E4E6] bg-white p-6 shadow-sm space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D3E4E6] pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#04444D]">
                  Textos de Secciones Web (Español e Inglés)
                </h2>
                <p className="text-xs text-[#3D6E75]">
                  Modifica titulares, descripciones y llamados a la acción de cada sección de la página principal.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveTranslations}
                className="inline-flex items-center gap-2 rounded-lg bg-[#04BA70] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[#039A5C]"
              >
                <Save className="h-4 w-4" />
                <span>Guardar Todos los Textos</span>
              </button>
            </div>

            {TRANSLATION_GROUPS.map((group) => (
              <div
                key={group.title}
                className="rounded-xl border border-[#D3E4E6] bg-[#F0F7F7]/40 p-5 space-y-4"
              >
                <h3 className="text-sm font-bold text-[#04444D] border-b border-[#D3E4E6] pb-2">
                  {group.title}
                </h3>
                <div className="space-y-4">
                  {group.keys.map(({ key, label }) => (
                    <div
                      key={key}
                      className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start"
                    >
                      <div className="md:col-span-3 pt-1">
                        <p className="text-xs font-bold text-[#04444D]">{label}</p>
                        <p className="font-mono text-[10px] text-[#3D6E75]">{key}</p>
                      </div>
                      <div className="md:col-span-4">
                        <label className="block text-[10px] font-semibold uppercase text-[#3D6E75] mb-1">
                          🇪🇸 Español
                        </label>
                        <textarea
                          rows={2}
                          value={translationsEs[key] ?? ""}
                          onChange={(e) =>
                            setTranslationsEs({
                              ...translationsEs,
                              [key]: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-1.5 text-xs"
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label className="block text-[10px] font-semibold uppercase text-[#3D6E75] mb-1">
                          🇬🇧 English
                        </label>
                        <textarea
                          rows={2}
                          value={translationsEn[key] ?? ""}
                          onChange={(e) =>
                            setTranslationsEn({
                              ...translationsEn,
                              [key]: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-1.5 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===================================================================
            TAB 3: DATOS COMERCIALES Y CONTACTO (WHATSAPP, EMAIL, EMPRESA)
        =================================================================== */}
        {activeTab === "company" && (
          <div className="max-w-3xl mx-auto rounded-2xl border border-[#D3E4E6] bg-white p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#D3E4E6] pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#04444D]">
                  Configuración Comercial y Contacto Directo
                </h2>
                <p className="text-xs text-[#3D6E75]">
                  Estos datos alimentan todos los botones de cotización por WhatsApp, Email y el pie de página.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveCompany}
                className="inline-flex items-center gap-2 rounded-lg bg-[#04BA70] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#039A5C]"
              >
                <Save className="h-4 w-4" />
                <span>Guardar Contacto</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#04444D] mb-1">
                  Nombre Oficial de la Marca
                </label>
                <input
                  type="text"
                  value={companyForm.companyName}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, companyName: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#D3E4E6] px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#04444D] mb-1">
                  Tagline Secundario
                </label>
                <input
                  type="text"
                  value={companyForm.tagline}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, tagline: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#D3E4E6] px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#04444D] mb-1">
                  Número WhatsApp (Solo dígitos con código país)
                </label>
                <input
                  type="text"
                  value={companyForm.whatsapp}
                  onChange={(e) =>
                    setCompanyForm({
                      ...companyForm,
                      whatsapp: e.target.value.replace(/[^0-9]/g, ""),
                    })
                  }
                  placeholder="59168938712"
                  className="w-full rounded-lg border border-[#D3E4E6] px-3 py-2 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#04444D] mb-1">
                  WhatsApp Visible en Pantalla
                </label>
                <input
                  type="text"
                  value={companyForm.whatsappDisplay}
                  onChange={(e) =>
                    setCompanyForm({
                      ...companyForm,
                      whatsappDisplay: e.target.value,
                    })
                  }
                  placeholder="+591 6893-8712"
                  className="w-full rounded-lg border border-[#D3E4E6] px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#04444D] mb-1">
                  Email Comercial de Exportaciones
                </label>
                <input
                  type="email"
                  value={companyForm.email}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#D3E4E6] px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#04444D] mb-1">
                  Sitio Web Oficial
                </label>
                <input
                  type="text"
                  value={companyForm.website}
                  onChange={(e) =>
                    setCompanyForm({ ...companyForm, website: e.target.value })
                  }
                  className="w-full rounded-lg border border-[#D3E4E6] px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: SUPABASE CLOUD & RESPALDOS JSON
        =================================================================== */}
        {activeTab === "supabase" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Supabase Connection Card */}
            <div className="rounded-2xl border border-[#D3E4E6] bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Database className="h-6 w-6 text-[#04BA70]" />
                  <div>
                    <h2 className="text-lg font-bold text-[#04444D]">
                      Integración Nativa con Supabase
                    </h2>
                    <p className="text-xs text-[#3D6E75]">
                      Adaptador PostgREST + Fallback Híbrido configurado en{" "}
                      <code className="font-mono">CmsService</code>
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      const res = await cmsFacade.pushAllToSupabase(adminToken);
                      showToast(
                        "success",
                        `Enviados ${res.pushedProducts} productos, textos y configuración a Supabase.`
                      );
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#04BA70] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#039A5C]"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Poblar 17 Productos en Supabase</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(SUPABASE_SQL_SNIPPET);
                      showToast("success", "Script SQL para Supabase copiado al portapapeles.");
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#04444D] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#065A66]"
                  >
                    <FileCode2 className="h-4 w-4 text-[#04BA70]" />
                    <span>Copiar SQL Supabase</span>
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-[#F0F7F7] p-4 text-xs space-y-1.5 border border-[#D3E4E6]">
                <p>
                  <strong>Estado actual:</strong>{" "}
                  {connectionStatus.mode === "supabase"
                    ? `Conectado a ${connectionStatus.supabaseUrl}`
                    : "Listo para conectar (Operando en Modo Híbrido Local + Static Export)"}
                </p>
                <p className="text-[#3D6E75]">
                  Para activar la sincronización automática en la nube, define{" "}
                  <code className="font-mono text-[#04444D]">NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
                  <code className="font-mono text-[#04444D]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
                  en tu archivo <code className="font-mono">.env.local</code> y ejecuta el siguiente esquema SQL en tu proyecto de Supabase:
                </p>
              </div>

              <pre className="max-h-72 overflow-y-auto rounded-xl bg-[#033038] p-4 text-[11px] font-mono text-emerald-300 leading-relaxed">
                {SUPABASE_SQL_SNIPPET}
              </pre>
            </div>

            {/* Backup Export / Import & Factory Reset */}
            <div className="rounded-2xl border border-[#D3E4E6] bg-white p-6 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-[#04444D]">
                  Exportación, Importación y Restauración
                </h2>
                <p className="text-xs text-[#3D6E75]">
                  Descarga una copia completa del catálogo y traducciones en JSON o restaura los datos de fábrica.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleDownloadBackup}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#04BA70] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#039A5C]"
                >
                  <Download className="h-4 w-4" />
                  <span>Descargar Backup JSON Completo</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetFactory}
                  className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-700 hover:bg-red-100"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Restaurar Catálogo Original (17 Productos)</span>
                </button>
              </div>

              <div className="border-t border-[#D3E4E6] pt-4 space-y-3">
                <label className="block text-xs font-bold text-[#04444D]">
                  Importar Respaldo JSON
                </label>
                <textarea
                  rows={6}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder='Pega aquí el contenido de un archivo JSON exportado desde el CMS...'
                  className="w-full rounded-lg border border-[#D3E4E6] bg-[#F0F7F7]/50 p-3 text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={handleImportBackup}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#04444D] px-4 py-2 text-xs font-semibold text-white hover:bg-[#065A66]"
                >
                  <Upload className="h-4 w-4 text-[#04BA70]" />
                  <span>Importar y Aplicar JSON</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Official Product Detail Modal for Live Preview */}
      <ProductDetailModal
        product={previewProduct}
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
      />
    </div>
  );
}

// ============================================================================
// HELPER SUB-COMPONENTS FOR TECHNICAL SHEET PARAMETERS & TAGS
// ============================================================================

function ParameterListEditor({
  title,
  items,
  onChange,
}: {
  title: string;
  items: QualityParam[];
  onChange: (next: QualityParam[]) => void;
}) {
  const handleUpdate = (idx: number, field: "label" | "value", val: string) => {
    const copy = items.map((item, i) =>
      i === idx ? { ...item, [field]: val } : item
    );
    onChange(copy);
  };

  const handleAdd = () => {
    onChange([...items, { label: "Nuevo parámetro", value: "Especificación" }]);
  };

  const handleRemove = (idx: number) => {
    onChange(items.filter((_, i) => i !== idx));
  };

  return (
    <div className="rounded-xl border border-[#D3E4E6] bg-[#F0F7F7]/40 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#04444D]">
          {title}
        </h4>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1 rounded-md bg-[#04444D] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#065A66]"
        >
          <Plus className="h-3 w-3 text-[#04BA70]" />
          <span>Añadir Parámetro</span>
        </button>
      </div>

      <div className="space-y-2">
        {items.map((param, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="text"
              value={param.label}
              onChange={(e) => handleUpdate(idx, "label", e.target.value)}
              placeholder="Parámetro (ej. Pureza)"
              className="flex-1 rounded-lg border border-[#D3E4E6] bg-white px-3 py-1.5 text-xs"
            />
            <input
              type="text"
              value={param.value}
              onChange={(e) => handleUpdate(idx, "value", e.target.value)}
              placeholder="Valor (ej. ≥ 99.5%)"
              className="flex-1 rounded-lg border border-[#D3E4E6] bg-white px-3 py-1.5 text-xs"
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="rounded p-1.5 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TagArrayEditor({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
}) {
  const [rawText, setRawText] = useState(values.join(", "));

  useEffect(() => {
    setRawText(values.join(", "));
  }, [values]);

  const handleBlur = () => {
    const parsed = rawText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onChange(parsed);
  };

  return (
    <div>
      <label className="block text-xs font-bold text-[#04444D] mb-1">
        {label}
      </label>
      <input
        type="text"
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
        onBlur={handleBlur}
        placeholder="Elemento 1, Elemento 2, Elemento 3"
        className="w-full rounded-lg border border-[#D3E4E6] bg-white px-3 py-2 text-xs"
      />
    </div>
  );
}
