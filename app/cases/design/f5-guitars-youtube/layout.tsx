import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "обкладинка YouTube | Freelance UA",
  description: "Кліковабельна обкладинка для відео каналу про гітари — «купити чи заснувати бренд?» у форматі порівняння.",
  alternates: {
    canonical: "/cases/design/f5-guitars-youtube",
  },
  openGraph: {
    title: "обкладинка YouTube | Freelance UA",
    description: "Кліковабельна обкладинка для відео каналу про гітари — «купити чи заснувати бренд?» у форматі порівняння.",
    images: ["https://freelance-ua.agency/media/cases/f5-guitars-youtube/f5-guitars-youtube-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
