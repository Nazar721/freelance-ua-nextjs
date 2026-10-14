"use client";

import { PartnersHero } from "@/components/partners/PartnersHero";
import { PartnersWhoCards } from "@/components/partners/PartnersWhoCards";
import { PartnersBenefits } from "@/components/partners/PartnersBenefits";
import { PartnersHowItWorks } from "@/components/partners/PartnersHowItWorks";
import { PartnersCTA } from "@/components/partners/PartnersCTA";

export default function PartnersPage() {
  return (
    <article className="min-h-screen">
      {/* Scroll-driven scenes */}
      <PartnersHero />
      <PartnersWhoCards />
      <PartnersBenefits />
      <PartnersHowItWorks />
      <PartnersCTA />
    </article>
  );
}
