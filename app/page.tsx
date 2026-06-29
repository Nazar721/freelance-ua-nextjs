import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import HowWeWorkSection from "@/components/sections/HowWeWorkSection";
import PricingSection from "@/components/sections/PricingSection";
import CasesSection from "@/components/sections/CasesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TrustedBySection from "@/components/sections/TrustedBySection";
import SiteBackdrop from "@/components/ui/SiteBackdrop";

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <SiteBackdrop />
      <Header />
      <HeroSection />
      <WhyUsSection />
      <ServicesSection />
      <HowWeWorkSection />
      <PricingSection />
      <CasesSection />
      <TestimonialsSection />
      <TrustedBySection />
      <Footer />
    </main>
  );
}
