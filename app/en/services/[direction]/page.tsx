import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DirectionPage from "@/components/directions/DirectionPage";
import { DIRECTIONS, isDirection } from "@/lib/directions";
import { localizedMetadata } from "@/lib/seo";
import { translations } from "@/lib/i18n";

export function generateStaticParams() {
  return Object.keys(DIRECTIONS).map((direction) => ({ direction }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ direction: string }>;
}): Promise<Metadata> {
  const { direction } = await params;
  if (!isDirection(direction)) return {};
  return localizedMetadata({
    locale: "en",
    uaPath: `/services/${direction}`,
    title: translations.en[`meta.services.${direction}.title`],
    description: translations.en[`meta.services.${direction}.description`],
    ogImage: "/og-freelance-ua-18d31c182c.jpg",
  });
}

export default async function EnServicePage({
  params,
}: {
  params: Promise<{ direction: string }>;
}) {
  const { direction } = await params;
  if (!isDirection(direction)) notFound();
  return <DirectionPage direction={direction} />;
}
