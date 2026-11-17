import type { ReactNode } from "react";

/** Icon set from the design (24×24 stroke icons). Decorative: always hidden from screen readers. */
export type IconName =
  | "home"
  | "book"
  | "paper"
  | "user"
  | "globe"
  | "play"
  | "lock"
  | "unlock"
  | "download"
  | "check"
  | "leaf"
  | "chevron"
  | "arrow"
  | "arrow-left"
  | "moon"
  | "sun"
  | "message"
  | "search"
  | "close";

const paths: Record<IconName, ReactNode> = {
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10M9 20v-6h6v6" />
    </>
  ),
  book: (
    <>
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H11v18H6.5A2.5 2.5 0 0 0 4 22Z" />
      <path d="M20 4.5A2.5 2.5 0 0 0 17.5 2H13v18h4.5A2.5 2.5 0 0 1 20 22Z" />
    </>
  ),
  paper: (
    <>
      <path d="M6 2h9l4 4v16H6Z" />
      <path d="M14 2v5h5M9 13h7M9 17h7" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 22a8 8 0 0 1 16 0" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </>
  ),
  play: <path d="m9 7 8 5-8 5Z" />,
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  unlock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M16 10V7a4 4 0 0 0-7.5-2" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12M7 10l5 5 5-5" />
      <path d="M4 20h16" />
    </>
  ),
  check: <path d="m4 12 5 5L20 6" />,
  leaf: (
    <>
      <path d="M5 21c4-8 9-12 16-16-1 9-6 14-13 14" />
      <path d="M5 21c1-6 5-10 10-13" />
    </>
  ),
  chevron: <path d="m8 10 4 4 4-4" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-left": <path d="M19 12H5M11 6l-6 6 6 6" />,
  moon: <path d="M21 13a8 8 0 1 1-10-10 7 7 0 0 0 10 10Z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-5A8 8 0 1 1 21 15Z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
};

export function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
