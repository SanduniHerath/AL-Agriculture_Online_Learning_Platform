import { useTranslations } from "next-intl";
import { formatUnitNumber } from "@al-agri/shared";
import { Link } from "@/i18n/navigation";
import { Badge } from "./badge";
import { Icon } from "./icon";
import { ProgressBar } from "./progress-bar";

export type UnitCardStatus = "free" | "locked" | "purchased";

export type UnitCardProps = {
  number: number;
  title: string;
  subpartCount: number;
  videoCount: number;
  status: UnitCardStatus;
  /** Formatted price, e.g. "Rs. 1,500" - shown on locked units. */
  price?: string;
  /** 0-100, shown on purchased units. */
  progress?: number;
  href: string;
};

/** Card for one syllabus unit (units list, home page, account dashboard). */
export function UnitCard({
  number,
  title,
  subpartCount,
  videoCount,
  status,
  price,
  progress,
  href,
}: UnitCardProps) {
  const t = useTranslations("units");
  const tc = useTranslations("common");
  const padded = formatUnitNumber(number);

  return (
    <Link
      href={href}
      className="card group flex min-h-72 flex-col p-5 transition duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
    >
      <div className="mb-5 flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className="font-heading text-5xl leading-none font-bold text-primary tabular-nums"
        >
          {padded}
        </span>
        {status === "free" ? (
          <Badge variant="free" icon="leaf">
            {t("freeResources")}
          </Badge>
        ) : status === "purchased" ? (
          <Badge variant="purchased" icon="check">
            {tc("purchased")}
          </Badge>
        ) : (
          <Badge variant="locked" icon="lock">
            {price ? t("lockedPrice", { price }) : tc("locked")}
          </Badge>
        )}
      </div>
      <p className="eyebrow">{tc("unitLabel", { number: padded })}</p>
      <h2 className="heading mt-2 line-clamp-2 text-xl">{title}</h2>
      <p className="mt-2 text-sm text-text-muted">
        {t("meta", { subparts: subpartCount, videos: videoCount })}
      </p>
      {status !== "purchased" && (
        <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-secondary">
          <Icon name="download" size={16} />
          {t("freeResources")}
        </p>
      )}
      {status === "purchased" && typeof progress === "number" && (
        <div className="mt-5">
          <p className="mb-2 text-sm">{t("progressComplete", { percent: progress })}</p>
          <ProgressBar value={progress} label={t("progressComplete", { percent: progress })} />
        </div>
      )}
      <span className="mt-auto flex min-h-12 items-center justify-between border-t pt-4 font-semibold text-primary">
        {t("viewUnit")}
        <Icon name="arrow" />
      </span>
    </Link>
  );
}
