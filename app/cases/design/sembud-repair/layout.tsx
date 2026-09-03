import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEMBUD | Freelance UA",
  description: "Рекламний банер ремонтної компанії у Львові — ціна, гарантія та реальні фото робіт для довіри клієнта.",
  alternates: {
    canonical: "/cases/design/sembud-repair",
  },
  openGraph: {
    title: "SEMBUD | Freelance UA",
    description: "Рекламний банер ремонтної компанії у Львові — ціна, гарантія та реальні фото робіт для довіри клієнта.",
    images: ["https://freelance-ua.agency/media/cases/sembud-repair/sembud-repair-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
