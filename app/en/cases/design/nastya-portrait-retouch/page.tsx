import type { Metadata } from "next";
import CasePage from "@/components/cases/CasePage";
import { caseMetadata } from "@/lib/case-page";

// Reworked case page (Package 4): the body, the metadata and the related
// work all come from one record in data/case-records/. The Ukrainian address is the
// original one and never changes; the English twin lives under app/en/.
export async function generateMetadata(): Promise<Metadata> {
  return caseMetadata("design/nastya-portrait-retouch", "en");
}

export default function EnNastyaPortraitRetouchCasePage() {
  return <CasePage id="design/nastya-portrait-retouch" locale="en" />;
}
