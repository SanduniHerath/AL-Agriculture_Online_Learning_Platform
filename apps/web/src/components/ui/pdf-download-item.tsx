import { useTranslations } from "next-intl";
import { AnchorButton, LinkButton } from "./button";
import { Badge } from "./badge";
import { Icon } from "./icon";

/**
 * A free PDF (theory note or unit-wise question paper) with "Open" and "Download".
 * Free PDFs are public files, so Download is a direct link (SRS FR-FREE-03).
 */
export function PDFDownloadItem({
  title,
  meta,
  size,
  viewHref,
  downloadHref,
  fileName,
}: {
  title: string;
  /** e.g. "PDF" or "30 years of questions" */
  meta: string;
  /** e.g. "4.8 MB" */
  size: string;
  /** In-app viewer page. */
  viewHref: string;
  /** Public file URL. */
  downloadHref: string;
  /** Suggested file name for the download. */
  fileName?: string;
}) {
  const t = useTranslations("common");
  return (
    <article className="flex flex-col gap-4 rounded-card border bg-surface p-4 shadow-sm sm:flex-row sm:items-center">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-button bg-primary-soft text-primary">
        <Icon name="paper" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="heading text-lg">{title}</h3>
          <Badge variant="free" icon="leaf">
            {t("free")}
          </Badge>
        </div>
        <p className="text-sm text-text-muted">
          {meta} · {size}
        </p>
      </div>
      <LinkButton href={viewHref} variant="text">
        {t("open")}
      </LinkButton>
      <AnchorButton
        href={downloadHref}
        download={fileName ?? true}
        variant="outline"
        icon="download"
      >
        {t("download")}
      </AnchorButton>
    </article>
  );
}
