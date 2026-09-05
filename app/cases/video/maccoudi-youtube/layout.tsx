import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Маккоуді — YouTube про фріланс | Freelance UA",
  description: "Монтаж двох YouTube-відео для популярного блогера Маккоуді — динамічний контент про фріланс",
  alternates: {
    canonical: "/cases/video/maccoudi-youtube",
  },
  openGraph: {
    title: "Маккоуді — YouTube про фріланс | Freelance UA",
    description: "Монтаж двох YouTube-відео для популярного блогера Маккоуді — динамічний контент про фріланс",
    images: ["https://freelance-ua.agency/media/cases/maccoudi-youtube/poster-1.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
