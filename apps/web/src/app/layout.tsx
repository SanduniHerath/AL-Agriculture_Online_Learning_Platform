import type { ReactNode } from "react";

/**
 * The real root layout (with <html> and <body>) is app/[locale]/layout.tsx, because the
 * <html lang> depends on the locale. This file only passes children through; Next.js needs
 * it so that app/not-found.tsx can exist for paths outside any locale.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
