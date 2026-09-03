import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reels для автобренду | Freelance UA",
  description: "Динамічні Reels для автобренду — монтаж з швидкими переходами",
  alternates: {
    canonical: "/cases/video/auto-edits-reels",
  },
  openGraph: {
    title: "Reels для автобренду | Freelance UA",
    description: "Динамічні Reels для автобренду — монтаж з швидкими переходами",
    images: ["https://freelance-ua.agency/media/cases/auto-edits/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
