import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Інтерв'ю з Владленом Лисенко | Freelance UA",
  description: "Монтаж інтерв'ю з Владленом Лисенко — YouTube-відео з професійним монтажем",
  alternates: {
    canonical: "/cases/video/vladlen-lisynko-interview",
  },
  openGraph: {
    title: "Інтерв'ю з Владленом Лисенко | Freelance UA",
    description: "Монтаж інтерв'ю з Владленом Лисенко — YouTube-відео з професійним монтажем",
    images: ["https://freelance-ua.agency/media/cases/vladlen-lisynko-interview/screen-3.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
