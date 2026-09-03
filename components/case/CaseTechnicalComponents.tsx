"use client";

import Image from "next/image";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";

interface TechnicalComponent {
  titleKey: string;
  descKey: string;
  image?: string;
  images?: string[];
}

interface CaseTechnicalComponentsProps {
  titleKey?: string;
  components: TechnicalComponent[];
}

export default function CaseTechnicalComponents({ titleKey = "itCases.technicals", components }: CaseTechnicalComponentsProps) {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <FadeIn y={30} blur={8}>
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            {t(titleKey)}
          </h2>
        </FadeIn>

        <div className="space-y-6">
          {components.map((comp, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.08} y={30} blur={4}>
              <div className="featured-case-card p-6 md:p-8" style={{ borderRadius: "16px" }}>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {t(comp.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(comp.descKey)}
                </p>
                {comp.image && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-border">
                    <Image
                      src={comp.image}
                      alt={t(comp.titleKey)}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain"
                      draggable={false}
                    />
                  </div>
                )}
                {comp.images && (
                  <div className="mt-4 space-y-4">
                    {comp.images.map((img: string, idx: number) => (
                      <div key={idx} className="rounded-xl overflow-hidden border border-border">
                        <Image
                          src={img}
                          alt={`${t(comp.titleKey)} ${idx + 1}`}
                          width={1200}
                          height={800}
                          className="w-full h-auto object-contain"
                          draggable={false}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
