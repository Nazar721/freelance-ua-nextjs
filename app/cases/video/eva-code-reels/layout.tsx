import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reels для E.V.A. CODE | Freelance UA",
  description: "Монтаж Reels для проєкту E.V.A. CODE™ — серія відео для Instagram",
  alternates: {
    canonical: "/cases/video/eva-code-reels",
  },
  openGraph: {
    title: "Reels для E.V.A. CODE | Freelance UA",
    description: "Монтаж Reels для проєкту E.V.A. CODE™ — серія відео для Instagram",
    images: ["https://freelance-ua.agency/media/cases/eva-code-reels/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
