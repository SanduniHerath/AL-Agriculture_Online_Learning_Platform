"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@al-agri/shared";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

/**
 * සිං / EN switch. Keeps the student on the same page (and query string) in the other
 * language. The choice is remembered in the NEXT_LOCALE cookie for a year.
 */
export function LanguageSwitch({ className }: { className?: string }) {
  const t = useTranslations("language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    if (next === locale) return;
    const query = Object.fromEntries(new URLSearchParams(window.location.search));
    startTransition(() => {
      router.replace({ pathname, query }, { locale: next, scroll: false });
    });
  }

  const labels: Record<Locale, { short: string; full: string }> = {
    si: { short: t("siShort"), full: t("si") },
    en: { short: t("enShort"), full: t("en") },
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      aria-busy={isPending || undefined}
      className={cn(
        "inline-flex min-h-12 items-center gap-1 rounded-badge border bg-surface p-1 shadow-sm",
        className,
      )}
    >
      <span className="pl-1 text-text-muted">
        <Icon name="globe" size={17} />
      </span>
      {routing.locales.map((code, index) => {
        const active = code === locale;
        return (
          <span key={code} className="contents">
            {index > 0 && (
              <span aria-hidden="true" className="text-text-muted">
                /
              </span>
            )}
            <button
              type="button"
              lang={code}
              aria-pressed={active}
              aria-label={t("switchTo", { language: labels[code].full })}
              onClick={() => switchTo(code)}
              className={cn(
                "min-h-10 rounded-full px-3 py-1 font-semibold text-primary transition hover:bg-primary-soft",
                active && "bg-primary text-on-primary hover:bg-primary",
              )}
            >
              {labels[code].short}
            </button>
          </span>
        );
      })}
    </div>
  );
}
