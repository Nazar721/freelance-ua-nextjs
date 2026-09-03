import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI маска | Freelance UA",
  description: "AI-візуалізація м'язів на відео для Reels — накладення м'язових структур з переходами",
  alternates: {
    canonical: "/cases/video/veronika-ai-muscles",
  },
  openGraph: {
    title: "AI маска | Freelance UA",
    description: "AI-візуалізація м'язів на відео для Reels — накладення м'язових структур з переходами",
    images: ["https://freelance-ua.agency/media/cases/veronika-ai-muscles/screenshot.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
