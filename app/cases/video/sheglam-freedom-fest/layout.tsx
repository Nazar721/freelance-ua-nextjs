import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Промо SHEGLAM Freedom Fest | Freelance UA",
  description: "AI-промо для SHEGLAM Freedom Fest — динамічний візуал для маркетингової кампанії",
  alternates: {
    canonical: "/cases/video/sheglam-freedom-fest",
  },
  openGraph: {
    title: "Промо SHEGLAM Freedom Fest | Freelance UA",
    description: "AI-промо для SHEGLAM Freedom Fest — динамічний візуал для маркетингової кампанії",
    images: ["https://freelance-ua.agency/media/cases/sheglam-freedom-fest/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
