import type { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";

/**
 * Database access for units. Repositories contain queries only - no business rules - so
 * services stay testable and every query for a model lives in one place.
 */

/** A video is visible to the public listing when published and finished processing. */
const visibleVideo = { isPublished: true, status: "READY" } satisfies Prisma.VideoWhereInput;

const summarySelect = {
  number: true,
  grade: true,
  slug: true,
  titleEn: true,
  titleSi: true,
  product: { select: { priceLkr: true, isActive: true } },
  _count: {
    select: {
      subParts: { where: { isPublished: true } },
      videos: { where: visibleVideo },
      resources: { where: { isPublished: true } },
    },
  },
} satisfies Prisma.UnitSelect;

export type UnitSummaryRow = Prisma.UnitGetPayload<{ select: typeof summarySelect }>;

export function findPublishedUnits(grade?: number): Promise<UnitSummaryRow[]> {
  return prisma.unit.findMany({
    where: { isPublished: true, ...(grade ? { grade } : {}) },
    orderBy: { sortOrder: "asc" },
    select: summarySelect,
  });
}

const detailSelect = {
  ...summarySelect,
  descriptionEn: true,
  descriptionSi: true,
  subParts: {
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    select: {
      code: true,
      titleEn: true,
      titleSi: true,
      videos: {
        where: visibleVideo,
        orderBy: { sortOrder: "asc" },
        select: { id: true, titleEn: true, titleSi: true, durationSec: true, isPreview: true },
      },
    },
  },
  videos: {
    where: { ...visibleVideo, kind: "DISCUSSION" },
    orderBy: [{ discussionType: "asc" }, { sortOrder: "asc" }],
    select: {
      id: true,
      discussionType: true,
      paperYear: true,
      titleEn: true,
      titleSi: true,
      durationSec: true,
      isPreview: true,
    },
  },
  resources: {
    where: { isPublished: true },
    orderBy: [{ type: "asc" }, { language: "asc" }],
    select: { type: true, language: true, fileName: true, fileSizeBytes: true, pageCount: true },
  },
} satisfies Prisma.UnitSelect;

export type UnitDetailRow = Prisma.UnitGetPayload<{ select: typeof detailSelect }>;

export function findPublishedUnitByNumber(number: number): Promise<UnitDetailRow | null> {
  return prisma.unit.findFirst({
    where: { number, isPublished: true },
    select: detailSelect,
  });
}
