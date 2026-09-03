import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Розмовне відео | Freelance UA",
  description: "Монтаж розмовного YouTube-відео — професійна подача та монтаж",
  alternates: {
    canonical: "/cases/video/youtube-conversational-video",
  },
  openGraph: {
    title: "Розмовне відео | Freelance UA",
    description: "Монтаж розмовного YouTube-відео — професійна подача та монтаж",
    images: ["https://freelance-ua.agency/media/cases/youtube-conversational-video/screenshot-1.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
