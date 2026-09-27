import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Інтро для Watch Hype | Freelance UA",
  description:
    "Motion-інтро для YouTube-каналу Watch Hype — анімована 3D-сцена з фінальним лого та динамічним переходом",
  alternates: {
    canonical: "/cases/video/watch-hype-intro",
  },
  openGraph: {
    title: "Інтро для Watch Hype | Freelance UA",
    description:
      "Motion-інтро для YouTube-каналу Watch Hype — анімована 3D-сцена з фінальним лого та динамічним переходом",
    images: ["https://freelance-ua.agency/media/cases/watch-hype-intro/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
