import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import PricingSection from "@/components/sections/PricingSection";
import ItCasesSection from "@/components/sections/ItCasesSection";
import DesignCasesSection from "@/components/sections/DesignCasesSection";
import VideoCasesSection from "@/components/sections/VideoCasesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TrustedBySection from "@/components/sections/TrustedBySection";
import BecomePartnerSection from "@/components/sections/BecomePartnerSection";
import SiteBackdrop from "@/components/ui/SiteBackdrop";

export const metadata: Metadata = {
  title: "Freelance UA || Digital Agency",
  description: "Digital-агенція з ІТ-розробки, дизайну та відеовиробництва. Telegram-боти, веб-сайти, брендінг, моушн-дизайн.",
  openGraph: {
    title: "Freelance UA || Digital Agency",
    description: "Digital-агенція з ІТ-розробки, дизайну та відеовиробництва.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden pt-[88px] md:pt-16">
      <SiteBackdrop />
      <Header />
      <HeroSection />
      <div className="section-divider" />
      <WhyUsSection />
      <ServicesSection />
      <div className="section-divider" />
      <HowWeWorkSection />
      <PricingSection />
      <div className="section-divider" />
      <ItCasesSection />
      <DesignCasesSection />
      <VideoCasesSection />
      <TestimonialsSection />
      <TrustedBySection />
      <div className="section-divider my-6 sm:my-10" />
      <BecomePartnerSection />
      <Footer />
    </main>
  );
}
