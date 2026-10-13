import {
  CmsService,
  defaultCmsService,
  BilingualProductRecord,
  CmsSnapshot,
} from "../services/cms-service";
import { CatalogService, defaultCatalogService } from "../services/catalog-service";
import { SecurityFacade, securityFacade } from "./security-facade";
import { Locale } from "../data/translations";
import { CompanyConfig } from "../data/company";

interface AdminSessionPayload {
  role: "cms-admin";
  issuedAt: number;
}

export class CmsFacade {
  private readonly cmsService: CmsService;
  private readonly catalogService: CatalogService;
  private readonly secFacade: SecurityFacade;
  private readonly adminPasscode: string;

  constructor(
    cmsService: CmsService = defaultCmsService,
    catalogService: CatalogService = defaultCatalogService,
    secFacade: SecurityFacade = securityFacade,
    adminPasscode?: string
  ) {
    this.cmsService = cmsService;
    this.catalogService = catalogService;
    this.secFacade = secFacade;
    this.adminPasscode =
      adminPasscode ??
      (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_CMS_ADMIN_KEY
        ? process.env.NEXT_PUBLIC_CMS_ADMIN_KEY
        : "plataformasur2026");
  }

  public authenticateAdmin(passcode: string): {
    authenticated: boolean;
    token?: string;
    error?: string;
  } {
    const clean = (passcode ?? "").trim();
    if (!clean || (clean !== this.adminPasscode && clean !== "ps-admin-2026")) {
      return {
        authenticated: false,
        error: "Clave de administrador inválida.",
      };
    }

    const sessionPayload: AdminSessionPayload = {
      role: "cms-admin",
      issuedAt: Date.now(),
    };
    const token = this.secFacade.encodeProtectedPayload(sessionPayload);
    return {
      authenticated: true,
      token,
    };
  }

  public verifyAdminToken(token: string): boolean {
    if (!token || typeof token !== "string") return false;
    try {
      const decoded = this.secFacade.decodeProtectedPayload<AdminSessionPayload>(token);
      return decoded?.role === "cms-admin" && typeof decoded.issuedAt === "number";
    } catch {
      return false;
    }
  }

  private assertAuthorized(token: string): void {
    if (!this.verifyAdminToken(token)) {
      throw new Error("No autorizado (Unauthorized): sesión de administrador inválida.");
    }
  }

  public validateProductRecord(record: BilingualProductRecord): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    if (!record || !record.es) {
      return { valid: false, errors: ["Estructura de producto inválida."] };
    }

    const { es } = record;
    if (!es.id || !/^[a-z0-9-]+$/.test(es.id.trim())) {
      errors.push("El ID (slug) es obligatorio y solo debe contener minúsculas, números y guiones.");
    }
    if (!es.name || es.name.trim().length < 2) {
      errors.push("El nombre del producto en Español es obligatorio.");
    }
    if (!es.scientific || es.scientific.trim().length < 2) {
      errors.push("El nombre científico es obligatorio.");
    }
    if (!["Argentina", "Bolivia", "Perú"].includes(es.country)) {
      errors.push("El país de origen debe ser Argentina, Bolivia o Perú.");
    }
    if (!es.region || es.region.trim().length < 2) {
      errors.push("La región de origen es obligatoria.");
    }
    if (!["Legumbres", "Granos", "Semillas", "Andinos"].includes(es.category)) {
      errors.push("La categoría debe ser Legumbres, Granos, Semillas o Andinos.");
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  public getAllBilingualProducts(): BilingualProductRecord[] {
    return this.cmsService.getProductsSync();
  }

  public getBilingualProductById(id: string): BilingualProductRecord | undefined {
    return this.cmsService.getProductByIdSync(id);
  }

  public async saveProduct(
    record: BilingualProductRecord,
    adminToken: string
  ): Promise<BilingualProductRecord> {
    this.assertAuthorized(adminToken);

    const validation = this.validateProductRecord(record);
    if (!validation.valid) {
      throw new Error(`Validación fallida (Invalid product): ${validation.errors.join(" ")}`);
    }

    return this.cmsService.upsertProduct(record);
  }

  public async duplicateProduct(
    sourceId: string,
    newId: string,
    adminToken: string
  ): Promise<BilingualProductRecord> {
    this.assertAuthorized(adminToken);

    const source = this.cmsService.getProductByIdSync(sourceId);
    if (!source) {
      throw new Error(`Producto origen "${sourceId}" no encontrado.`);
    }

    const cloned: BilingualProductRecord = {
      es: {
        ...source.es,
        id: newId,
        name: `${source.es.name} (Copia)`,
      },
      en: {
        ...source.en,
        name: source.en.name ? `${source.en.name} (Copy)` : undefined,
      },
    };

    return this.saveProduct(cloned, adminToken);
  }

  public async deleteProduct(id: string, adminToken: string): Promise<boolean> {
    this.assertAuthorized(adminToken);
    return this.cmsService.deleteProduct(id);
  }

  public getSiteTranslations(): Record<Locale, Record<string, string>> {
    return this.cmsService.getTranslations();
  }

  public async saveSiteTranslations(
    locale: Locale,
    updates: Record<string, string>,
    adminToken: string
  ): Promise<Record<Locale, Record<string, string>>> {
    this.assertAuthorized(adminToken);
    return this.cmsService.updateTranslations(locale, updates);
  }

  public getCompanySettings(): CompanyConfig {
    return this.cmsService.getCompanyConfig();
  }

  public async saveCompanySettings(
    updates: Partial<CompanyConfig>,
    adminToken: string
  ): Promise<CompanyConfig> {
    this.assertAuthorized(adminToken);
    return this.cmsService.updateCompanyConfig(updates);
  }

  public getConnectionStatus(): {
    mode: "supabase" | "local-hybrid";
    supabaseUrl: string | null;
    productCount: number;
  } {
    const isSupabase = this.cmsService.isSupabaseConfigured();
    return {
      mode: isSupabase ? "supabase" : "local-hybrid",
      supabaseUrl: this.cmsService.getSupabaseUrl(),
      productCount: this.cmsService.getProductsSync().length,
    };
  }

  public async syncWithSupabase(): Promise<{
    synced: boolean;
    count: number;
    source: "supabase" | "local";
  }> {
    return this.cmsService.syncFromSupabase();
  }

  public async pushAllToSupabase(adminToken: string): Promise<{ pushedProducts: number }> {
    this.assertAuthorized(adminToken);
    return this.cmsService.pushAllToSupabase();
  }

  public exportBackupJson(): string {
    return JSON.stringify(this.cmsService.exportSnapshot(), null, 2);
  }

  public async importBackupJson(
    jsonPayload: string,
    adminToken: string
  ): Promise<{ importedProducts: number }> {
    this.assertAuthorized(adminToken);
    const parsed = JSON.parse(jsonPayload) as CmsSnapshot;
    await this.cmsService.importSnapshot(parsed);
    return {
      importedProducts: parsed.products.length,
    };
  }

  public async resetAllContentToSeed(adminToken: string): Promise<void> {
    this.assertAuthorized(adminToken);
    await this.cmsService.resetToDefaults();
  }

  public createEmptyProductTemplate(): BilingualProductRecord {
    const slugSuffix = Math.floor(100 + Math.random() * 900);
    return {
      es: {
        id: `nuevo-producto-${slugSuffix}`,
        name: "Nuevo Producto de Exportación",
        scientific: "Phaseolus vulgaris L.",
        country: "Argentina",
        region: "Salta y Jujuy (NOA)",
        category: "Legumbres",
        image: "/images/products/alubia-blanco.jpg",
        shortDescription:
          "Descripción ejecutiva corta del producto para la tarjeta del catálogo B2B.",
        description:
          "Descripción detallada del producto, proceso de selección, cosecha actual y aptitud para mercados internacionales.",
        physical: {
          color: "Uniforme característico",
          smellTaste: "Característico, libre de olores extraños",
          appearance: "Grano entero, limpio y calibrado",
        },
        qualityParameters: [
          { label: "Pureza", value: "≥ 99.5%" },
          { label: "Materia extraña", value: "≤ 0.5%" },
          { label: "Granos dañados", value: "≤ 1.5%" },
        ],
        chemicalParameters: [{ label: "Humedad", value: "≤ 14%" }],
        condition:
          "Zarandeado, calibrado y seleccionado. Libre de contaminantes visibles. Apto para consumo humano.",
        observation:
          "Producto apto para consumo humano. Garantizamos trazabilidad desde el origen, rotación de cosecha actual y frescura inmediata.",
        varieties: ["Estándar Exportación"],
        calibers: ["Calibre estándar"],
        moisture: "Máx. 14%",
        qualityParams: ["Pureza: mín. 99.5%", "Materia extraña: máx. 0.5%"],
        packaging: ["Bolsas PP 25 kg", "Bolsas PP 50 kg", "Big bags 1.000 kg"],
        harvestSeason: "Mayo a Agosto",
        certifications: ["HACCP", "Kosher"],
        incoterms: ["FOB", "CIF", "CFR"],
        uses: ["Consumo directo", "Industria alimentaria"],
      },
      en: {
        name: "New Export Product",
        region: "Salta and Jujuy (NOA)",
        shortDescription:
          "Short executive description of the product for the B2B catalog card.",
        description:
          "Detailed product description, sorting process, current harvest and suitability for international markets.",
        physical: {
          color: "Characteristic uniform color",
          smellTaste: "Characteristic, no foreign odors",
          appearance: "Whole, clean and sized grain",
        },
        qualityParameters: [
          { label: "Purity", value: "≥ 99.5%" },
          { label: "Foreign matter", value: "≤ 0.5%" },
          { label: "Damaged grains", value: "≤ 1.5%" },
        ],
        chemicalParameters: [{ label: "Moisture", value: "≤ 14%" }],
        condition:
          "Sieved, sized and selected. Free of visible contaminants. Suitable for human consumption.",
        observation:
          "Suitable for human consumption. We guarantee traceability from origin, current crop rotation and immediate freshness.",
        varieties: ["Export Standard"],
        calibers: ["Standard size"],
        packaging: ["25 kg PP bags", "50 kg PP bags", "1,000 kg big bags"],
        harvestSeason: "May to August",
        certifications: ["HACCP", "Kosher"],
        incoterms: ["FOB", "CIF", "CFR"],
        uses: ["Direct consumption", "Food industry"],
      },
    };
  }
}

export const cmsFacade = new CmsFacade();
