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
import { localizedMetadata } from "@/lib/seo";
import { translations } from "@/lib/i18n";

export const metadata: Metadata = localizedMetadata({
  locale: "en",
  uaPath: "/",
  title: "Freelance UA || Digital Agency",
  description: translations.en["meta.home.description"],
  ogImage: "/og-image.jpg",
});

// English home: same section composition as the Ukrainian home; the language
// comes from the URL (/en), so the shared components render in English.
export default function EnHomePage() {
  return (
    <main className="relative isolate overflow-x-clip">
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
