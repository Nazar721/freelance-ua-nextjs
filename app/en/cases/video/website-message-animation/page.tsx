import type { Metadata } from "next";
import CasePage from "@/components/cases/CasePage";
import { caseMetadata } from "@/lib/case-page";

export async function generateMetadata(): Promise<Metadata> {
  return caseMetadata("video/website-message-animation", "en");
}

export default function EnWebsiteMessageAnimationCasePage() {
  return <CasePage id="video/website-message-animation" locale="en" />;
}
