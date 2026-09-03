import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gel Polish | Freelance UA",
  description: "Рекламний постер гель-лаку для нігтів — акцент на якість, стійкість та насичений колір.",
  alternates: {
    canonical: "/cases/design/gel-polish",
  },
  openGraph: {
    title: "Gel Polish | Freelance UA",
    description: "Рекламний постер гель-лаку для нігтів — акцент на якість, стійкість та насичений колір.",
    images: ["https://freelance-ua.agency/media/cases/gel-polish/gel-polish-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
