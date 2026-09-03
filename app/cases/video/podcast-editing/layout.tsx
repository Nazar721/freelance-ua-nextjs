import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Монтаж подкасту | Freelance UA",
  description: "Монтаж подкасту — професійний монтаж тривалого аудіо/відео формату",
  alternates: {
    canonical: "/cases/video/podcast-editing",
  },
  openGraph: {
    title: "Монтаж подкасту | Freelance UA",
    description: "Монтаж подкасту — професійний монтаж тривалого аудіо/відео формату",
    images: ["https://freelance-ua.agency/media/cases/podcast-editing/screenshot-1.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
