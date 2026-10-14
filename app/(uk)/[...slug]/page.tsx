import { notFound } from "next/navigation";

// Any URL that matches no Ukrainian route renders the localized 404 of the
// UK root layout (app/(uk)/not-found.tsx) with a 404 status.
export default function UkCatchAll() {
  notFound();
}
