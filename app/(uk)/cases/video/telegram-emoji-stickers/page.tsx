import type { Metadata } from "next";
import CasePage from "@/components/cases/CasePage";
import { caseMetadata } from "@/lib/case-page";

// Reworked case page (Package 4): body, metadata and related work all come
// from one record in data/case-records/.
export async function generateMetadata(): Promise<Metadata> {
  return caseMetadata("video/telegram-emoji-stickers", "uk");
}

export default function TelegramEmojiStickersCasePage() {
  return <CasePage id="video/telegram-emoji-stickers" locale="uk" />;
}
