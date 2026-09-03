import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Автоматизація за 1 клік | Freelance UA",
  description: "YouTube-відео про автоматизацію бізнесу за 1 клік — монтаж та моушн-дизайн",
  alternates: {
    canonical: "/cases/video/automation-1click",
  },
  openGraph: {
    title: "Автоматизація за 1 клік | Freelance UA",
    description: "YouTube-відео про автоматизацію бізнесу за 1 клік — монтаж та моушн-дизайн",
    images: ["https://freelance-ua.agency/media/cases/automation-1click/screenshot-3.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
