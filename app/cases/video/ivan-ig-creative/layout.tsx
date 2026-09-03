import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI для Instagram | Freelance UA",
  description: "Два рекламних креатива для Instagram — AI-згенеровані відео для просування продукту",
  alternates: {
    canonical: "/cases/video/ivan-ig-creative",
  },
  openGraph: {
    title: "AI для Instagram | Freelance UA",
    description: "Два рекламних креатива для Instagram — AI-згенеровані відео для просування продукту",
    images: ["https://freelance-ua.agency/media/cases/ivan-ig-creative/screenshot.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
