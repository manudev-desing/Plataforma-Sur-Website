import { products, Product } from "../data/products";
import { companyConfig, CompanyConfig } from "../data/company";

export class CatalogService {
  public getAllProducts(): Product[] {
    return products;
  }

  public getProductCountByCountry(country: string): number {
    return products.filter((p) => p.country === country).length;
  }

  public getCompanyInfo(): CompanyConfig {
    return companyConfig;
  }
}

export const defaultCatalogService = new CatalogService();
