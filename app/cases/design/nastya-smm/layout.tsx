import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram-візуали | Freelance UA",
  description: "Брендовані обкладинки для Instagram-контенту SMM-спеціалістки — єдиний візуальний стиль для контент-плану та освітніх постів.",
  alternates: {
    canonical: "/cases/design/nastya-smm",
  },
  openGraph: {
    title: "Instagram-візуали | Freelance UA",
    description: "Брендовані обкладинки для Instagram-контенту SMM-спеціалістки — єдиний візуальний стиль для контент-плану та освітніх постів.",
    images: ["https://freelance-ua.agency/media/cases/nastya-smm/nastya-smm-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
