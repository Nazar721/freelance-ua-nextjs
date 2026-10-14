import type { Metadata } from "next";
import CasePage from "@/components/cases/CasePage";
import { caseMetadata } from "@/lib/case-page";

// Reworked case page (Package 4): body, metadata and related work all come
// from one record in data/case-records/.
export async function generateMetadata(): Promise<Metadata> {
  return caseMetadata("video/barvy-interior-ai-reels", "uk");
}

export default function barvyInteriorAiReelsCasePage() {
  return <CasePage id="video/barvy-interior-ai-reels" locale="uk" />;
}
