import { describe, expect, it } from "bun:test";
import { companyConfig } from "../src/data/company";
import { translations } from "../src/data/translations";

describe("Plataforma Sur · Brandbook Compliance Suite", () => {
  it("should enforce official company name, tagline, and brand website", () => {
    expect(companyConfig.companyName).toBe("Plataforma Sur");
    expect(companyConfig.tagline).toBe("Global Business");
    expect(companyConfig.website).toBe("https://www.plataformasur.net");
  });

  it("should contain official brand essence and key narrative in translations", () => {
    // Brand essence: "Conectamos al mundo con lo mejor de Latinoamérica"
    expect(translations.ES.brand_essence).toBe("Conectamos al mundo con lo mejor de Latinoamérica");
    expect(translations.EN.brand_essence).toBe("We connect the world with the best of Latin America");

    // Key narrative: "Del sur al mundo: calidad que cruza fronteras, relaciones que permanecen"
    expect(translations.ES.brand_narrative).toBe("Del sur al mundo: calidad que cruza fronteras, relaciones que permanecen.");
    expect(translations.EN.brand_narrative).toBe("From the South to the world: quality crossing borders, relationships that endure.");

    // Core value: Confianza / Trust
    expect(translations.ES.core_value).toBe("Confianza");
    expect(translations.EN.core_value).toBe("Trust");
  });
});
