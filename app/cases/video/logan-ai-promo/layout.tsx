import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-промо LOGAN | Freelance UA",
  description: "AI-генерований промо-ролик для бренду LOGAN — преміальний масажний пристрій з креативною візуалізацією",
  alternates: {
    canonical: "/cases/video/logan-ai-promo",
  },
  openGraph: {
    title: "AI-промо LOGAN | Freelance UA",
    description: "AI-генерований промо-ролик для бренду LOGAN — преміальний масажний пристрій з креативною візуалізацією",
    images: ["https://freelance-ua.agency/media/cases/logan-ai-promo/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
