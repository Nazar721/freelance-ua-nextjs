import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "флаєри під друк | Freelance UA",
  description: "Комплект друкованих флаєрів для маркетинг-платформи Pink PR — презентація журналу, послуг та ком'юніті-флешмобу.",
  alternates: {
    canonical: "/cases/design/pink-pr-flyers",
  },
  openGraph: {
    title: "флаєри під друк | Freelance UA",
    description: "Комплект друкованих флаєрів для маркетинг-платформи Pink PR — презентація журналу, послуг та ком'юніті-флешмобу.",
    images: ["https://freelance-ua.agency/media/cases/pink-pr-flyers/pink-pr-flyers-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
