import { cn } from "@/lib/cn";

/** Horizontal progress bar (lesson / unit completion, uploads). */
export function ProgressBar({
  value,
  label,
  className,
  trackClassName,
}: {
  /** 0-100 */
  value: number;
  /** Accessible name, e.g. "42% complete". */
  label: string;
  className?: string;
  trackClassName?: string;
}) {
  const percent = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className={cn("h-2 overflow-hidden rounded-full bg-primary-soft", trackClassName)}
    >
      <div
        className={cn("h-full rounded-full bg-secondary", className)}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
