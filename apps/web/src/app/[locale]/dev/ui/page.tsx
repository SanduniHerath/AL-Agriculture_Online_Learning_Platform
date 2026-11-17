import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SiteShell } from "@/components/layout/site-shell";
import { UiGallery } from "@/components/dev/ui-gallery";
import { toLocale } from "@/i18n/routing";

/**
 * Development-only component gallery (replaces the wireframe's /screens index).
 * Returns 404 in production builds and is never indexed.
 */
export const metadata: Metadata = {
  title: "UI gallery",
  robots: { index: false, follow: false },
};

export default async function UiGalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { locale } = await params;
  setRequestLocale(toLocale(locale));
  return (
    <SiteShell>
      <UiGallery />
    </SiteShell>
  );
}
