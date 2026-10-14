import type { Metadata } from "next";
import CasePage from "@/components/cases/CasePage";
import { caseMetadata } from "@/lib/case-page";

// Hand-migrated case page (Package 4) — see the record's comment.
export async function generateMetadata(): Promise<Metadata> {
  return caseMetadata("design/mht-clinic-billboard", "uk");
}

export default function MhtClinicBillboardCasePage() {
  return <CasePage id="design/mht-clinic-billboard" locale="uk" />;
}
