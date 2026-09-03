import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voltone.pro | Freelance UA",
  description: "Інтернет-магазин павербанків та зарядних пристроїв: каталог з фільтрами, знижки до −40%, реальні відгуки, особистий кабінет, Instagram-стрічка та швидка",
  alternates: {
    canonical: "/cases/it/voltone-pro",
  },
  openGraph: {
    title: "Voltone.pro | Freelance UA",
    description: "Інтернет-магазин павербанків та зарядних пристроїв: каталог з фільтрами, знижки до −40%, реальні відгуки, особистий кабінет, Instagram-стрічка та швидка",
    images: ["https://freelance-ua.agency/media/cases/voltone-mocap.webp?v=2"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
