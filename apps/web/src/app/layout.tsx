import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "A/L Agriculture Online Learning Platform",
  description: "Learn G.C.E. A/L Agricultural Science from home.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="si">
      <body>{children}</body>
    </html>
  );
}
