import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HOPE Media Group UA | Freelance UA",
  description: "Брендинг-рішення для виставки в США: листівки, банери, закладки, стікери та значки — єдина візуальна історія Prophecy Road Map.",
    alternates: {
    canonical: "/cases/design/hope-media-group",
  },
  openGraph: {
    title: "HOPE Media Group UA | Freelance UA",
    description: "Брендинг-рішення для виставки в США: листівки, банери, закладки, стікери та значки — єдина візуальна історія Prophecy Road Map.",
    images: ["https://freelance-ua.agency/media/cases/hope-media/hope-media-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
