import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { SiteShell } from "@/components/layout/site-shell";
import { toLocale } from "@/i18n/routing";

/** Public and student pages share the header, bottom navigation and skip link. */
export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Every layout and page must set the locale, otherwise next-intl reads request headers
  // and the page can no longer be pre-rendered as static HTML.
  setRequestLocale(toLocale((await params).locale));
  return <SiteShell>{children}</SiteShell>;
}
