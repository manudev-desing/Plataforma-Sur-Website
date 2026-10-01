import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manudev-desing.github.io/Plataforma-Sur-Website"),
  title: "Plataforma Sur - Del sur al mundo: calidad que cruza fronteras",
  description:
    "Conectamos al mundo con la riqueza de Latinoamérica a través de una plataforma confiable, sólida y en constante expansión. Relaciones que permanecen.",
  keywords:
    "exportación, latinoamérica, comercio internacional, granos, madera, cuero, logística, plataforma exportadora, América del Sur",
  authors: [{ name: "Plataforma Sur" }],
  openGraph: {
    title: "Plataforma Sur - Del sur al mundo: calidad que cruza fronteras",
    description:
      "Conectamos al mundo con la riqueza de Latinoamérica. Relaciones que permanecen.",
    url: "https://plataformasur.net",
    siteName: "Plataforma Sur",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plataforma Sur - Del sur al mundo",
    description: "Calidad que cruza fronteras, relaciones que permanecen",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${outfit.variable} font-outfit antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
