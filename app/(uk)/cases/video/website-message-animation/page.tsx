import type { Metadata } from "next";
import CasePage from "@/components/cases/CasePage";
import { caseMetadata } from "@/lib/case-page";

export async function generateMetadata(): Promise<Metadata> {
  return caseMetadata("video/website-message-animation", "uk");
}

export default function WebsiteMessageAnimationCasePage() {
  return <CasePage id="video/website-message-animation" locale="uk" />;
}
