"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";
import { isActive, NAV_ITEMS } from "./nav-items";

/** Fixed bottom tab bar on phones and tablets (hidden from the `lg` breakpoint). */
export function BottomNav() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <nav
      aria-label={t("common.menu")}
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t bg-[color-mix(in_srgb,var(--color-surface)_96%,transparent)] pb-[env(safe-area-inset-bottom)] shadow-nav backdrop-blur-md lg:hidden"
    >
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.key}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-h-18 flex-col items-center justify-center gap-1 px-1 py-2 text-center text-xs font-semibold transition",
              active ? "text-primary" : "text-text-muted",
            )}
          >
            <Icon name={item.icon} size={20} />
            <span>{t(`nav.${item.key}`)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
