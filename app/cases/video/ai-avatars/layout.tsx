import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-аватари | Freelance UA",
  description: "Створення AI-аватарів — генерація унікальних персонажів за допомогою штучного інтелекту",
  alternates: {
    canonical: "/cases/video/ai-avatars",
  },
  openGraph: {
    title: "AI-аватари | Freelance UA",
    description: "Створення AI-аватарів — генерація унікальних персонажів за допомогою штучного інтелекту",
    images: ["https://freelance-ua.agency/media/cases/ai-avatars/screenshot.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
