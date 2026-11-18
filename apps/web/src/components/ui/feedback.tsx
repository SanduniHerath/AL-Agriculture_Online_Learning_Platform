import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";

/** Short confirmation message at the bottom of the screen ("Saved", "Copied"). */
export function Toast({ children }: { children: ReactNode }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-button bg-primary px-4 py-3 text-on-primary shadow-md lg:bottom-6"
    >
      {children}
    </div>
  );
}

/** Shown when a list has nothing in it yet (no purchases, no search results...). */
export function EmptyState({
  title,
  description,
  action,
  icon = "book",
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: IconName;
  className?: string;
}) {
  return (
    <div className={cn("card grid place-items-center gap-3 p-10 text-center", className)}>
      <span className="flex size-16 items-center justify-center rounded-full bg-primary-soft text-primary">
        <Icon name={icon} size={32} />
      </span>
      <p className="heading text-xl">{title}</p>
      {description && <p className="max-w-md text-text-muted">{description}</p>}
      {action}
    </div>
  );
}

/** Grey placeholder blocks shown while content loads; keeps layout from jumping. */
export function SkeletonLoader({ label, className }: { label: string; className?: string }) {
  return (
    <div role="status" className={cn("card animate-pulse space-y-4 p-5", className)}>
      <span className="sr-only">{label}</span>
      <div aria-hidden="true" className="h-5 w-1/3 rounded bg-primary-soft" />
      <div aria-hidden="true" className="h-4 w-full rounded bg-primary-soft" />
      <div aria-hidden="true" className="h-4 w-3/4 rounded bg-primary-soft" />
    </div>
  );
}

/** Image / video placeholder with the design's organic background. */
export function MediaPlaceholder({
  label,
  kind = "image",
  className,
}: {
  label: string;
  kind?: "image" | "video";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "placeholder w-full rounded-card",
        kind === "video" ? "aspect-video" : "aspect-[4/5]",
        className,
      )}
    >
      <div className="flex max-w-[75%] flex-col items-center gap-2 text-center text-sm font-semibold">
        <Icon name={kind === "video" ? "play" : "user"} size={kind === "video" ? 32 : 48} />
        <span>{label}</span>
      </div>
    </div>
  );
}

/** Informational note (replaces the wireframe "annotation" style for real user-facing info). */
export function InfoNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <aside
      className={cn(
        "flex items-start gap-2 rounded-button border border-l-[3px] border-[color-mix(in_srgb,var(--color-info)_24%,var(--color-border))] border-l-info bg-[color-mix(in_srgb,var(--color-info)_7%,var(--color-surface))] p-3 text-caption text-text-muted",
        className,
      )}
    >
      <Icon name="lock" size={16} className="mt-0.5 shrink-0 text-info" />
      <span>{children}</span>
    </aside>
  );
}
