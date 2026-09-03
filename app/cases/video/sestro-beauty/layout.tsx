import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-відео для Sestro | Freelance UA",
  description: "AI-генеровані промо-ролики для beauty-бренду — візуалізація атмосфери та послуг салону",
  alternates: {
    canonical: "/cases/video/sestro-beauty",
  },
  openGraph: {
    title: "AI-відео для Sestro | Freelance UA",
    description: "AI-генеровані промо-ролики для beauty-бренду — візуалізація атмосфери та послуг салону",
    images: ["https://freelance-ua.agency/media/cases/sestro-beauty/screenshot.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
