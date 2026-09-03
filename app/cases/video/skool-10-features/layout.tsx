import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Огляд Skool 10 Features | Freelance UA",
  description: "YouTube-відео з оглядом 10 фіч Skool — монтаж та монтування тривалого контенту",
  alternates: {
    canonical: "/cases/video/skool-10-features",
  },
  openGraph: {
    title: "Огляд Skool 10 Features | Freelance UA",
    description: "YouTube-відео з оглядом 10 фіч Skool — монтаж та монтування тривалого контенту",
    images: ["https://freelance-ua.agency/media/cases/skool-10-features/screen-4.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
