import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Інтро для Watch Hype | Freelance UA",
  description: "Моушн-інтро для YouTube-каналу Watch Hype",
  alternates: {
    canonical: "/cases/video/watch-hype-intro",
  },
  openGraph: {
    title: "Інтро для Watch Hype | Freelance UA",
    description: "Моушн-інтро для YouTube-каналу Watch Hype",
    images: ["https://freelance-ua.agency/media/cases/watch-hype-intro/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
