import { describe, expect, it } from "bun:test";
import { products, localizeProduct } from "../src/data/products";
import { translations } from "../src/data/translations";
import { companyConfig, createWhatsAppUrl, createEmailUrl } from "../src/data/company";

describe("Plataforma Sur - Data and Business Logic Integrity", () => {
  it("should contain exactly 17 verified products", () => {
    expect(products.length).toBe(17);
  });

  it("should have valid product structures with all mandatory fields", () => {
    for (const p of products) {
      expect(p.id).toBeDefined();
      expect(p.name.length).toBeGreaterThan(0);
      expect(p.scientific.length).toBeGreaterThan(0);
      expect(["Argentina", "Bolivia", "Perú"]).toContain(p.country);
      expect(["Legumbres", "Granos", "Semillas", "Andinos"]).toContain(p.category);
      expect(p.image).toMatch(/^\/images\/products\/[a-z0-9-]+\.jpg$/);
      expect(p.packaging.length).toBeGreaterThan(0);
      expect(p.certifications.length).toBeGreaterThan(0);
      expect(p.incoterms.length).toBeGreaterThan(0);
      expect(p.qualityParameters.length).toBeGreaterThan(0);
      expect(p.chemicalParameters.length).toBeGreaterThan(0);
      expect(p.physical.color.length).toBeGreaterThan(0);
    }
  });

  it("should correctly localize products for ES and EN without mutating original", () => {
    const alubia = products.find((p) => p.id === "alubia-blanco-ar")!;
    expect(alubia).toBeDefined();

    // In Spanish
    const esProduct = localizeProduct(alubia, "ES");
    expect(esProduct.name).toBe("Frijol Alubia Blanco");

    // In English
    const enProduct = localizeProduct(alubia, "EN");
    expect(enProduct.name).toBe("White Alubia Bean");
    expect(enProduct.region).toContain("Salta and Jujuy");

    // Original remains pristine
    expect(alubia.name).toBe("Frijol Alubia Blanco");
  });

  it("should have complete bilingual parity across translations dictionary", () => {
    const esKeys = Object.keys(translations.ES);
    const enKeys = Object.keys(translations.EN);

    expect(esKeys.length).toBeGreaterThan(30);
    expect(enKeys.length).toBeGreaterThan(30);

    // Verify key parity
    for (const key of esKeys) {
      expect(translations.EN[key]).toBeDefined();
      expect(translations.EN[key].length).toBeGreaterThan(0);
    }
  });

  it("should format valid direct contact URLs for WhatsApp and Email", () => {
    const waUrl = createWhatsAppUrl("Test Inquiry");
    expect(waUrl).toContain("wa.me/59168938712");
    expect(waUrl).toContain("text=Test%20Inquiry");

    const mailUrl = createEmailUrl("Subject Test", "Body Content");
    expect(mailUrl).toContain("mailto:comercial@productosdelsur.com");
    expect(mailUrl).toContain("subject=Subject%20Test");
    expect(mailUrl).toContain("body=Body%20Content");
  });
});
