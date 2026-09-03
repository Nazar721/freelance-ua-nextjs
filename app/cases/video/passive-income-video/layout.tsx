import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пасивний дохід | Freelance UA",
  description: "Відео про пасивний дохід — монтаж для YouTube з динамічною подачею",
  alternates: {
    canonical: "/cases/video/passive-income-video",
  },
  openGraph: {
    title: "Пасивний дохід | Freelance UA",
    description: "Відео про пасивний дохід — монтаж для YouTube з динамічною подачею",
    images: ["https://freelance-ua.agency/media/cases/passive-income-video/poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
