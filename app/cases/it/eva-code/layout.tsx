import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E.V.A. CODE™ | Freelance UA",
  description: "Комплексна платформа для експертів з діагностики, що автоматизує роботу з клієнтами від заявки до консультації.",
  alternates: {
    canonical: "/cases/it/eva-code",
  },
  openGraph: {
    title: "E.V.A. CODE™ | Freelance UA",
    description: "Комплексна платформа для експертів з діагностики, що автоматизує роботу з клієнтами від заявки до консультації.",
    images: ["https://freelance-ua.agency/media/cases/eva-web.webp?v=2"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
