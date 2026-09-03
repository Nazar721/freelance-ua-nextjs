import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Varto — Енергетика | Freelance UA",
  description: "Instagram Reel для бренду Varto про інвестування в незалежну енергетику України",
  alternates: {
    canonical: "/cases/video/varto-reels",
  },
  openGraph: {
    title: "Varto — Енергетика | Freelance UA",
    description: "Instagram Reel для бренду Varto про інвестування в незалежну енергетику України",
    images: ["https://freelance-ua.agency/media/cases/varto-reels/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
