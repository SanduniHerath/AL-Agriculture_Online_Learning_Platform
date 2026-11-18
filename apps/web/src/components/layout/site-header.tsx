"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";
import { LanguageSwitch } from "./language-switch";
import { isActive, NAV_ITEMS } from "./nav-items";

/** Sticky top bar: brand, desktop navigation and the language switch. */
export function SiteHeader() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b bg-[color-mix(in_srgb,var(--color-surface)_94%,transparent)] shadow-sm backdrop-blur-md">
      <div className="container-main flex min-h-16 items-center justify-between gap-3">
        <Link href="/" className="flex min-h-12 items-center gap-2 font-bold text-primary">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary-soft">
            <Icon name="leaf" />
          </span>
          <span className="hidden sm:inline">{t("common.brand")}</span>
          <span className="sm:hidden">{t("common.brandShort")}</span>
        </Link>
        <nav aria-label={t("common.menu")} className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "min-h-12 rounded-button px-4 py-3 font-semibold transition",
                  active
                    ? "bg-primary-soft text-primary"
                    : "text-text-muted hover:bg-primary-soft hover:text-primary",
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            );
          })}
        </nav>
        <LanguageSwitch />
      </div>
    </header>
  );
}
