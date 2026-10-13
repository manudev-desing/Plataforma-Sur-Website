import { CatalogService, defaultCatalogService } from "../services/catalog-service";
import { SecurityFacade, securityFacade } from "./security-facade";
import { localizeProduct, Product } from "../data/products";
import { Locale } from "../data/translations";
import { CompanyConfig, createWhatsAppUrl, createEmailUrl } from "../data/company";

export interface CatalogFilterCriteria {
  country: string;
  category: string;
  lang: Locale;
}

export class CatalogFacade {
  private readonly catalogService: CatalogService;
  private readonly secFacade: SecurityFacade;

  constructor(
    catalogService: CatalogService = defaultCatalogService,
    secFacade: SecurityFacade = securityFacade
  ) {
    this.catalogService = catalogService;
    this.secFacade = secFacade;
  }

  public getFilteredProducts(criteria: CatalogFilterCriteria): Product[] {
    const all = this.catalogService.getAllProducts();
    return all
      .filter(
        (p) =>
          (criteria.country === "Todos" || p.country === criteria.country) &&
          (criteria.category === "Todas" || p.category === criteria.category)
      )
      .map((p) => localizeProduct(p, criteria.lang));
  }

  public getEncryptedCatalog(criteria: CatalogFilterCriteria): string {
    const filtered = this.getFilteredProducts(criteria);
    return this.secFacade.encodeProtectedPayload(filtered);
  }

  public decryptCatalogPayload(token: string): Product[] {
    return this.secFacade.decodeProtectedPayload<Product[]>(token);
  }

  public getProductCountByCountry(country: string): number {
    return this.catalogService.getProductCountByCountry(country);
  }

  public getCompanyInfo(): CompanyConfig {
    return this.catalogService.getCompanyInfo();
  }

  public buildWhatsAppLink(message: string): string {
    return createWhatsAppUrl(message);
  }

  public buildEmailLink(subject: string, body: string): string {
    return createEmailUrl(subject, body);
  }
}

export const catalogFacade = new CatalogFacade();
