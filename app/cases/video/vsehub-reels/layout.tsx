import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ВсеHub | Freelance UA",
  description: "Серія Instagram Reels для YouTube-каналу ВсеHub — повний цикл від монтажу до публікації у форматі 9:16",
  alternates: {
    canonical: "/cases/video/vsehub-reels",
  },
  openGraph: {
    title: "ВсеHub | Freelance UA",
    description: "Серія Instagram Reels для YouTube-каналу ВсеHub — повний цикл від монтажу до публікації у форматі 9:16",
    images: ["https://freelance-ua.agency/media/cases/vsehub-reels/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
