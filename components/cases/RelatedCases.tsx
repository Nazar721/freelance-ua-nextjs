"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";
import { counterpartPath } from "@/lib/i18n-routes";
import type { RelatedCaseCard } from "@/data/case-records";

/** Similar work: three cards taken from the catalogue registry (same
 *  subcategory first), never including the case being viewed. On an English
 *  page a card links to the EN case when it exists, otherwise to the
 *  Ukrainian page — the same rule the catalogues already follow. */
export default function RelatedCases({ items }: { items: RelatedCaseCard[] }) {
  const { t, locale } = useTranslation();
  if (items.length === 0) return null;

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn y={30} blur={8}>
          <h2 className="mb-12 text-3xl font-bold text-foreground md:text-4xl">
            {t("itCases.relatedProjects")}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <FadeIn key={item.id} delay={0.1 + index * 0.1} y={30} blur={4}>
              <Link
                href={(locale === "en" && counterpartPath(item.href, "en")) || item.href}
                className="group block overflow-hidden rounded-2xl border border-border bg-secondary/50 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_8px_32px_rgba(99,102,241,0.15)]"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-background">
                  <Image
                    src={item.image}
                    alt={t(item.titleKey)}
                    width={800}
                    height={500}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                </div>

                <div className="p-6">
                  <span className="mb-2 block text-xs font-medium text-primary">{t(item.categoryKey)}</span>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{t(item.titleKey)}</h3>
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {t(item.descriptionKey)}
                  </p>
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-primary transition-all duration-300 md:group-hover:gap-2.5">
                    {t("itCases.viewProject")}
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 md:group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
