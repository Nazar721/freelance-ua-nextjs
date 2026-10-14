import { Space_Grotesk, Unbounded } from "next/font/google";

// Fonts are instantiated once and shared by both root layouts so the two
// trees render identical typography.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-syne",
  display: "swap",
});

export const rootHtmlClass = `${spaceGrotesk.variable} ${unbounded.variable}`;
