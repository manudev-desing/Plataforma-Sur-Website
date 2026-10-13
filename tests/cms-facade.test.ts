import { describe, expect, it, beforeEach, mock } from "bun:test";
import { CmsFacade } from "../src/facades/cms-facade";
import {
  CmsService,
  SupabaseRestAdapter,
  BilingualProductRecord,
} from "../src/services/cms-service";
import { CatalogService } from "../src/services/catalog-service";
import { CatalogFacade } from "../src/facades/catalog-facade";
import { SecurityFacade } from "../src/facades/security-facade";
import { SecurityService } from "../src/services/security-service";

describe("CmsFacade & Supabase-Ready CMS Service (Strict Mocking TDD Suite)", () => {
  let mockSupabaseAdapter: SupabaseRestAdapter;
  let cmsService: CmsService;
  let catalogService: CatalogService;
  let securityFacade: SecurityFacade;
  let cmsFacade: CmsFacade;
  let catalogFacade: CatalogFacade;
  let validAdminToken: string;

  beforeEach(() => {
    // 100% Mocked Supabase Adapter (Zero-DB Rule)
    mockSupabaseAdapter = {
      isConfigured: mock(() => true),
      getSupabaseUrl: mock(() => "https://mock-project.supabase.co"),
      fetchProducts: mock(async () => []),
      upsertProductRow: mock(async (record: BilingualProductRecord) => record),
      deleteProductRow: mock(async (_id: string) => true),
      fetchTranslations: mock(async () => null),
      upsertTranslations: mock(async () => true),
      fetchCompanyConfig: mock(async () => null),
      upsertCompanyConfig: mock(async () => true),
    };

    securityFacade = new SecurityFacade(
      new SecurityService({
        secretSalt: "test-cms-salt-2026",
      })
    );

    cmsService = new CmsService(mockSupabaseAdapter);
    catalogService = new CatalogService(cmsService);
    cmsFacade = new CmsFacade(cmsService, catalogService, securityFacade, "ps-admin-2026");
    catalogFacade = new CatalogFacade(catalogService, securityFacade);

    const auth = cmsFacade.authenticateAdmin("ps-admin-2026");
    expect(auth.authenticated).toBe(true);
    validAdminToken = auth.token!;
  });

  describe("1. Admin Authentication & Session Token Guard", () => {
    it("should reject invalid admin passcodes and block unauthenticated mutations", async () => {
      const badAuth = cmsFacade.authenticateAdmin("wrong-password");
      expect(badAuth.authenticated).toBe(false);
      expect(badAuth.token).toBeUndefined();

      expect(cmsFacade.verifyAdminToken("invalid-token")).toBe(false);

      await expect(
        cmsFacade.deleteProduct("alubia-blanco-ar", "invalid-token")
      ).rejects.toThrow(/No autorizado|Unauthorized/i);
    });

    it("should issue a verifiable signed token on valid admin passcode", () => {
      expect(cmsFacade.verifyAdminToken(validAdminToken)).toBe(true);
    });
  });

  describe("2. Bilingual Product & Technical Sheet CRUD (with Mocked Supabase Sync)", () => {
    it("should list all 17 initial bilingual products with ES and EN technical sheets", () => {
      const all = cmsFacade.getAllBilingualProducts();
      expect(all.length).toBe(17);

      const alubia = cmsFacade.getBilingualProductById("alubia-blanco-ar");
      expect(alubia).toBeDefined();
      expect(alubia?.es.name).toBe("Frijol Alubia Blanco");
      expect(alubia?.en.name).toBe("White Alubia Bean");
    });

    it("should create a new bilingual product, call mocked Supabase upsert, and reflect in CatalogFacade", async () => {
      const newProduct: BilingualProductRecord = {
        es: {
          id: "garbanzo-kabuli-ar",
          name: "Garbanzo Kabuli",
          scientific: "Cicer arietinum L.",
          country: "Argentina",
          region: "Córdoba y Salta",
          category: "Legumbres",
          image: "/images/products/alubia-blanco.jpg",
          shortDescription: "Garbanzo Kabuli calibre 8-9mm de exportación.",
          description: "Garbanzo Kabuli argentino seleccionado electrónicamente.",
          physical: {
            color: "Crema beige uniforme",
            smellTaste: "Característico, libre de olores extraños",
            appearance: "Grano entero rugoso",
          },
          qualityParameters: [
            { label: "Pureza", value: "≥ 99.5%" },
            { label: "Materia extraña", value: "≤ 0.5%" },
          ],
          chemicalParameters: [{ label: "Humedad", value: "≤ 14%" }],
          condition: "Zarandeado y calibrado electrónicamente.",
          observation: "Trazabilidad garantizada de origen.",
          varieties: ["Kabuli Norteño"],
          calibers: ["7 mm", "8 mm", "9 mm"],
          moisture: "Máx. 14%",
          qualityParams: ["Pureza: 99.5%"],
          packaging: ["Bolsas PP 25 kg", "Big bags 1.000 kg"],
          harvestSeason: "Noviembre a Enero",
          certifications: ["HACCP", "Kosher"],
          incoterms: ["FOB", "CIF", "CFR"],
          uses: ["Hummus", "Conservas", "Harinas"],
        },
        en: {
          name: "Kabuli Chickpea",
          region: "Cordoba and Salta",
          shortDescription: "Export-grade 8-9mm Kabuli chickpea.",
          description: "Electronically sorted Argentine Kabuli chickpea.",
          physical: {
            color: "Uniform cream beige",
            smellTaste: "Characteristic, no foreign odors",
            appearance: "Whole ridged grain",
          },
          qualityParameters: [
            { label: "Purity", value: "≥ 99.5%" },
            { label: "Foreign matter", value: "≤ 0.5%" },
          ],
          chemicalParameters: [{ label: "Moisture", value: "≤ 14%" }],
          condition: "Electronically sieved and sized.",
          observation: "Guaranteed origin traceability.",
          varieties: ["Northern Kabuli"],
          calibers: ["7 mm", "8 mm", "9 mm"],
          packaging: ["25 kg PP bags", "1,000 kg big bags"],
          harvestSeason: "November to January",
          certifications: ["HACCP", "Kosher"],
          uses: ["Hummus", "Canning", "Flours"],
        },
      };

      const saved = await cmsFacade.saveProduct(newProduct, validAdminToken);
      expect(saved.es.id).toBe("garbanzo-kabuli-ar");
      expect(mockSupabaseAdapter.upsertProductRow).toHaveBeenCalledTimes(1);

      // Verify CatalogFacade immediately serves the new product in both ES and EN
      const arProductsEs = catalogFacade.getFilteredProducts({
        country: "Argentina",
        category: "Legumbres",
        lang: "ES",
      });
      const arProductsEn = catalogFacade.getFilteredProducts({
        country: "Argentina",
        category: "Legumbres",
        lang: "EN",
      });

      expect(arProductsEs.some((p) => p.name === "Garbanzo Kabuli")).toBe(true);
      expect(arProductsEn.some((p) => p.name === "Kabuli Chickpea")).toBe(true);
    });

    it("should update an existing product technical sheet (moisture, calibers, parameters) in ES & EN", async () => {
      const existing = cmsFacade.getBilingualProductById("chia-bo")!;
      const updatedRecord: BilingualProductRecord = {
        es: {
          ...existing.es,
          name: "Chía Orgánica Premium",
          moisture: "Máx. 7.5%",
          calibers: ["Pureza 99.95% Export"],
        },
        en: {
          ...existing.en,
          name: "Premium Organic Chia",
          calibers: ["99.95% Export Purity"],
        },
      };

      await cmsFacade.saveProduct(updatedRecord, validAdminToken);
      expect(mockSupabaseAdapter.upsertProductRow).toHaveBeenCalledTimes(1);

      const localizedEs = catalogFacade
        .getFilteredProducts({ country: "Bolivia", category: "Semillas", lang: "ES" })
        .find((p) => p.id === "chia-bo");
      const localizedEn = catalogFacade
        .getFilteredProducts({ country: "Bolivia", category: "Semillas", lang: "EN" })
        .find((p) => p.id === "chia-bo");

      expect(localizedEs?.name).toBe("Chía Orgánica Premium");
      expect(localizedEs?.moisture).toBe("Máx. 7.5%");
      expect(localizedEn?.name).toBe("Premium Organic Chia");
      expect(localizedEn?.calibers).toEqual(["99.95% Export Purity"]);
    });

    it("should validate required product fields and reject malformed technical sheets", async () => {
      const invalidProduct = {
        es: {
          id: "",
          name: "",
          scientific: "",
          country: "Argentina",
          region: "",
          category: "Legumbres",
        },
        en: {},
      } as unknown as BilingualProductRecord;

      const validation = cmsFacade.validateProductRecord(invalidProduct);
      expect(validation.valid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);

      await expect(
        cmsFacade.saveProduct(invalidProduct, validAdminToken)
      ).rejects.toThrow(/Validación fallida|Invalid/i);
    });

    it("should duplicate an existing product into a new ID and delete a product via mocked Supabase", async () => {
      const duplicated = await cmsFacade.duplicateProduct(
        "quinua-bo",
        "quinua-real-organica-bo",
        validAdminToken
      );
      expect(duplicated.es.id).toBe("quinua-real-organica-bo");
      expect(cmsFacade.getAllBilingualProducts().length).toBe(18);

      const deleted = await cmsFacade.deleteProduct("quinua-real-organica-bo", validAdminToken);
      expect(deleted).toBe(true);
      expect(mockSupabaseAdapter.deleteProductRow).toHaveBeenCalledWith("quinua-real-organica-bo");
      expect(cmsFacade.getAllBilingualProducts().length).toBe(17);
    });
  });

  describe("3. Site Copy (ES/EN) & Company Settings Management", () => {
    it("should update bilingual UI translations and persist via mocked Supabase adapter", async () => {
      const updated = await cmsFacade.saveSiteTranslations(
        "ES",
        { hero_title_1: "Exportamos la excelencia agrícola de" },
        validAdminToken
      );

      expect(updated.ES.hero_title_1).toBe("Exportamos la excelencia agrícola de");
      expect(mockSupabaseAdapter.upsertTranslations).toHaveBeenCalledTimes(1);
    });

    it("should update CompanyConfig (WhatsApp, Email) and reflect in CatalogFacade links", async () => {
      const updatedCompany = await cmsFacade.saveCompanySettings(
        {
          whatsapp: "59170001122",
          whatsappDisplay: "+591 7000-1122",
          email: "exportaciones@plataformasur.net",
        },
        validAdminToken
      );

      expect(updatedCompany.whatsapp).toBe("59170001122");
      expect(mockSupabaseAdapter.upsertCompanyConfig).toHaveBeenCalledTimes(1);
      expect(catalogFacade.getCompanyInfo().email).toBe("exportaciones@plataformasur.net");
      expect(catalogFacade.buildWhatsAppLink("Hola")).toContain("59170001122");
    });
  });

  describe("4. Supabase Cloud Sync, JSON Snapshot Export/Import & Reset", () => {
    it("should report Supabase connection status accurately", () => {
      const status = cmsFacade.getConnectionStatus();
      expect(status.mode).toBe("supabase");
      expect(status.supabaseUrl).toBe("https://mock-project.supabase.co");
      expect(status.productCount).toBe(17);
    });

    it("should export full CMS snapshot JSON and import it cleanly", async () => {
      const json = cmsFacade.exportBackupJson();
      const parsed = JSON.parse(json);
      expect(parsed.products.length).toBe(17);
      expect(parsed.company.companyName).toBe("Plataforma Sur");

      // Delete one product then restore via importBackupJson
      await cmsFacade.deleteProduct("soya-ar", validAdminToken);
      expect(cmsFacade.getAllBilingualProducts().length).toBe(16);

      const importResult = await cmsFacade.importBackupJson(json, validAdminToken);
      expect(importResult.importedProducts).toBe(17);
      expect(cmsFacade.getAllBilingualProducts().length).toBe(17);
    });

    it("should push all 17 seed products, translations, and company config to Supabase on pushAllToSupabase", async () => {
      const res = await cmsFacade.pushAllToSupabase(validAdminToken);
      expect(res.pushedProducts).toBe(17);
      expect(mockSupabaseAdapter.upsertProductRow).toHaveBeenCalledTimes(17);
      expect(mockSupabaseAdapter.upsertTranslations).toHaveBeenCalledTimes(1);
      expect(mockSupabaseAdapter.upsertCompanyConfig).toHaveBeenCalledTimes(1);
    });
  });
});
