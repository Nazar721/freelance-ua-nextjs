import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voltone.pro | Freelance UA",
  description: "Інтернет-магазин павербанків та зарядних пристроїв з каталогом, знижками до −40%, відгуками, кабінетом та швидкою доставкою.",
    alternates: {
    canonical: "/cases/it/voltone-pro",
  },
  openGraph: {
    title: "Voltone.pro | Freelance UA",
    description: "Інтернет-магазин павербанків та зарядних пристроїв з каталогом, знижками до −40%, відгуками, кабінетом та швидкою доставкою.",
    images: ["https://freelance-ua.agency/media/cases/voltone-mocap.webp?v=2"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
