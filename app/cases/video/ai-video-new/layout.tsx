import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-відео промо | Freelance UA",
  description: "AI-генерований промо-ролик — динамічна візуалізація з ефектами та атмосферною подачею",
  alternates: {
    canonical: "/cases/video/ai-video-new",
  },
  openGraph: {
    title: "AI-відео промо | Freelance UA",
    description: "AI-генерований промо-ролик — динамічна візуалізація з ефектами та атмосферною подачею",
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
