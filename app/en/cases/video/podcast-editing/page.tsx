import type { Metadata } from "next";
import CasePage from "@/components/cases/CasePage";
import { caseMetadata } from "@/lib/case-page";

// Reworked case page (Package 4): body, metadata and related work all come
// from one record in data/case-records/.
export async function generateMetadata(): Promise<Metadata> {
  return caseMetadata("video/podcast-editing", "en");
}

export default function EnpodcastEditingCasePage() {
  return <CasePage id="video/podcast-editing" locale="en" />;
}
