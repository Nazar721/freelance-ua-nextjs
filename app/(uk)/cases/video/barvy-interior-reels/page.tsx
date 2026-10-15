import type { Metadata } from "next";
import CasePage from "@/components/cases/CasePage";
import { caseMetadata } from "@/lib/case-page";

export async function generateMetadata(): Promise<Metadata> {
  return caseMetadata("video/barvy-interior-reels", "uk");
}

export default function BarvyInteriorReelsCasePage() {
  return <CasePage id="video/barvy-interior-reels" locale="uk" />;
}
