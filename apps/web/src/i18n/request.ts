import { TIMEZONE } from "@al-agri/shared";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/** Loads the messages for the current request's locale (server side). */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    timeZone: TIMEZONE,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
