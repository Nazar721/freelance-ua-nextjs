import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ВсеHub | Freelance UA",
  description: "3 Instagram Reels для ВсеHub",
  alternates: {
    canonical: "/cases/video/vsehub-reels",
  },
  openGraph: {
    title: "ВсеHub | Freelance UA",
    description: "3 Instagram Reels для ВсеHub",
    images: ["https://freelance-ua.agency/media/cases/vsehub-reels/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
