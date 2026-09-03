import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apple Tecnologia | Freelance UA",
  description: "Рекламний банер техніки Apple з акцентом на знижку до 40% та безкоштовну доставку.",
  alternates: {
    canonical: "/cases/design/apple-tecnologia",
  },
  openGraph: {
    title: "Apple Tecnologia | Freelance UA",
    description: "Рекламний банер техніки Apple з акцентом на знижку до 40% та безкоштовну доставку.",
    images: ["https://freelance-ua.agency/media/cases/apple-tecnologia/apple-tecnologia-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
