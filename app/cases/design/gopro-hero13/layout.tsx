import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GoPro | Freelance UA",
  description: "Продуктовий рекламний постер камери GoPro Black з акцентом на ключові технічні переваги.",
  alternates: {
    canonical: "/cases/design/gopro-hero13",
  },
  openGraph: {
    title: "GoPro | Freelance UA",
    description: "Продуктовий рекламний постер камери GoPro Black з акцентом на ключові технічні переваги.",
    images: ["https://freelance-ua.agency/media/cases/gopro-hero13/gopro-hero13-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
