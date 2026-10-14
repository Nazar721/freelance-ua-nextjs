import type { Metadata } from "next";
import CasePage from "@/components/cases/CasePage";
import { caseMetadata } from "@/lib/case-page";

// Reworked case page (Package 4): body, metadata and related work all come
// from one record in data/case-records/.
export async function generateMetadata(): Promise<Metadata> {
  return caseMetadata("video/ai-spring-fashion", "en");
}

export default function EnaiSpringFashionCasePage() {
  return <CasePage id="video/ai-spring-fashion" locale="en" />;
}
