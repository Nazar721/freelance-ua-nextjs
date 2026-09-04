import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Обробка зйомки BARVY interior — Freelance UA",
  description: "Кольорокорекція та ретуш інтер'єрної зйомки для студії дизайну інтер'єрів BARVY interior: прихожа, гардеробна, спальня, санвузли. До/після.",
  alternates: {
    canonical: "/cases/design/barvy-interior",
  },
  openGraph: {
    title: "Обробка зйомки BARVY interior — Freelance UA",
    description: "Кольорокорекція та ретуш інтер'єрної зйомки: тепла гама, проявлене світло, чисті деталі. До/після.",
    images: ["https://freelance-ua.agency/media/cases/barvy-interior/preview.jpg"],
  },
};

export default function BarvyInteriorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
