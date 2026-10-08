"use client";

import { createContext, useContext, useCallback, useEffect, type ReactNode } from "react";
import type { Locale } from "./i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLocale = "uk",
  messages,
}: {
  children: ReactNode;
  initialLocale?: Locale;
  messages: Record<string, string>;
}) {
  const locale = initialLocale;

  const setLocale = useCallback(
    (newLocale: Locale) => {
      if (newLocale === locale) return;
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; samesite=lax`;
      window.location.reload();
    },
    [locale],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key: string): string => {
      return messages[key] || key;
    },
    [messages],
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
