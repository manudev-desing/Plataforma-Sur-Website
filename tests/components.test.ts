import { describe, expect, it } from "bun:test";
import { products, localizeProduct } from "../src/data/products";
import * as fs from "fs";
import * as path from "path";

describe("Component and Data Verification", () => {
  it("should verify all 17 products have localized versions available in English", () => {
    for (const prod of products) {
      const localized = localizeProduct(prod, "EN");
      expect(localized.name.length).toBeGreaterThan(0);
      expect(localized.description.length).toBeGreaterThan(0);
      expect(localized.physical.color.length).toBeGreaterThan(0);
    }
  });

  it("should ensure all product images exist on disk", () => {
    for (const prod of products) {
      const relativePath = prod.image.replace(/^\//, "");
      const fullPath = path.join(process.cwd(), "public", relativePath);
      expect(fs.existsSync(fullPath)).toBe(true);
    }
  });

  it("should ensure all 9 hero images and isotipo exist on disk", () => {
    for (let i = 1; i <= 9; i++) {
      const heroPath = path.join(process.cwd(), "public", "images", "hero", `hero-${i}.jpg`);
      expect(fs.existsSync(heroPath)).toBe(true);
    }
    const logoPath = path.join(process.cwd(), "public", "images", "logos", "isotipo.png");
    expect(fs.existsSync(logoPath)).toBe(true);
  });
});
