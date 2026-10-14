import type { Metadata } from "next";
import CasePage from "@/components/cases/CasePage";
import { caseMetadata } from "@/lib/case-page";

// Reworked case page (Package 4): body, metadata and related work all come
// from one record in data/case-records/.
export async function generateMetadata(): Promise<Metadata> {
  return caseMetadata("design/barvy-interior", "uk");
}

export default function barvyInteriorCasePage() {
  return <CasePage id="design/barvy-interior" locale="uk" />;
}
