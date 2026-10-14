import type { Metadata } from "next";
import CasePage from "@/components/cases/CasePage";
import { caseMetadata } from "@/lib/case-page";

// Reworked case page (Package 4): body, metadata and related work all come
// from one record in data/case-records/.
export async function generateMetadata(): Promise<Metadata> {
  return caseMetadata("video/serhii-yarmolenko-video-lesson", "uk");
}

export default function serhiiYarmolenkoVideoLessonCasePage() {
  return <CasePage id="video/serhii-yarmolenko-video-lesson" locale="uk" />;
}
