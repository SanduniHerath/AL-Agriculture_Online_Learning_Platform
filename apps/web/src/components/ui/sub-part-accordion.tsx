import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import { Icon } from "./icon";
import { VideoListItem, type VideoListItemProps } from "./video-list-item";

/**
 * A sub-part (e.g. "1.2") with its teaching videos. Uses native <details> so it works
 * without JavaScript and is keyboard accessible out of the box.
 */
export function SubPartAccordion({
  code,
  title,
  totalDuration,
  unlocked,
  defaultOpen = false,
  videos,
}: {
  /** e.g. "1.2" */
  code: string;
  title: string;
  /** Formatted total, e.g. "40 min" */
  totalDuration: string;
  unlocked: boolean;
  defaultOpen?: boolean;
  videos: Array<VideoListItemProps & { id: string }>;
}) {
  const t = useTranslations("unit");
  const tc = useTranslations("common");
  return (
    <details
      className="card overflow-hidden transition duration-200 open:border-primary"
      open={defaultOpen}
    >
      <summary className="flex min-h-20 cursor-pointer list-none items-center gap-3 p-4 sm:p-5">
        <span className="flex min-h-11 min-w-12 shrink-0 items-center justify-center rounded-button bg-primary-soft px-2 font-bold text-primary tabular-nums">
          {code}
        </span>
        <span className="min-w-0 flex-1">
          <span className="heading block text-lg">
            {t("subpartTitle", { number: code, title })}
          </span>
          <span className="block text-sm text-text-muted">
            {t("lessonsCount", { count: videos.length })} · {totalDuration}
          </span>
        </span>
        <span className={cn(unlocked ? "text-secondary" : "text-locked")}>
          <Icon name={unlocked ? "check" : "lock"} />
          <span className="sr-only">{unlocked ? tc("readyToWatch") : tc("locked")}</span>
        </span>
        <span className="accordion-chevron">
          <Icon name="chevron" />
        </span>
      </summary>
      <div className="border-t px-5">
        {videos.length === 0 ? (
          <p className="py-4 text-sm text-text-muted">{tc("comingSoon")}</p>
        ) : (
          videos.map(({ id, ...video }) => <VideoListItem key={id} {...video} />)
        )}
      </div>
    </details>
  );
}
