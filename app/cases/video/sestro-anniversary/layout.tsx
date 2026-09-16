import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Відео до 2-ї річниці Sestro | Freelance UA",
  description: "Reels-відео для 2-ї річниці салону краси Sestro — від ідеї до реалізації, повний цикл виробництва промо-контенту",
  alternates: {
    canonical: "/cases/video/sestro-anniversary",
  },
  openGraph: {
    title: "Відео до 2-ї річниці Sestro | Freelance UA",
    description: "Reels-відео для 2-ї річниці салону краси Sestro — від ідеї до реалізації",
    images: ["https://freelance-ua.agency/media/brands/sestro.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
