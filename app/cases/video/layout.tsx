import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Відео — Freelance UA",
  description: "Відеомонтаж, моушн-дизайн, рекламні ролики, reels та AI-відео. Портфоліо відео-проєктів агенції Freelance UA.",
  alternates: {
    canonical: "/cases/video",
  },
  openGraph: {
    title: "Відео — Freelance UA",
    description: "Відеомонтаж, моушн-дизайн, рекламні ролики, reels та AI-відео.",
  },
};

export default function VideoCasesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
