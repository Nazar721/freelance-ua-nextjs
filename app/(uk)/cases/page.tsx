import type { Metadata } from "next";
import { Suspense } from "react";
import CasesCatalog from "@/components/cases/CasesCatalog";
import { localizedMetadata } from "@/lib/seo";
import { translations } from "@/lib/i18n";

export const metadata: Metadata = localizedMetadata({
  locale: "uk",
  uaPath: "/cases",
  title: translations.uk["meta.cases.title"],
  description: translations.uk["meta.cases.description"],
  ogImage: "/og-image.jpg",
});

export default function CasesPage() {
  return (
    <Suspense fallback={null}>
      <CasesCatalog />
    </Suspense>
  );
}
