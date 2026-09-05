import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-відео для медицини | Freelance UA",
  description: "AI-промо-ролик для медичного бренду — короткий динамічний візуал",
  alternates: {
    canonical: "/cases/video/vorodi-medical",
  },
  openGraph: {
    title: "AI-відео для медицини | Freelance UA",
    description: "AI-промо-ролик для медичного бренду — короткий динамічний візуал",
    images: ["https://freelance-ua.agency/media/cases/vorodi-medical/hero.mp4"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
