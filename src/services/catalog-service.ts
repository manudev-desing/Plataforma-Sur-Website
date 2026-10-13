import { localizeProduct, Product } from "../data/products";
import { Locale } from "../data/translations";
import { CompanyConfig } from "../data/company";
import { CmsService, defaultCmsService } from "./cms-service";

export class CatalogService {
  private readonly cmsService: CmsService;

  constructor(cmsService: CmsService = defaultCmsService) {
    this.cmsService = cmsService;
  }

  public getAllProducts(): Product[] {
    return this.cmsService.getProductsSync().map((r) => r.es);
  }

  public localizeProductForLang(product: Product, lang: Locale): Product {
    if (lang === "ES") return product;
    const record = this.cmsService.getProductByIdSync(product.id);
    const en = record?.en;
    if (!en || Object.keys(en).length === 0) {
      return localizeProduct(product, lang);
    }
    return {
      ...product,
      name: en.name ?? product.name,
      region: en.region ?? product.region,
      shortDescription: en.shortDescription ?? product.shortDescription,
      description: en.description ?? product.description,
      physical: { ...product.physical, ...(en.physical ?? {}) },
      qualityParameters: en.qualityParameters ?? product.qualityParameters,
      chemicalParameters: en.chemicalParameters ?? product.chemicalParameters,
      condition: en.condition ?? product.condition,
      observation: en.observation ?? product.observation,
      varieties: en.varieties ?? product.varieties,
      calibers: en.calibers ?? product.calibers,
      packaging: en.packaging ?? product.packaging,
      harvestSeason: en.harvestSeason ?? product.harvestSeason,
      certifications: en.certifications ?? product.certifications,
      incoterms: en.incoterms ?? product.incoterms,
      uses: en.uses ?? product.uses,
    };
  }

  public getProductCountByCountry(country: string): number {
    return this.getAllProducts().filter((p) => p.country === country).length;
  }

  public getCompanyInfo(): CompanyConfig {
    return this.cmsService.getCompanyConfig();
  }

  public getTranslations(): Record<Locale, Record<string, string>> {
    return this.cmsService.getTranslations();
  }
}

export const defaultCatalogService = new CatalogService();
