import { products as seedProducts, Product } from "../data/products";
import { productsEn as seedProductsEn } from "../data/productsEn";
import { translations as seedTranslations, Locale } from "../data/translations";
import { companyConfig as seedCompanyConfig, CompanyConfig } from "../data/company";

export interface BilingualProductRecord {
  es: Product;
  en: Partial<Product>;
  updatedAt?: string;
}

export interface CmsSnapshot {
  version: string;
  exportedAt: string;
  products: BilingualProductRecord[];
  translations: Record<Locale, Record<string, string>>;
  company: CompanyConfig;
}

export interface SupabaseRestAdapter {
  isConfigured(): boolean;
  getSupabaseUrl(): string | null;
  fetchProducts(): Promise<BilingualProductRecord[] | null>;
  upsertProductRow(record: BilingualProductRecord): Promise<BilingualProductRecord>;
  deleteProductRow(id: string): Promise<boolean>;
  fetchTranslations(): Promise<Record<Locale, Record<string, string>> | null>;
  upsertTranslations(translations: Record<Locale, Record<string, string>>): Promise<boolean>;
  fetchCompanyConfig(): Promise<CompanyConfig | null>;
  upsertCompanyConfig(company: CompanyConfig): Promise<boolean>;
}

const LOCAL_STORAGE_KEY = "ps_cms_snapshot_v1";
export const CMS_UPDATE_EVENT = "ps-cms-updated";

export const FIREBASE_CMS_CONFIG = {
  projectId: "plataformasur-e9507",
  apiKey: "AIzaSyCNCeuE6zs5LAZwQZQH5ATad__E4wQnaHM",
  baseUrl:
    "https://firestore.googleapis.com/v1/projects/plataformasur-e9507/databases/(default)/documents",
};

function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function buildInitialSeedRecords(): BilingualProductRecord[] {
  return seedProducts.map((p) => ({
    es: cloneDeep(p),
    en: cloneDeep(seedProductsEn[p.id] ?? {}),
    updatedAt: "2026-10-12T00:00:00.000Z",
  }));
}

/**
 * Multi-Cloud Adapter:
 * - Connects automatically to Firebase Cloud Firestore (`plataformasur-e9507`) out of the box (including on Vercel)
 * - Or to Supabase PostgREST if NEXT_PUBLIC_SUPABASE_ANON_KEY is configured.
 */
export class FetchSupabaseRestAdapter implements SupabaseRestAdapter {
  private readonly supabaseUrl: string | null;
  private readonly supabaseKey: string | null;
  private readonly useFirebase: boolean;

  constructor(supabaseUrl?: string, supabaseKey?: string) {
    this.supabaseUrl =
      supabaseUrl ??
      (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SUPABASE_URL
        ? process.env.NEXT_PUBLIC_SUPABASE_URL
        : null);
    this.supabaseKey =
      supabaseKey ??
      (typeof process !== "undefined"
        ? process.env?.SUPABASE_SERVICE_ROLE_KEY ??
          process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
          null
        : null);
    this.useFirebase = !(this.supabaseUrl && this.supabaseKey);
  }

  public isConfigured(): boolean {
    return true;
  }

  public getSupabaseUrl(): string | null {
    if (!this.useFirebase && this.supabaseUrl) {
      return this.supabaseUrl;
    }
    return `firebase://firestore/${FIREBASE_CMS_CONFIG.projectId}`;
  }

  private getHeaders(preferReturn = false): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      apikey: this.supabaseKey ?? "",
      Authorization: `Bearer ${this.supabaseKey ?? ""}`,
    };
    if (preferReturn) {
      headers["Prefer"] = "resolution=merge-duplicates,return=representation";
    }
    return headers;
  }

  public async fetchProducts(): Promise<BilingualProductRecord[] | null> {
    if (this.useFirebase) {
      try {
        const res = await fetch(
          `${FIREBASE_CMS_CONFIG.baseUrl}/cms_products?pageSize=100&key=${FIREBASE_CMS_CONFIG.apiKey}`,
          { cache: "no-store" }
        );
        if (!res.ok) return null;
        const data = (await res.json()) as {
          documents?: Array<{
            fields?: {
              es_payload?: { stringValue?: string };
              en_payload?: { stringValue?: string };
              updated_at?: { stringValue?: string };
            };
          }>;
        };
        if (!Array.isArray(data.documents) || data.documents.length === 0) {
          return null;
        }
        return data.documents
          .map((doc): BilingualProductRecord | null => {
            const esRaw = doc.fields?.es_payload?.stringValue;
            const enRaw = doc.fields?.en_payload?.stringValue;
            if (!esRaw) return null;
            return {
              es: JSON.parse(esRaw) as Product,
              en: enRaw ? (JSON.parse(enRaw) as Partial<Product>) : {},
              updatedAt: doc.fields?.updated_at?.stringValue,
            };
          })
          .filter((x): x is BilingualProductRecord => x !== null);
      } catch {
        return null;
      }
    }

    try {
      const res = await fetch(
        `${this.supabaseUrl}/rest/v1/cms_products?select=id,es_payload,en_payload,updated_at&order=sort_order.asc`,
        { headers: this.getHeaders() }
      );
      if (!res.ok) return null;
      const rows = (await res.json()) as Array<{
        id: string;
        es_payload: Product;
        en_payload: Partial<Product>;
        updated_at?: string;
      }>;
      if (!Array.isArray(rows) || rows.length === 0) return null;
      return rows.map((r) => ({
        es: r.es_payload,
        en: r.en_payload ?? {},
        updatedAt: r.updated_at,
      }));
    } catch {
      return null;
    }
  }

  public async upsertProductRow(
    record: BilingualProductRecord
  ): Promise<BilingualProductRecord> {
    if (this.useFirebase) {
      try {
        const docId = encodeURIComponent(record.es.id);
        await fetch(
          `${FIREBASE_CMS_CONFIG.baseUrl}/cms_products/${docId}?key=${FIREBASE_CMS_CONFIG.apiKey}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fields: {
                id: { stringValue: record.es.id },
                country: { stringValue: record.es.country },
                category: { stringValue: record.es.category },
                es_payload: { stringValue: JSON.stringify(record.es) },
                en_payload: { stringValue: JSON.stringify(record.en ?? {}) },
                updated_at: {
                  stringValue: record.updatedAt ?? new Date().toISOString(),
                },
              },
            }),
          }
        );
      } catch {
        // Fallback gracefully to local store
      }
      return record;
    }

    try {
      await fetch(`${this.supabaseUrl}/rest/v1/cms_products`, {
        method: "POST",
        headers: this.getHeaders(true),
        body: JSON.stringify({
          id: record.es.id,
          country: record.es.country,
          category: record.es.category,
          es_payload: record.es,
          en_payload: record.en,
          updated_at: record.updatedAt ?? new Date().toISOString(),
        }),
      });
    } catch {
      // Fallback gracefully to local store
    }
    return record;
  }

  public async deleteProductRow(id: string): Promise<boolean> {
    if (this.useFirebase) {
      try {
        const docId = encodeURIComponent(id);
        const res = await fetch(
          `${FIREBASE_CMS_CONFIG.baseUrl}/cms_products/${docId}?key=${FIREBASE_CMS_CONFIG.apiKey}`,
          { method: "DELETE" }
        );
        return res.ok;
      } catch {
        return false;
      }
    }

    try {
      const res = await fetch(
        `${this.supabaseUrl}/rest/v1/cms_products?id=eq.${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: this.getHeaders(),
        }
      );
      return res.ok;
    } catch {
      return false;
    }
  }

  public async fetchTranslations(): Promise<Record<Locale, Record<string, string>> | null> {
    if (this.useFirebase) {
      try {
        const res = await fetch(
          `${FIREBASE_CMS_CONFIG.baseUrl}/cms_translations?key=${FIREBASE_CMS_CONFIG.apiKey}`,
          { cache: "no-store" }
        );
        if (!res.ok) return null;
        const data = (await res.json()) as {
          documents?: Array<{
            fields?: {
              locale?: { stringValue?: string };
              dictionary?: { stringValue?: string };
            };
          }>;
        };
        if (!Array.isArray(data.documents) || data.documents.length === 0) {
          return null;
        }
        const result: Record<Locale, Record<string, string>> = cloneDeep(seedTranslations);
        for (const doc of data.documents) {
          const loc = doc.fields?.locale?.stringValue as Locale | undefined;
          const dictRaw = doc.fields?.dictionary?.stringValue;
          if ((loc === "ES" || loc === "EN") && dictRaw) {
            result[loc] = { ...result[loc], ...JSON.parse(dictRaw) };
          }
        }
        return result;
      } catch {
        return null;
      }
    }

    try {
      const res = await fetch(
        `${this.supabaseUrl}/rest/v1/cms_translations?select=locale,dictionary`,
        { headers: this.getHeaders() }
      );
      if (!res.ok) return null;
      const rows = (await res.json()) as Array<{
        locale: Locale;
        dictionary: Record<string, string>;
      }>;
      if (!Array.isArray(rows) || rows.length === 0) return null;
      const result: Record<Locale, Record<string, string>> = cloneDeep(seedTranslations);
      for (const row of rows) {
        if (row.locale === "ES" || row.locale === "EN") {
          result[row.locale] = { ...result[row.locale], ...row.dictionary };
        }
      }
      return result;
    } catch {
      return null;
    }
  }

  public async upsertTranslations(
    translations: Record<Locale, Record<string, string>>
  ): Promise<boolean> {
    if (this.useFirebase) {
      try {
        const now = new Date().toISOString();
        for (const locale of ["ES", "EN"] as const) {
          await fetch(
            `${FIREBASE_CMS_CONFIG.baseUrl}/cms_translations/${locale}?key=${FIREBASE_CMS_CONFIG.apiKey}`,
            {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                fields: {
                  locale: { stringValue: locale },
                  dictionary: { stringValue: JSON.stringify(translations[locale]) },
                  updated_at: { stringValue: now },
                },
              }),
            }
          );
        }
        return true;
      } catch {
        return false;
      }
    }

    try {
      const payload = [
        { locale: "ES", dictionary: translations.ES, updated_at: new Date().toISOString() },
        { locale: "EN", dictionary: translations.EN, updated_at: new Date().toISOString() },
      ];
      const res = await fetch(`${this.supabaseUrl}/rest/v1/cms_translations`, {
        method: "POST",
        headers: this.getHeaders(true),
        body: JSON.stringify(payload),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  public async fetchCompanyConfig(): Promise<CompanyConfig | null> {
    if (this.useFirebase) {
      try {
        const res = await fetch(
          `${FIREBASE_CMS_CONFIG.baseUrl}/cms_company_config/default?key=${FIREBASE_CMS_CONFIG.apiKey}`,
          { cache: "no-store" }
        );
        if (!res.ok) return null;
        const doc = (await res.json()) as {
          fields?: {
            config_payload?: { stringValue?: string };
          };
        };
        const raw = doc.fields?.config_payload?.stringValue;
        return raw ? (JSON.parse(raw) as CompanyConfig) : null;
      } catch {
        return null;
      }
    }

    try {
      const res = await fetch(
        `${this.supabaseUrl}/rest/v1/cms_company_config?select=config_payload&id=eq.default`,
        { headers: this.getHeaders() }
      );
      if (!res.ok) return null;
      const rows = (await res.json()) as Array<{ config_payload: CompanyConfig }>;
      if (!Array.isArray(rows) || rows.length === 0) return null;
      return rows[0].config_payload;
    } catch {
      return null;
    }
  }

  public async upsertCompanyConfig(company: CompanyConfig): Promise<boolean> {
    if (this.useFirebase) {
      try {
        const res = await fetch(
          `${FIREBASE_CMS_CONFIG.baseUrl}/cms_company_config/default?key=${FIREBASE_CMS_CONFIG.apiKey}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fields: {
                id: { stringValue: "default" },
                config_payload: { stringValue: JSON.stringify(company) },
                updated_at: { stringValue: new Date().toISOString() },
              },
            }),
          }
        );
        return res.ok;
      } catch {
        return false;
      }
    }

    try {
      const res = await fetch(`${this.supabaseUrl}/rest/v1/cms_company_config`, {
        method: "POST",
        headers: this.getHeaders(true),
        body: JSON.stringify({
          id: "default",
          config_payload: company,
          updated_at: new Date().toISOString(),
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}

export class CmsService {
  private readonly supabaseAdapter: SupabaseRestAdapter;
  private productRecords: BilingualProductRecord[];
  private translationsStore: Record<Locale, Record<string, string>>;
  private companyStore: CompanyConfig;
  private hydratedFromStorage = false;

  constructor(supabaseAdapter: SupabaseRestAdapter = new FetchSupabaseRestAdapter()) {
    this.supabaseAdapter = supabaseAdapter;
    this.productRecords = buildInitialSeedRecords();
    this.translationsStore = cloneDeep(seedTranslations);
    this.companyStore = cloneDeep(seedCompanyConfig);
    this.hydrateFromLocalIfAvailable();
  }

  private hydrateFromLocalIfAvailable(): void {
    if (this.hydratedFromStorage) return;
    if (typeof window === "undefined" || typeof window.localStorage === "undefined") {
      return;
    }
    try {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const snapshot = JSON.parse(raw) as CmsSnapshot;
        if (Array.isArray(snapshot.products) && snapshot.products.length > 0) {
          this.productRecords = snapshot.products;
        }
        if (snapshot.translations?.ES && snapshot.translations?.EN) {
          this.translationsStore = {
            ES: { ...seedTranslations.ES, ...snapshot.translations.ES },
            EN: { ...seedTranslations.EN, ...snapshot.translations.EN },
          };
        }
        if (snapshot.company?.companyName) {
          this.companyStore = { ...seedCompanyConfig, ...snapshot.company };
        }
      }
      this.hydratedFromStorage = true;
    } catch {
      // Ignore corrupted local storage
    }
  }

  private persistToLocalAndNotify(): void {
    if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
      try {
        const snapshot = this.exportSnapshot();
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(snapshot));
        window.dispatchEvent(new CustomEvent(CMS_UPDATE_EVENT));
      } catch {
        // Ignore quota errors
      }
    }
  }

  public isSupabaseConfigured(): boolean {
    return this.supabaseAdapter.isConfigured();
  }

  public getSupabaseUrl(): string | null {
    return this.supabaseAdapter.getSupabaseUrl();
  }

  public getProductsSync(): BilingualProductRecord[] {
    this.hydrateFromLocalIfAvailable();
    return cloneDeep(this.productRecords);
  }

  public getProductByIdSync(id: string): BilingualProductRecord | undefined {
    this.hydrateFromLocalIfAvailable();
    const found = this.productRecords.find((r) => r.es.id === id);
    return found ? cloneDeep(found) : undefined;
  }

  public async upsertProduct(
    record: BilingualProductRecord
  ): Promise<BilingualProductRecord> {
    this.hydrateFromLocalIfAvailable();
    const timestamped: BilingualProductRecord = {
      es: cloneDeep(record.es),
      en: cloneDeep(record.en ?? {}),
      updatedAt: new Date().toISOString(),
    };

    const idx = this.productRecords.findIndex((r) => r.es.id === timestamped.es.id);
    if (idx >= 0) {
      this.productRecords[idx] = timestamped;
    } else {
      this.productRecords.push(timestamped);
    }

    await this.supabaseAdapter.upsertProductRow(timestamped);
    this.persistToLocalAndNotify();
    return cloneDeep(timestamped);
  }

  public async deleteProduct(id: string): Promise<boolean> {
    this.hydrateFromLocalIfAvailable();
    const initialLength = this.productRecords.length;
    this.productRecords = this.productRecords.filter((r) => r.es.id !== id);
    const removed = this.productRecords.length < initialLength;

    if (removed) {
      await this.supabaseAdapter.deleteProductRow(id);
      this.persistToLocalAndNotify();
    }
    return removed;
  }

  public getTranslations(): Record<Locale, Record<string, string>> {
    this.hydrateFromLocalIfAvailable();
    return cloneDeep(this.translationsStore);
  }

  public async updateTranslations(
    locale: Locale,
    updates: Record<string, string>
  ): Promise<Record<Locale, Record<string, string>>> {
    this.hydrateFromLocalIfAvailable();
    this.translationsStore[locale] = {
      ...this.translationsStore[locale],
      ...updates,
    };
    await this.supabaseAdapter.upsertTranslations(this.translationsStore);
    this.persistToLocalAndNotify();
    return cloneDeep(this.translationsStore);
  }

  public getCompanyConfig(): CompanyConfig {
    this.hydrateFromLocalIfAvailable();
    return cloneDeep(this.companyStore);
  }

  public async updateCompanyConfig(
    updates: Partial<CompanyConfig>
  ): Promise<CompanyConfig> {
    this.hydrateFromLocalIfAvailable();
    this.companyStore = {
      ...this.companyStore,
      ...updates,
    };
    await this.supabaseAdapter.upsertCompanyConfig(this.companyStore);
    this.persistToLocalAndNotify();
    return cloneDeep(this.companyStore);
  }

  public exportSnapshot(): CmsSnapshot {
    this.hydrateFromLocalIfAvailable();
    return {
      version: "1.0.0",
      exportedAt: new Date().toISOString(),
      products: cloneDeep(this.productRecords),
      translations: cloneDeep(this.translationsStore),
      company: cloneDeep(this.companyStore),
    };
  }

  public async importSnapshot(snapshot: CmsSnapshot): Promise<void> {
    if (!Array.isArray(snapshot.products) || snapshot.products.length === 0) {
      throw new Error("Invalid CMS snapshot: products array is empty or missing.");
    }
    this.productRecords = cloneDeep(snapshot.products);
    if (snapshot.translations?.ES && snapshot.translations?.EN) {
      this.translationsStore = cloneDeep(snapshot.translations);
      await this.supabaseAdapter.upsertTranslations(this.translationsStore);
    }
    if (snapshot.company?.companyName) {
      this.companyStore = cloneDeep(snapshot.company);
      await this.supabaseAdapter.upsertCompanyConfig(this.companyStore);
    }
    for (const prod of this.productRecords) {
      await this.supabaseAdapter.upsertProductRow(prod);
    }
    this.persistToLocalAndNotify();
  }

  public async resetToDefaults(): Promise<void> {
    this.productRecords = buildInitialSeedRecords();
    this.translationsStore = cloneDeep(seedTranslations);
    this.companyStore = cloneDeep(seedCompanyConfig);
    if (typeof window !== "undefined" && typeof window.localStorage !== "undefined") {
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent(CMS_UPDATE_EVENT));
    }
    await this.pushAllToSupabase();
  }

  public async syncFromSupabase(): Promise<{
    synced: boolean;
    count: number;
    source: "supabase" | "local";
  }> {
    if (!this.supabaseAdapter.isConfigured()) {
      return {
        synced: false,
        count: this.productRecords.length,
        source: "local",
      };
    }

    const remoteProducts = await this.supabaseAdapter.fetchProducts();
    const remoteTranslations = await this.supabaseAdapter.fetchTranslations();
    const remoteCompany = await this.supabaseAdapter.fetchCompanyConfig();

    if (remoteProducts && remoteProducts.length > 0) {
      this.productRecords = remoteProducts;
    }
    if (remoteTranslations) {
      this.translationsStore = remoteTranslations;
    }
    if (remoteCompany) {
      this.companyStore = remoteCompany;
    }
    this.persistToLocalAndNotify();
    return {
      synced: true,
      count: this.productRecords.length,
      source: "supabase",
    };
  }

  public async pushAllToSupabase(): Promise<{ pushedProducts: number }> {
    this.hydrateFromLocalIfAvailable();
    for (const prod of this.productRecords) {
      await this.supabaseAdapter.upsertProductRow(prod);
    }
    await this.supabaseAdapter.upsertTranslations(this.translationsStore);
    await this.supabaseAdapter.upsertCompanyConfig(this.companyStore);
    return { pushedProducts: this.productRecords.length };
  }
}

export const defaultCmsService = new CmsService();
