import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Origins from "@/components/Origins";
import CertificationsBanner from "@/components/CertificationsBanner";
import ProductCatalog from "@/components/ProductCatalog";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Origins />
        <CertificationsBanner />
        <ProductCatalog />
        <WhyUs />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
