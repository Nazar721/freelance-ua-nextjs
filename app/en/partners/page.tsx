"use client";

import { PartnersHero } from "@/components/partners/PartnersHero";
import { PartnersWhoCards } from "@/components/partners/PartnersWhoCards";
import { PartnersBenefits } from "@/components/partners/PartnersBenefits";
import { PartnersHowItWorks } from "@/components/partners/PartnersHowItWorks";
import { PartnersCTA } from "@/components/partners/PartnersCTA";

// English partners page: same composition as the Ukrainian page; the language
// comes from the URL (/en/partners).
export default function EnPartnersPage() {
  return (
    <article className="min-h-screen">
      <PartnersHero />
      <PartnersWhoCards />
      <PartnersBenefits />
      <PartnersHowItWorks />
      <PartnersCTA />
    </article>
  );
}
