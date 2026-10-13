import { describe, expect, it, beforeEach, mock } from "bun:test";
import { SecurityFacade } from "../src/facades/security-facade";
import { CatalogFacade } from "../src/facades/catalog-facade";
import { SecurityService } from "../src/services/security-service";
import { CatalogService } from "../src/services/catalog-service";

describe("SecurityFacade & Anti-Scraping Shield (TDD Suite)", () => {
  let securityService: SecurityService;
  let securityFacade: SecurityFacade;

  beforeEach(() => {
    securityService = new SecurityService({
      maxRequestsPerWindow: 5,
      windowMs: 60_000,
      secretSalt: "test-ps-shield-salt-2026",
    });
    securityFacade = new SecurityFacade(securityService);
  });

  describe("1. Bot & Scraper User-Agent Detection", () => {
    const scraperAgents = [
      "curl/8.5.0",
      "Wget/1.21.4",
      "python-requests/2.31.0",
      "Python-urllib/3.11",
      "Scrapy/2.11.0 (+https://scrapy.org)",
      "HTTrack 3.49",
      "Mozilla/5.0 (X11; Linux x86_64) HeadlessChrome/120.0.0.0",
      "Mozilla/5.0 (compatible; Puppeteer)",
      "Playwright/1.42.0",
      "Go-http-client/1.1",
      "axios/1.6.7",
      "libwww-perl/6.67",
      "",
      "   ",
    ];

    for (const ua of scraperAgents) {
      it(`should block scraper User-Agent: "${ua || "<empty>"}" with 403 Forbidden`, () => {
        const result = securityFacade.inspectIncomingRequest({
          ip: "203.0.113.10",
          userAgent: ua,
          path: "/",
          headers: {},
        });

        expect(result.allowed).toBe(false);
        expect(result.statusCode).toBe(403);
        expect(result.reason).toBeDefined();
      });
    }

    it("should allow legitimate standard browser requests", () => {
      const browserUA =
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

      const result = securityFacade.inspectIncomingRequest({
        ip: "198.51.100.25",
        userAgent: browserUA,
        path: "/",
        headers: { "accept-language": "es-AR,es;q=0.9,en;q=0.8" },
      });

      expect(result.allowed).toBe(true);
      expect(result.statusCode).toBe(200);
      expect(result.headers["X-Frame-Options"]).toBe("DENY");
      expect(result.headers["X-Content-Type-Options"]).toBe("nosniff");
    });
  });

  describe("2. IP Rate Limiting Protection", () => {
    it("should block an IP with 429 Too Many Requests when exceeding threshold", () => {
      const browserUA =
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";
      const ip = "192.0.2.99";

      for (let i = 0; i < 5; i++) {
        const res = securityFacade.inspectIncomingRequest({
          ip,
          userAgent: browserUA,
          path: "/api/catalog",
          headers: { "accept-language": "es" },
        });
        expect(res.allowed).toBe(true);
      }

      const sixthAttempt = securityFacade.inspectIncomingRequest({
        ip,
        userAgent: browserUA,
        path: "/api/catalog",
        headers: { "accept-language": "es" },
      });

      expect(sixthAttempt.allowed).toBe(false);
      expect(sixthAttempt.statusCode).toBe(429);
      expect(sixthAttempt.reason).toContain("Rate limit");
    });
  });

  describe("3. Payload Obfuscation & Anti-Plaintext Leak", () => {
    it("should obfuscate sensitive catalog data so plaintext strings do not appear in encoded payload", () => {
      const secretData = {
        id: "alubia-blanco-ar",
        name: "Frijol Alubia Blanco",
        email: "comercial@productosdelsur.com",
        whatsapp: "59168938712",
      };

      const encoded = securityFacade.encodeProtectedPayload(secretData);

      expect(typeof encoded).toBe("string");
      expect(encoded).not.toContain("Frijol Alubia Blanco");
      expect(encoded).not.toContain("comercial@productosdelsur.com");
      expect(encoded).not.toContain("59168938712");

      const decoded = securityFacade.decodeProtectedPayload<typeof secretData>(encoded);
      expect(decoded).toEqual(secretData);
    });

    it("should throw error when attempting to decode tampered or invalid payload", () => {
      expect(() => securityFacade.decodeProtectedPayload("invalid_corrupted_token")).toThrow();
    });
  });

  describe("4. Client DevTools & Source Inspection Shortcut Blocker", () => {
    it("should block F12, Ctrl+U, Ctrl+S, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C", () => {
      expect(securityFacade.shouldBlockKeyboardShortcut({ key: "F12" })).toBe(true);
      expect(securityFacade.shouldBlockKeyboardShortcut({ key: "u", ctrlKey: true })).toBe(true);
      expect(securityFacade.shouldBlockKeyboardShortcut({ key: "U", ctrlKey: true })).toBe(true);
      expect(securityFacade.shouldBlockKeyboardShortcut({ key: "s", ctrlKey: true })).toBe(true);
      expect(
        securityFacade.shouldBlockKeyboardShortcut({ key: "I", ctrlKey: true, shiftKey: true })
      ).toBe(true);
      expect(
        securityFacade.shouldBlockKeyboardShortcut({ key: "J", ctrlKey: true, shiftKey: true })
      ).toBe(true);
      expect(
        securityFacade.shouldBlockKeyboardShortcut({ key: "C", ctrlKey: true, shiftKey: true })
      ).toBe(true);
      expect(
        securityFacade.shouldBlockKeyboardShortcut({ key: "i", metaKey: true, altKey: true })
      ).toBe(true);
    });

    it("should allow normal user keyboard interactions", () => {
      expect(securityFacade.shouldBlockKeyboardShortcut({ key: "Enter" })).toBe(false);
      expect(securityFacade.shouldBlockKeyboardShortcut({ key: "Escape" })).toBe(false);
      expect(securityFacade.shouldBlockKeyboardShortcut({ key: "a" })).toBe(false);
      expect(securityFacade.shouldBlockKeyboardShortcut({ key: "Tab" })).toBe(false);
    });
  });

  describe("5. CatalogFacade Orchestration with Strict Service Mocking", () => {
    it("should orchestrate product filtering, localization and payload encoding via injected services", () => {
      const mockCatalogService = {
        getAllProducts: mock(() => [
          {
            id: "alubia-blanco-ar",
            name: "Frijol Alubia Blanco",
            scientific: "Phaseolus vulgaris L.",
            country: "Argentina" as const,
            region: "Salta y Jujuy (NOA)",
            category: "Legumbres" as const,
            image: "/images/products/alubia-blanco.jpg",
            shortDescription: "Alubia blanca premium",
            description: "Frijol Alubia Blanco del NOA",
            physical: { color: "Blanco", smellTaste: "Normal", appearance: "Entero" },
            qualityParameters: [{ label: "Pureza", value: "99.5%" }],
            chemicalParameters: [{ label: "Humedad", value: "14%" }],
            condition: "Limpio",
            observation: "Apto",
            varieties: ["Cerrillos"],
            calibers: ["180/200"],
            moisture: "14%",
            qualityParams: ["Pureza 99.5%"],
            packaging: ["Bolsas 25kg"],
            harvestSeason: "Mayo",
            certifications: ["HACCP"],
            incoterms: ["FOB"],
            uses: ["Consumo"],
          },
        ]),
        getProductCountByCountry: mock((country: string) => (country === "Argentina" ? 7 : 5)),
        getCompanyInfo: mock(() => ({
          whatsapp: "59168938712",
          whatsappDisplay: "+591 6893-8712",
          email: "comercial@productosdelsur.com",
          companyName: "Plataforma Sur",
          tagline: "Global Business",
        })),
      } as unknown as CatalogService;

      const facade = new CatalogFacade(mockCatalogService, securityFacade);

      const filteredEn = facade.getFilteredProducts({
        country: "Argentina",
        category: "Legumbres",
        lang: "EN",
      });

      expect(mockCatalogService.getAllProducts).toHaveBeenCalledTimes(1);
      expect(filteredEn.length).toBe(1);
      expect(filteredEn[0].name).toBe("White Alubia Bean");

      // Encrypted catalog delivery
      const encryptedPayload = facade.getEncryptedCatalog({
        country: "Argentina",
        category: "Todas",
        lang: "ES",
      });
      expect(encryptedPayload).not.toContain("Frijol Alubia Blanco");

      const decrypted = facade.decryptCatalogPayload(encryptedPayload);
      expect(decrypted.length).toBe(1);
      expect(decrypted[0].id).toBe("alubia-blanco-ar");
    });
  });
});
