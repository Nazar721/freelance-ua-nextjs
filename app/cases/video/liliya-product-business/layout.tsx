import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Бізнес Лілії | Freelance UA",
  description: "YouTube-відео для Лілії про product-бізнес — монтаж та структурування контенту",
  alternates: {
    canonical: "/cases/video/liliya-product-business",
  },
  openGraph: {
    title: "Бізнес Лілії | Freelance UA",
    description: "YouTube-відео для Лілії про product-бізнес — монтаж та структурування контенту",
    images: ["https://freelance-ua.agency/media/cases/liliya-product-business/screen-1.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
