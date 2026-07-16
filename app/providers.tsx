"use client";

import { type ReactNode } from "react";
import { LanguageProvider } from "@/lib/LanguageContext";
import { siteConfig } from "@/config/site";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      {children}
      <a
        href={siteConfig.telegram.consultationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#6366F1] text-white font-semibold px-5 py-3 rounded-full shadow-lg transition-colors duration-300 hover:bg-[#4F46E5]"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.47c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.948l-2.937-.918c-.638-.198-.65-.638.136-.943l11.47-4.42c.532-.194.998.13.633.582z"/>
        </svg>
        Написати в Telegram
      </a>
    </LanguageProvider>
  );
}
