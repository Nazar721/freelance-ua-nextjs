import { notFound } from "next/navigation";

// Any /en URL that matches no English route renders the localized 404 of the
// EN root layout (app/en/not-found.tsx) with a 404 status. The static `en`
// segments outrank this catch-all, so ready pages keep matching normally.
export default function EnCatchAll() {
  notFound();
}
