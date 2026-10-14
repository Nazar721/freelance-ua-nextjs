import CaseDetail from "@/components/cases/CaseDetail";
import { getCaseOrNotFound } from "@/lib/case-page";
import { pickRelatedCases, type Locale } from "@/data/case-records";

/** Server shell of a case detail page: resolves the record and the similar
 *  work once, then hands them to the shared renderer. Used by both language
 *  trees so UA and EN can never diverge structurally. */
export default function CasePage({ id, locale }: { id: string; locale: Locale }) {
  const record = getCaseOrNotFound(id);
  const related = pickRelatedCases(record);
  return <CaseDetail record={record} locale={locale} related={related} />;
}
