import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge needs to know our custom design tokens, otherwise it would treat
 * `text-h1` (a font size) and `text-primary` (a colour) as conflicting and drop one.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      color: [
        "primary",
        "primary-hover",
        "primary-soft",
        "secondary",
        "accent",
        "accent-hover",
        "on-accent",
        "on-primary",
        "bg",
        "surface",
        "surface-raised",
        "text",
        "text-muted",
        "border",
        "error",
        "warning",
        "info",
        "locked",
        "overlay",
        "footer",
        "footer-text",
        "footer-border",
        "player",
        "player-text",
      ],
      radius: ["card", "button", "input", "video", "badge"],
      shadow: ["focus", "nav"],
      text: ["display", "h1", "h2", "h3", "body-lg", "body", "caption", "button"],
      font: ["heading", "sinhala", "display-si"],
    },
  },
});

/**
 * Joins class names and resolves Tailwind conflicts so a `className` prop can override
 * a component's defaults: cn("px-5", "px-3") -> "px-3".
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
