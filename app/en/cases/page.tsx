import { Suspense } from "react";
import CasesCatalog from "@/components/cases/CasesCatalog";

// English cases catalog: the same client component as the Ukrainian page;
// the language comes from the URL (/en/cases).
export default function EnCasesPage() {
  return (
    <Suspense fallback={null}>
      <CasesCatalog />
    </Suspense>
  );
}
