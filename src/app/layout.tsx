import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.plataformasur.net"),
  title: "Plataforma Sur · Global Business | Exportación desde Latinoamérica",
  description:
    "Conectamos al mundo con la riqueza de Latinoamérica a través de una plataforma confiable, sólida y en constante expansión.",
  keywords:
    "Plataforma Sur, Global Business, exportación, alubia, frijol negro, sésamo, chía, quinua real, maní runner, granos, legumbres, Argentina, Bolivia, Perú, B2B",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Plataforma Sur · Global Business",
    description:
      "Conectamos al mundo con la riqueza de Latinoamérica. Soluciones eficientes de exportación B2B desde América del Sur hacia mercados globales.",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${outfit.variable} font-outfit antialiased bg-white text-foreground`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
