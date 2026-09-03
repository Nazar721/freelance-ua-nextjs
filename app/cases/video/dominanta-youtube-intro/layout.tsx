import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Інтро для YouTube | Freelance UA",
  description: "Створили моушн-інтро для ютуб-каналу Dominanta — яскраво, динамічно, з першого кадру задає стиль каналу",
  alternates: {
    canonical: "/cases/video/dominanta-youtube-intro",
  },
  openGraph: {
    title: "Інтро для YouTube | Freelance UA",
    description: "Створили моушн-інтро для ютуб-каналу Dominanta — яскраво, динамічно, з першого кадру задає стиль каналу",
    images: ["https://freelance-ua.agency/media/cases/dominanta-youtube-intro/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
