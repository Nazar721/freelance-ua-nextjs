"use client";

import { createContext, useContext, useCallback, type ReactNode } from "react";
import type { Locale } from "./i18n";

interface LanguageContextType {
  locale: Locale;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * The language is defined by the URL (see lib/i18n-routes.ts and proxy.ts).
 * The provider only carries the locale of the current URL and the matching
 * dictionary — switching language is navigation to the counterpart URL, not
 * a cookie + reload of the same address.
 */
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

  const t = useCallback(
    (key: string): string => {
      return messages[key] || key;
    },
    [messages],
  );

  return (
    <LanguageContext.Provider value={{ locale, t }}>
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
