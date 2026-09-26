import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-відео BARVY Interior | Freelance UA",
  description: "Рекламний Reels для ремонтно-будівельної компанії BARVY Interior — AI-згенероване відео з монтажем",
  alternates: {
    canonical: "/cases/video/barvy-interior-ai-reels",
  },
  openGraph: {
    title: "AI-відео BARVY Interior | Freelance UA",
    description: "Рекламний Reels для ремонтно-будівельної компанії BARVY Interior — AI-згенероване відео з монтажем",
    images: ["https://freelance-ua.agency/media/cases/barvy-interior-ai-reels/poster.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
