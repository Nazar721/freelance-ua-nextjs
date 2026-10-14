// Visible breadcrumb of a case page and its JSON-LD twin.
//
// Both the page body and the structured data are built from the SAME item
// list, so BreadcrumbList can never drift from what the visitor sees:
// Головна → напрям → кейс, localized, with the direction pointing at the
// direction page (`/services/{direction}`) that holds that direction's work.
import { translations, type Locale } from "@/lib/i18n";
import { absUrl } from "@/lib/i18n-routes";
import type { Direction } from "@/data/case-records/types";

export interface CaseBreadcrumbItem {
  label: string;
  /** Absent on the last item — it is the current page. */
  href?: string;
}

export function caseBreadcrumbs({
  direction,
  h1,
  locale,
}: {
  direction: Direction;
  h1: string;
  locale: Locale;
}): CaseBreadcrumbItem[] {
  const dict = translations[locale];
  const prefix = locale === "en" ? "/en" : "";
  return [
    { label: dict["cases.breadcrumb.home"] ?? (locale === "en" ? "Home" : "Головна"), href: prefix || "/" },
    {
      label: dict[`services.${direction}.category`] ?? direction,
      href: `${prefix}/services/${direction}`,
    },
    { label: h1 },
  ];
}

/** Structured data matching the visible chain. `pagePath` is the page's own
 *  language path (UA or EN) — it becomes the last item's `item` URL. */
export function breadcrumbJsonLd(items: CaseBreadcrumbItem[], pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absUrl(item.href ?? pagePath),
    })),
  };
}
