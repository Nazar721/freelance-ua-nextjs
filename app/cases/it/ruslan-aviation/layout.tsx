import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ruslan Aviation | Freelance UA",
  description: "Повноцінний e-commerce магазин авіаційних компонентів з швидкою навігацією, фільтрами та конверсійним дизайном.",
  alternates: {
    canonical: "/cases/it/ruslan-aviation",
  },
  openGraph: {
    title: "Ruslan Aviation | Freelance UA",
    description: "Повноцінний e-commerce магазин авіаційних компонентів з швидкою навігацією, фільтрами та конверсійним дизайном.",
    images: ["https://freelance-ua.agency/media/cases/ruslan-web-v3.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
