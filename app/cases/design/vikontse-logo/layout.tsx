import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "розробка логотипу | Freelance UA",
  description: "Логотип для компанії «Віконце» — графічний символ будинку з вікном та фірмова типографіка.",
  alternates: {
    canonical: "/cases/design/vikontse-logo",
  },
  openGraph: {
    title: "розробка логотипу | Freelance UA",
    description: "Логотип для компанії «Віконце» — графічний символ будинку з вікном та фірмова типографіка.",
    images: ["https://freelance-ua.agency/media/cases/vikontse-logo/vikontse-logo-preview.webp?v=2"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
