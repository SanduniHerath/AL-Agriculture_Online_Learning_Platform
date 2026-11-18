import { DISCUSSION_TYPES } from "@al-agri/shared";
import { AppError } from "../../lib/errors.js";
import * as repository from "./units.repository.js";
import type { UnitDetail, UnitSummary } from "./units.schemas.js";

/**
 * Business logic for the public units catalogue: turns database rows into the API's
 * response shape (bilingual { en, si } objects, price only when on sale).
 */

function toSummary(row: repository.UnitSummaryRow): UnitSummary {
  return {
    number: row.number,
    grade: row.grade,
    slug: row.slug,
    title: { en: row.titleEn, si: row.titleSi },
    subPartCount: row._count.subParts,
    videoCount: row._count.videos,
    hasFreeResources: row._count.resources > 0,
    priceLkr: row.product?.isActive ? row.product.priceLkr : null,
  };
}

export async function listUnits(grade?: number): Promise<UnitSummary[]> {
  const rows = await repository.findPublishedUnits(grade);
  return rows.map(toSummary);
}

export async function getUnit(number: number): Promise<UnitDetail> {
  const row = await repository.findPublishedUnitByNumber(number);
  if (!row) throw AppError.notFound(`Unit ${number} not found`);

  const discussions = Object.fromEntries(
    DISCUSSION_TYPES.map((type) => [
      type,
      row.videos
        .filter((video) => video.discussionType === type)
        .map((video) => ({
          id: video.id,
          title: { en: video.titleEn, si: video.titleSi },
          durationSec: video.durationSec,
          isPreview: video.isPreview,
          paperYear: video.paperYear,
        })),
    ]),
  ) as UnitDetail["discussions"];

  return {
    ...toSummary(row),
    description: { en: row.descriptionEn, si: row.descriptionSi },
    subParts: row.subParts.map((part) => ({
      code: part.code,
      title: { en: part.titleEn, si: part.titleSi },
      totalDurationSec: part.videos.reduce((sum, video) => sum + video.durationSec, 0),
      videos: part.videos.map((video) => ({
        id: video.id,
        title: { en: video.titleEn, si: video.titleSi },
        durationSec: video.durationSec,
        isPreview: video.isPreview,
      })),
    })),
    discussions,
    resources: row.resources,
  };
}
