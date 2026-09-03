"use client";

import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";

interface CaseCTAProps {
  titleKey?: string;
  descKey?: string;
  ctaKey?: string;
  ctaUrl?: string;
}

export default function CaseCTA({
  titleKey = "itCases.nextStep",
  descKey = "itCases.nextStepDesc",
  ctaKey = "itCases.nextStepCta",
  ctaUrl = "https://t.me/freelance_ua",
}: CaseCTAProps) {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn y={30} blur={8}>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t(titleKey)}
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            {t(descKey)}
          </p>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-button inline-flex items-center gap-2 border border-border text-primary hover:border-primary/50 hover:bg-primary/10 font-semibold px-8 py-4 rounded-full transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(99,102,241,0.12)]"
          >
            {t(ctaKey)}
            <ArrowRight size={18} />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
