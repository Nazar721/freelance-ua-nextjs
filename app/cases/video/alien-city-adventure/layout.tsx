import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-відео про пригоди | Freelance UA",
  description: "AI-згенероване відео про пригоди в інопланетному місті — креативний контент",
  alternates: {
    canonical: "/cases/video/alien-city-adventure",
  },
  openGraph: {
    title: "AI-відео про пригоди | Freelance UA",
    description: "AI-згенероване відео про пригоди в інопланетному місті — креативний контент",
    images: ["https://freelance-ua.agency/media/cases/alien-city-adventure/hero-poster.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
