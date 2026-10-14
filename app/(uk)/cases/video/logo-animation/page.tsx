import type { Metadata } from "next";
import CasePage from "@/components/cases/CasePage";
import { caseMetadata } from "@/lib/case-page";

// Reworked case page (Package 4): body, metadata and related work all come
// from one record in data/case-records/.
export async function generateMetadata(): Promise<Metadata> {
  return caseMetadata("video/logo-animation", "uk");
}

export default function logoAnimationCasePage() {
  return <CasePage id="video/logo-animation" locale="uk" />;
}
