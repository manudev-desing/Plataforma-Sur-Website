export interface CompanyConfig {
  whatsapp: string;
  whatsappDisplay: string;
  email: string;
  companyName: string;
  tagline: string;
  website: string;
}

export const companyConfig: CompanyConfig = {
  whatsapp: "59168938712",
  whatsappDisplay: "+591 6893-8712",
  email: "comercial@productosdelsur.com",
  companyName: "Plataforma Sur",
  tagline: "Global Business",
  website: "https://www.plataformasur.net",
};

export const createWhatsAppUrl = (message: string): string =>
  `https://wa.me/${companyConfig.whatsapp}?text=${encodeURIComponent(message)}`;

export const createEmailUrl = (subject: string, body: string): string =>
  `mailto:${companyConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
