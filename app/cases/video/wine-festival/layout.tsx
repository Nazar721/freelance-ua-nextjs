import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Відео для винного фестивалю | Freelance UA",
  description: "YouTube-відео для винного фестивалю — монтаж з атмосферними кадрами",
  alternates: {
    canonical: "/cases/video/wine-festival",
  },
  openGraph: {
    title: "Відео для винного фестивалю | Freelance UA",
    description: "YouTube-відео для винного фестивалю — монтаж з атмосферними кадрами",
    images: ["https://freelance-ua.agency/media/cases/wine-festival/poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
