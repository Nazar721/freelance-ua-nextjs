import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseRecord, type CaseRecord, type Locale } from "@/data/case-records";
import { resolveText } from "@/data/case-records/types";
import { translations } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/seo";

/** The record backing a case page. A page without its record is a 404, never
 *  an empty shell with a 200 (Package 1 rule 4). */
export function getCaseOrNotFound(id: string): CaseRecord {
  const record = getCaseRecord(id);
  if (!record) notFound();
  return record;
}

/**
 * Metadata of a case detail page: own title/description, self-canonical for
 * the page's language, reciprocal hreflang (only registered for bilingual
 * pairs — lib/seo.ts throws for an unregistered EN path) and the full
 * Open Graph / Twitter card set.
 */
export function caseMetadata(id: string, locale: Locale): Metadata {
  const record = getCaseOrNotFound(id);
  const dict = translations[locale];
  return localizedMetadata({
    locale,
    uaPath: record.uaPath,
    title: resolveText(record.seo.title, locale, dict),
    description: resolveText(record.seo.description, locale, dict),
    ogImage: record.seo.ogImage,
  });
}
