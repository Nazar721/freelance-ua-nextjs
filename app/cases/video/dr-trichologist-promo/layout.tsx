import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-промо для Dr. Trichologist | Freelance UA",
  description: "AI-генероване промо-відео для тріхологічного бренду Dr. Trichologist — візуалізація продукту та процесу застосування",
  alternates: {
    canonical: "/cases/video/dr-trichologist-promo",
  },
  openGraph: {
    title: "AI-промо для Dr. Trichologist | Freelance UA",
    description: "AI-генероване промо-відео для тріхологічного бренду Dr. Trichologist",
    images: ["https://freelance-ua.agency/media/cases/dr-trichologist-promo/screenshot.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
