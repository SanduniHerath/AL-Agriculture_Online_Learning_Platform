import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { BottomNav } from "./bottom-nav";
import { SiteHeader } from "./site-header";

/**
 * Page frame for the public and student site: skip link, sticky header, page content and
 * (on phones) the bottom navigation. Pages render their own <main id="main">.
 */
export function SiteShell({
  children,
  showBottomNav = true,
}: {
  children: ReactNode;
  showBottomNav?: boolean;
}) {
  const t = useTranslations("common");
  return (
    <div className={cn("page-shell", !showBottomNav && "pb-0")}>
      <a
        href="#main"
        className="sr-only z-50 rounded-button bg-primary px-4 py-3 text-on-primary focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        {t("skipToContent")}
      </a>
      <SiteHeader />
      {children}
      {showBottomNav && <BottomNav />}
    </div>
  );
}
