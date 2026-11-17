import { Abhaya_Libre, Inter, Noto_Sans_Sinhala, Poppins } from "next/font/google";

/**
 * Fonts from the design system, self-hosted by next/font (no request to Google at runtime).
 * Each exposes a CSS variable that globals.css maps to the design tokens.
 */

/** English headings. */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

/** English body text. */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/** All Sinhala text (body and headings). Includes Latin so mixed text renders consistently. */
export const notoSansSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sinhala",
});

/**
 * Sinhala display font. Defined by the design but not used by any screen yet, so it is
 * not preloaded - browsers only download it if some text actually uses it.
 */
export const abhayaLibre = Abhaya_Libre({
  subsets: ["sinhala", "latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-abhaya",
  preload: false,
});

export const fontVariables = [poppins, inter, notoSansSinhala, abhayaLibre]
  .map((font) => font.variable)
  .join(" ");
