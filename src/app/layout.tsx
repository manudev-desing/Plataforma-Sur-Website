import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Plataforma de Productos del Sur | Exportación de granos y legumbres",
  description:
    "Exportadores de alubia, frijoles, sésamo, chía, quinua, soya y maíz desde Argentina, Bolivia y Perú. Calidad B2B con certificaciones internacionales.",
  keywords:
    "exportación, alubia, frijol negro, sésamo, chía, quinua real, maní runner, granos, legumbres, Argentina, Bolivia, Perú, B2B",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Plataforma de Productos del Sur | Exportación B2B",
    description:
      "Exportación B2B de granos, legumbres y semillas desde Argentina, Bolivia y Perú.",
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
