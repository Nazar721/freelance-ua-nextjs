import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Юридичні послуги | Freelance UA",
  description: "Рекламний банер юридичної консультації з розлучення — акцент на болі клієнта, досвід та конкретну пропозицію ціни.",
  alternates: {
    canonical: "/cases/design/divorce-legal-ad",
  },
  openGraph: {
    title: "Юридичні послуги | Freelance UA",
    description: "Рекламний банер юридичної консультації з розлучення — акцент на болі клієнта, досвід та конкретну пропозицію ціни.",
    images: ["https://freelance-ua.agency/media/cases/divorce-legal-ad/divorce-legal-ad-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
