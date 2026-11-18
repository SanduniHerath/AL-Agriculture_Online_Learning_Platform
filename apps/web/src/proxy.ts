import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { LOCALE_COOKIE, routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

/**
 * Next.js proxy (formerly "middleware"): sends "/" and un-prefixed paths to /si/... or /en/....
 *
 * Language choice order:
 *   1. the locale in the URL,
 *   2. the NEXT_LOCALE cookie (set when the student switches language),
 *   3. otherwise Sinhala.
 * The browser's Accept-Language header is deliberately ignored for first-time visitors:
 * many Sinhala-speaking students use phones set to English, and the site must open in
 * Sinhala by default (see docs/decisions.md).
 */
export default function proxy(request: NextRequest) {
  if (!request.cookies.has(LOCALE_COOKIE)) {
    const headers = new Headers(request.headers);
    headers.delete("accept-language");
    return handleI18nRouting(new NextRequest(request, { headers }));
  }
  return handleI18nRouting(request);
}

export const config = {
  // Everything except API routes, Next.js internals and files with an extension (images, etc.).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
