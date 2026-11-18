import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";

export type BadgeVariant =
  "neutral" | "dark" | "outline" | "free" | "purchased" | "locked" | "price" | "new" | "error";

const variants: Record<BadgeVariant, string> = {
  neutral: "bg-primary-soft text-primary",
  dark: "bg-primary text-on-primary",
  outline: "border border-border bg-transparent text-text",
  free: "bg-[color-mix(in_srgb,var(--color-secondary)_15%,var(--color-surface))] text-primary",
  purchased: "bg-[color-mix(in_srgb,var(--color-secondary)_18%,var(--color-surface))] text-primary",
  locked: "bg-[color-mix(in_srgb,var(--color-locked)_15%,var(--color-surface))] text-text-muted",
  price: "border border-accent bg-transparent text-text",
  new: "bg-[color-mix(in_srgb,var(--color-info)_12%,var(--color-surface))] text-info",
  error: "bg-[color-mix(in_srgb,var(--color-error)_12%,var(--color-surface))] text-error",
};

export function Badge({
  children,
  variant = "neutral",
  icon,
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  icon?: IconName;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-badge px-3 py-1 text-sm font-semibold",
        variants[variant],
        className,
      )}
    >
      {icon && <Icon name={icon} size={15} />}
      {children}
    </span>
  );
}
