import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icon";

export type VideoState = "locked" | "ready" | "watched";

export type VideoListItemProps = {
  title: string;
  /** Formatted, e.g. "12:40" */
  duration: string;
  state: VideoState;
  /** Player page; ignored while locked. */
  href?: string;
};

const stateIcon: Record<VideoState, IconName> = { locked: "lock", ready: "play", watched: "check" };

/** One lesson row inside a sub-part or discussion list. */
export function VideoListItem({ title, duration, state, href }: VideoListItemProps) {
  const t = useTranslations("common");
  const statusText =
    state === "watched" ? t("watched") : state === "ready" ? t("readyToWatch") : t("locked");
  const actionText =
    state === "watched" ? t("watched") : state === "ready" ? t("play") : t("locked");

  const body = (
    <>
      <span className="relative flex aspect-video w-24 shrink-0 items-center justify-center overflow-hidden rounded-video bg-primary-soft text-primary sm:w-28">
        <Icon name={stateIcon[state]} size={20} />
        <span className="absolute right-1 bottom-1 rounded bg-primary px-1.5 py-0.5 text-[0.65rem] font-bold text-on-primary tabular-nums">
          {duration}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{title}</span>
        <span className="block text-sm text-text-muted">{statusText}</span>
      </span>
      <span className="hidden items-center gap-1 text-sm font-bold text-primary sm:flex">
        <Icon name={stateIcon[state]} size={16} />
        {actionText}
      </span>
    </>
  );

  const rowClass = cn(
    "flex items-center gap-4 border-t py-4 first:border-t-0",
    state === "locked" && "opacity-65",
  );

  if (href && state !== "locked") {
    return (
      <Link href={href} className={cn(rowClass, "rounded-button hover:bg-primary-soft/50")}>
        {body}
      </Link>
    );
  }
  return <div className={rowClass}>{body}</div>;
}
