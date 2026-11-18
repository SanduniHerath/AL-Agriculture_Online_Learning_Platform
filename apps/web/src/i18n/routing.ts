import { DEFAULT_LOCALE, LOCALES, type Locale } from "@al-agri/shared";
import { hasLocale } from "next-intl";
import { defineRouting } from "next-intl/routing";

/**
 * URL structure: every page lives under a locale prefix - /si/... (default) and /en/....
 * To add Tamil later: add "ta" to LOCALES in packages/shared and create messages/ta.json.
 */
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
  // Remember the student's language choice on this device for a year.
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  },
});

/** The cookie name the proxy checks to know whether a language was chosen before. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Narrows the `[locale]` route param (always a string to Next.js) to a supported locale.
 * Unknown values never reach pages - the locale layout returns 404 first - so falling back
 * to the default is only a type-level safety net.
 */
export function toLocale(value: string): Locale {
  return hasLocale(routing.locales, value) ? value : routing.defaultLocale;
}
