import type { IconName } from "@/components/ui/icon";

/** Main navigation, shared by the top bar (desktop) and the bottom bar (mobile). */
export const NAV_ITEMS = [
  { key: "home", href: "/", icon: "home" },
  { key: "units", href: "/units", icon: "book" },
  { key: "pastPapers", href: "/past-papers", icon: "paper" },
  { key: "account", href: "/account", icon: "user" },
] as const satisfies ReadonlyArray<{
  key: "home" | "units" | "pastPapers" | "account";
  href: string;
  icon: IconName;
}>;

/** "/" only matches the home page; other items also match their sub-pages. */
export function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
