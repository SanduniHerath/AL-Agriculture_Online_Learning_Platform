import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";

export type ButtonVariant = "primary" | "secondary" | "outline" | "text" | "ghost";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-button border px-5 py-3 text-button font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-45 aria-disabled:pointer-events-none aria-disabled:opacity-45";

const variants: Record<ButtonVariant, string> = {
  // Amber call-to-action (buy, register, play)
  primary:
    "border-accent bg-accent text-on-accent hover:border-accent-hover hover:bg-accent-hover active:scale-[0.98]",
  // Solid green
  secondary: "border-primary bg-primary text-on-primary hover:bg-primary-hover active:scale-[0.98]",
  outline: "border-primary bg-transparent text-primary hover:bg-primary-soft active:scale-[0.98]",
  text: "border-transparent bg-transparent text-primary hover:bg-primary-soft",
  ghost: "border-transparent bg-transparent text-text hover:bg-primary-soft",
};

/** Class string for anything that should look like a button (also used by links). */
export function buttonClasses(variant: ButtonVariant = "primary", className?: string): string {
  return cn(base, variants[variant], className);
}

function Content({
  icon,
  iconAfter,
  loading,
  children,
}: {
  icon?: IconName | undefined;
  iconAfter?: IconName | undefined;
  loading?: boolean | undefined;
  children: ReactNode;
}) {
  return (
    <>
      {loading ? (
        <span
          aria-hidden="true"
          className="size-5 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : icon ? (
        <Icon name={icon} />
      ) : null}
      {children}
      {iconAfter && <Icon name={iconAfter} />}
    </>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  /** Shows a spinner and disables the button while an action is running. */
  loading?: boolean;
  icon?: IconName;
  iconAfter?: IconName;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  loading = false,
  icon,
  iconAfter,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      <Content icon={icon} iconAfter={iconAfter} loading={loading}>
        {children}
      </Content>
    </button>
  );
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className" | "children"> & {
  variant?: ButtonVariant;
  icon?: IconName;
  iconAfter?: IconName;
  className?: string;
  children: ReactNode;
};

/** An internal, locale-aware link styled as a button. */
export function LinkButton({
  variant = "primary",
  icon,
  iconAfter,
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={buttonClasses(variant, cn("active:scale-[0.98]", className))} {...props}>
      <Content icon={icon} iconAfter={iconAfter}>
        {children}
      </Content>
    </Link>
  );
}

type AnchorButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  icon?: IconName;
  iconAfter?: IconName;
  children: ReactNode;
};

/**
 * A plain <a> styled as a button - for things that are not app pages:
 * file downloads, same-page anchors (#intro), WhatsApp and other external links.
 */
export function AnchorButton({
  variant = "primary",
  icon,
  iconAfter,
  className,
  children,
  ...props
}: AnchorButtonProps) {
  return (
    <a className={buttonClasses(variant, cn("active:scale-[0.98]", className))} {...props}>
      <Content icon={icon} iconAfter={iconAfter}>
        {children}
      </Content>
    </a>
  );
}
