"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  initialTheme = "dark",
}: {
  children: ReactNode;
  initialTheme?: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof document !== "undefined") {
      const attr = document.documentElement.dataset.theme;
      if (attr === "light" || attr === "dark") return attr;
    }
    return initialTheme;
  });

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState((prev) => {
      if (prev === newTheme) return prev;
      document.cookie = `SITE_THEME=${newTheme}; path=/; max-age=31536000; samesite=lax`;
      return newTheme;
    });
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
