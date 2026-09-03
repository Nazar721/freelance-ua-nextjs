import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reels для блогера | Freelance UA",
  description: "Reels для блогера Віталія Чеверда — динамічний монтаж для Instagram",
  alternates: {
    canonical: "/cases/video/vitalii-cheverda",
  },
  openGraph: {
    title: "Reels для блогера | Freelance UA",
    description: "Reels для блогера Віталія Чеверда — динамічний монтаж для Instagram",
    images: ["https://freelance-ua.agency/media/cases/vitalii-cheverda/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
