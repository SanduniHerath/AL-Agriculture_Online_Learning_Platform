import {
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  useState,
} from "react";
import type { Language, TranslationKey } from "../translations";

export type TFunction = (
  key: TranslationKey,
  variables?: Record<string, string | number>,
) => string;
export type UserState = "visitor" | "logged" | "purchased";
export type Theme = "light" | "dark";

type IconName =
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
  | "moon"
  | "sun"
  | "message";

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
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
    moon: <path d="M21 13a8 8 0 1 1-10-10 7 7 0 0 0 10 10Z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-5A8 8 0 1 1 21 15Z" />,
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "text" | "ghost";
  loading?: boolean;
  icon?: IconName;
  children: ReactNode;
};
export function Button({
  variant = "primary",
  loading,
  icon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[var(--color-accent)] text-[var(--color-on-accent)] border-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] hover:border-[var(--color-accent-hover)] active:scale-[0.98]",
    secondary:
      "bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:scale-[0.98]",
    outline:
      "bg-transparent text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] active:scale-[0.98]",
    text: "bg-transparent text-[var(--color-primary)] border-transparent hover:bg-[var(--color-primary-soft)]",
    ghost:
      "bg-transparent text-[var(--color-text)] border-transparent hover:bg-[var(--color-primary-soft)]",
  };
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-button)] border px-5 py-3 text-[length:var(--type-button)] font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="size-5 animate-spin rounded-full border-2 border-current border-r-transparent" />
      ) : icon ? (
        <Icon name={icon} />
      ) : null}
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  children,
  variant = "primary",
  icon,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonProps["variant"];
  icon?: IconName;
  className?: string;
}) {
  const variants = {
    primary:
      "bg-[var(--color-accent)] text-[var(--color-on-accent)] border-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] hover:border-[var(--color-accent-hover)]",
    secondary:
      "bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]",
    outline:
      "bg-transparent text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary-soft)]",
    text: "bg-transparent text-[var(--color-primary)] border-transparent hover:bg-[var(--color-primary-soft)]",
    ghost:
      "bg-transparent text-[var(--color-text)] border-transparent hover:bg-[var(--color-primary-soft)]",
  };
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-button)] border px-5 py-3 text-[length:var(--type-button)] font-semibold transition duration-200 active:scale-[0.98] ${variants[variant]} ${className}`}
    >
      {icon && <Icon name={icon} />}
      {children}
    </a>
  );
}

export function Input({
  error,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <div className="grid gap-1">
      <input
        className={`field-control px-4 ${error ? "border-[var(--color-error)]" : ""} ${className}`}
        {...props}
      />
      {error && (
        <span className="flex items-center gap-1 text-sm text-[var(--color-error)]">
          <span aria-hidden="true">!</span>
          {error}
        </span>
      )}
    </div>
  );
}

export function PhoneInput({
  className = "",
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  return (
    <div className="field-control flex overflow-hidden">
      <span className="flex min-w-16 items-center justify-center border-r bg-[var(--color-primary-soft)] px-3 font-semibold text-[var(--color-primary)]">
        +94
      </span>
      <input
        type="tel"
        className={`min-h-12 min-w-0 flex-1 bg-transparent px-4 text-[var(--color-text)] outline-none ${className}`}
        {...props}
      />
    </div>
  );
}

export function PasswordInput({
  t,
  className = "",
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { t: TFunction }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="field-control flex overflow-hidden">
      <input
        type={visible ? "text" : "password"}
        className={`min-h-12 min-w-0 flex-1 bg-transparent px-4 text-[var(--color-text)] outline-none ${className}`}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        className="min-h-12 rounded-none border-0 px-3 text-sm"
        aria-label={t(visible ? "hidePassword" : "showPassword")}
        onClick={() => setVisible((value) => !value)}
      >
        {t(visible ? "hidePassword" : "showPassword")}
      </Button>
    </div>
  );
}

export function LanguageSwitch({
  language,
  onChange,
  t,
}: {
  language: Language;
  onChange: (language: Language) => void;
  t: TFunction;
}) {
  return (
    <div
      className="inline-flex min-h-12 items-center gap-1 rounded-[var(--radius-badge)] border bg-[var(--color-surface)] p-1 shadow-[var(--shadow-sm)]"
      aria-label={t("languageLabel")}
    >
      <Icon name="globe" size={17} />
      <Button
        variant="text"
        className={`min-h-10 rounded-full px-3 py-1 ${language === "si" ? "bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary)]" : ""}`}
        onClick={() => onChange("si")}
      >
        {t("languageSinhala")}
      </Button>
      <span aria-hidden="true">/</span>
      <Button
        variant="text"
        className={`min-h-10 rounded-full px-3 py-1 ${language === "en" ? "bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary)]" : ""}`}
        onClick={() => onChange("en")}
      >
        {t("languageEnglish")}
      </Button>
    </div>
  );
}

const navItems: Array<{ key: TranslationKey; href: string; icon: IconName }> = [
  { key: "navHome", href: "/", icon: "home" },
  { key: "navUnits", href: "/units", icon: "book" },
  { key: "navPapers", href: "/past-papers", icon: "paper" },
  { key: "navAccount", href: "/account", icon: "user" },
];

export function TopNav({
  language,
  onLanguage,
  t,
  path,
}: {
  language: Language;
  onLanguage: (language: Language) => void;
  t: TFunction;
  path: string;
}) {
  return (
    <header className="sticky top-0 z-30 border-b bg-[color-mix(in_srgb,var(--color-surface)_94%,transparent)] shadow-[var(--shadow-sm)] backdrop-blur-md">
      <div className="container-main flex min-h-16 items-center justify-between gap-3">
        <a
          className="flex min-h-12 items-center gap-2 font-bold text-[var(--color-primary)]"
          href="/"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-[var(--color-primary-soft)]">
            <Icon name="leaf" />
          </span>
          <span className="hidden sm:inline">{t("brand")}</span>
          <span className="sm:hidden">{t("brandShort")}</span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`min-h-12 rounded-[var(--radius-button)] px-4 py-3 font-semibold transition ${
                (item.href === "/" ? path === "/" : path.startsWith(item.href))
                  ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]"
              }`}
            >
              {t(item.key)}
            </a>
          ))}
        </nav>
        <LanguageSwitch language={language} onChange={onLanguage} t={t} />
      </div>
    </header>
  );
}

export function BottomNav({ t, path }: { t: TFunction; path: string }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t bg-[color-mix(in_srgb,var(--color-surface)_96%,transparent)] pb-[env(safe-area-inset-bottom)] shadow-[var(--shadow-nav)] backdrop-blur-md lg:hidden">
      {navItems.map((item) => (
        <a
          key={item.key}
          href={item.href}
          className={`flex min-h-18 flex-col items-center justify-center gap-1 px-1 py-2 text-center text-xs font-semibold transition ${
            (item.href === "/" ? path === "/" : path.startsWith(item.href))
              ? "text-[var(--color-primary)]"
              : "text-[var(--color-text-muted)]"
          }`}
        >
          <Icon name={item.icon} size={20} />
          <span>{t(item.key)}</span>
        </a>
      ))}
    </nav>
  );
}

export function Badge({
  children,
  variant = "neutral",
  icon,
}: {
  children: ReactNode;
  variant?:
    | "neutral"
    | "dark"
    | "outline"
    | "free"
    | "purchased"
    | "locked"
    | "price"
    | "new"
    | "error";
  icon?: IconName;
}) {
  const classes = {
    neutral: "bg-[var(--color-primary-soft)] text-[var(--color-primary)]",
    dark: "bg-[var(--color-primary)] text-[var(--color-on-primary)]",
    outline: "border border-[var(--color-border)] bg-transparent text-[var(--color-text)]",
    free: "bg-[color-mix(in_srgb,var(--color-secondary)_15%,var(--color-surface))] text-[var(--color-primary)]",
    purchased:
      "bg-[color-mix(in_srgb,var(--color-secondary)_18%,var(--color-surface))] text-[var(--color-primary)]",
    locked:
      "bg-[color-mix(in_srgb,var(--color-locked)_15%,var(--color-surface))] text-[var(--color-text-muted)]",
    price: "border border-[var(--color-accent)] bg-transparent text-[var(--color-text)]",
    new: "bg-[color-mix(in_srgb,var(--color-info)_12%,var(--color-surface))] text-[var(--color-info)]",
    error:
      "bg-[color-mix(in_srgb,var(--color-error)_12%,var(--color-surface))] text-[var(--color-error)]",
  }[variant];
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-[var(--radius-badge)] px-3 py-1 text-sm font-semibold ${classes}`}
    >
      {icon && <Icon name={icon} size={15} />}
      {children}
    </span>
  );
}

export function Annotation({ children }: { children: ReactNode }) {
  return (
    <aside className="annotation">
      <span className="font-bold">i</span>
      <span>{children}</span>
    </aside>
  );
}

export function UnitCard({
  number,
  title,
  videos,
  status,
  price,
  progress,
  t,
  href,
}: {
  number: number;
  title: string;
  videos: number;
  status: "free" | "locked" | "purchased";
  price: string;
  progress?: number;
  t: TFunction;
  href: string;
}) {
  return (
    <a
      href={href}
      className="card group flex min-h-72 flex-col p-5 transition duration-200 hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-[var(--shadow-md)]"
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <span className="font-[var(--font-heading-en)] text-5xl font-bold leading-none tabular-nums text-[var(--color-primary)]">
          {String(number).padStart(2, "0")}
        </span>
        {status === "free" ? (
          <Badge variant="free" icon="leaf">
            {t("freeResources")}
          </Badge>
        ) : status === "purchased" ? (
          <Badge icon="check" variant="purchased">
            {t("purchased")}
          </Badge>
        ) : (
          <Badge icon="lock" variant="locked">
            {t("lockedPrice", { price })}
          </Badge>
        )}
      </div>
      <p className="eyebrow">{t("unitLabel", { number: String(number).padStart(2, "0") })}</p>
      <h2 className="heading mt-2 line-clamp-2 text-xl">{title}</h2>
      <p className="mt-2 text-sm text-[var(--wf-muted)]">
        {t("subpartsVideos", { count: videos })}
      </p>
      {status !== "purchased" && (
        <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-[var(--color-secondary)]">
          <Icon name="download" size={16} />
          {t("freeResources")}
        </p>
      )}
      {status === "purchased" && typeof progress === "number" && (
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-sm">
            <span>{t("progressComplete", { percent: progress })}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[var(--color-primary-soft)]">
            <div
              className="h-full rounded-full bg-[var(--color-secondary)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      <span className="mt-auto flex min-h-12 items-center justify-between border-t pt-4 font-semibold text-[var(--color-primary)]">
        {t("viewUnit")}
        <Icon name="arrow" />
      </span>
    </a>
  );
}

export function PDFDownloadItem({
  title,
  meta,
  size,
  t,
}: {
  title: string;
  meta: string;
  size: string;
  t: TFunction;
}) {
  const [downloaded, setDownloaded] = useState(false);
  return (
    <article className="flex flex-col gap-4 rounded-[var(--radius-card)] border bg-[var(--color-surface)] p-4 shadow-[var(--shadow-sm)] sm:flex-row sm:items-center">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-button)] bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
        <Icon name="paper" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="heading text-lg">{title}</h3>
          <Badge variant="free" icon="leaf">
            {t("free")}
          </Badge>
        </div>
        <p className="text-sm text-[var(--wf-muted)]">
          {meta} · {size}
        </p>
      </div>
      <LinkButton href="/pdf-viewer" variant="text">
        {t("openDocument")}
      </LinkButton>
      <Button
        variant="outline"
        icon={downloaded ? "check" : "download"}
        onClick={() => setDownloaded(true)}
      >
        {downloaded ? t("downloaded") : t("download")}
      </Button>
    </article>
  );
}

export function VideoListItem({
  title,
  duration,
  unlocked,
  watched = false,
  t,
}: {
  title: string;
  duration: string;
  unlocked: boolean;
  watched?: boolean;
  t: TFunction;
}) {
  return (
    <div
      className={`flex items-center gap-4 border-t py-4 first:border-t-0 ${unlocked ? "" : "opacity-65"}`}
    >
      <span className="relative flex aspect-video w-24 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-video)] bg-[var(--color-primary-soft)] text-[var(--color-primary)] sm:w-28">
        <Icon name={watched ? "check" : unlocked ? "play" : "lock"} size={20} />
        <span className="absolute bottom-1 right-1 rounded bg-[var(--color-primary)] px-1.5 py-0.5 text-[0.65rem] font-bold text-[var(--color-on-primary)]">
          {duration}
        </span>
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-[var(--wf-muted)]">
          {watched ? t("watched") : unlocked ? t("readyToWatch") : t("locked")}
        </p>
      </div>
      <span className="hidden items-center gap-1 text-sm font-bold text-[var(--color-primary)] sm:flex">
        <Icon name={watched ? "check" : unlocked ? "play" : "lock"} size={16} />
        {watched ? t("watched") : unlocked ? t("play") : t("locked")}
      </span>
    </div>
  );
}

export function SubPartAccordion({
  number,
  title,
  unlocked,
  defaultOpen,
  t,
}: {
  number: string;
  title: string;
  unlocked: boolean;
  defaultOpen?: boolean;
  t: TFunction;
}) {
  return (
    <details
      className="card overflow-hidden transition duration-200 open:border-[var(--color-primary)]"
      open={defaultOpen}
    >
      <summary className="flex min-h-20 cursor-pointer list-none items-center gap-3 p-4 sm:p-5">
        <span className="flex min-h-11 min-w-12 shrink-0 items-center justify-center rounded-[var(--radius-button)] bg-[var(--color-primary-soft)] px-2 font-bold tabular-nums text-[var(--color-primary)]">
          {number}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="heading text-lg">{t("subpartTitle", { number, title })}</h3>
          <p className="text-sm text-[var(--wf-muted)]">
            {t("lessonsCount", { count: 3 })} · 40 min
          </p>
        </div>
        <span className={unlocked ? "text-[var(--color-secondary)]" : "text-[var(--color-locked)]"}>
          <Icon name={unlocked ? "check" : "lock"} />
        </span>
        <span className="accordion-chevron">
          <Icon name="chevron" />
        </span>
      </summary>
      <div className="border-t px-5">
        <VideoListItem
          title={t("video1")}
          duration="12:40"
          unlocked={unlocked}
          watched={unlocked}
          t={t}
        />
        <VideoListItem title={t("video2")} duration="18:15" unlocked={unlocked} t={t} />
        <VideoListItem title={t("video3")} duration="09:25" unlocked={unlocked} t={t} />
      </div>
    </details>
  );
}

export function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: Array<{ id: string; label: string; count?: number }>;
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div
      className="flex gap-1 overflow-x-auto rounded-[var(--radius-button)] bg-[var(--color-primary-soft)] p-1 lg:rounded-none lg:border-b lg:bg-transparent lg:p-0"
      role="tablist"
    >
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="text"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={`min-w-fit flex-1 lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-b-2 ${active === tab.id ? "bg-[var(--color-surface)] text-[var(--color-primary)] shadow-[var(--shadow-sm)] lg:border-b-[var(--color-primary)] lg:bg-transparent lg:shadow-none" : "lg:border-b-transparent"}`}
        >
          {tab.label}
          {typeof tab.count === "number" && (
            <span className="rounded-full bg-[var(--color-surface)] px-2 py-0.5 text-xs text-[var(--color-text-muted)]">
              {tab.count}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}

export function StickyUnlockBar({
  state,
  t,
  onUnlock,
}: {
  state: UserState;
  t: TFunction;
  onUnlock: () => void;
}) {
  if (state === "purchased") return null;
  return (
    <div className="fixed inset-x-0 bottom-[4.5rem] z-20 border-t bg-[var(--color-surface)] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[var(--shadow-md)] lg:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-[var(--color-text-muted)]">{t("lifetimeAccess")}</p>
          <p className="heading text-lg">{t("unitPrice")}</p>
        </div>
        <Button icon={state === "visitor" ? "lock" : "unlock"} onClick={onUnlock}>
          {state === "visitor" ? t("registerButton") : t("unlockUnitShort")}
        </Button>
      </div>
    </div>
  );
}

export function Modal({
  open,
  title,
  children,
  onClose,
  t,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  t: TFunction;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-end bg-[var(--color-overlay)] p-0 sm:place-items-center sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="card w-full max-w-lg rounded-b-none p-6 sm:rounded-[var(--radius-card)]">
        <div className="flex items-center justify-between gap-3">
          <h2 className="heading text-xl">{title}</h2>
          <Button variant="text" onClick={onClose}>
            {t("close")}
          </Button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

export function Toast({ children }: { children: ReactNode }) {
  return (
    <div
      role="status"
      className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-[var(--radius-button)] bg-[var(--color-primary)] px-4 py-3 text-[var(--color-on-primary)] shadow-[var(--shadow-md)]"
    >
      {children}
    </div>
  );
}
export function EmptyState({ t }: { t: TFunction }) {
  return (
    <div className="card grid place-items-center gap-3 p-10 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
        <Icon name="book" size={32} />
      </span>
      <p className="heading text-xl">{t("emptyTitle")}</p>
    </div>
  );
}
export function SkeletonLoader() {
  return (
    <div className="card animate-pulse space-y-4 p-5">
      <div className="h-5 w-1/3 rounded bg-[var(--wf-surface-muted)]" />
      <div className="h-4 w-full rounded bg-[var(--wf-surface-muted)]" />
      <div className="h-4 w-3/4 rounded bg-[var(--wf-surface-muted)]" />
    </div>
  );
}
export function UploadWidget({ t }: { t: TFunction }) {
  return (
    <Button
      variant="outline"
      icon="download"
      className="min-h-28 w-full border-dashed bg-[var(--color-primary-soft)]"
    >
      {t("uploadFile")}
    </Button>
  );
}
export function BilingualInput({ t }: { t: TFunction }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <label className="grid gap-2 font-semibold">
        {t("englishTitle")}
        <Input aria-label={t("englishTitle")} placeholder={t("englishTitle")} />
      </label>
      <label className="grid gap-2 font-semibold">
        {t("sinhalaTitle")}
        <Input aria-label={t("sinhalaTitle")} placeholder={t("sinhalaTitle")} />
      </label>
    </div>
  );
}
export function AdminTable({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border bg-[var(--color-surface)] shadow-[var(--shadow-sm)] [&_thead]:sticky [&_thead]:top-0 [&_tbody_tr:nth-child(even)]:bg-[color-mix(in_srgb,var(--color-primary-soft)_45%,transparent)]">
      {children}
    </div>
  );
}
