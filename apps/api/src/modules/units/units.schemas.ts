import { DISCUSSION_TYPES, GRADES, LOCALES, RESOURCE_TYPES, UNIT_COUNT } from "@al-agri/shared";
import { registry } from "../../lib/openapi.js";
import { z } from "../../lib/zod.js";

/**
 * Request and response shapes for the public units endpoints. These schemas validate
 * input and generate the OpenAPI documentation.
 */

// --- Requests --------------------------------------------------------------------------

export const listUnitsQuerySchema = z.object({
  grade: z.coerce
    .number()
    .pipe(z.union(GRADES.map((grade) => z.literal(grade)) as [z.ZodLiteral<12>, z.ZodLiteral<13>]))
    .optional()
    .openapi({ description: "Only units of this grade", example: 12 }),
});

export const unitParamsSchema = z.object({
  number: z.coerce
    .number()
    .int()
    .min(1)
    .max(UNIT_COUNT)
    .openapi({ description: "Unit number (1-19)", example: 1 }),
});

// --- Responses -------------------------------------------------------------------------

const bilingual = z.object({ en: z.string(), si: z.string() });
const optionalBilingual = z.object({ en: z.string().nullable(), si: z.string().nullable() });

export const UnitSummarySchema = registry.register(
  "UnitSummary",
  z.object({
    number: z.number().int().openapi({ example: 1 }),
    grade: z.number().int().openapi({ example: 12 }),
    slug: z.string().openapi({ example: "unit-1" }),
    title: bilingual,
    subPartCount: z.number().int(),
    videoCount: z.number().int().openapi({ description: "Published teaching + discussion videos" }),
    hasFreeResources: z.boolean(),
    priceLkr: z
      .number()
      .int()
      .nullable()
      .openapi({ description: "Current price in rupees; null when not on sale", example: 1500 }),
  }),
);

const VideoItemSchema = z.object({
  id: z.string(),
  title: bilingual,
  durationSec: z.number().int(),
  isPreview: z.boolean(),
});

const DiscussionVideoSchema = VideoItemSchema.extend({
  paperYear: z.number().int().nullable().openapi({ example: 2025 }),
});

export const UnitDetailSchema = registry.register(
  "UnitDetail",
  UnitSummarySchema.extend({
    description: optionalBilingual,
    subParts: z.array(
      z.object({
        code: z.string().openapi({ example: "1.2" }),
        title: bilingual,
        totalDurationSec: z.number().int(),
        videos: z.array(VideoItemSchema),
      }),
    ),
    discussions: z.object(
      Object.fromEntries(
        DISCUSSION_TYPES.map((type) => [type, z.array(DiscussionVideoSchema)]),
      ) as Record<(typeof DISCUSSION_TYPES)[number], z.ZodArray<typeof DiscussionVideoSchema>>,
    ),
    resources: z.array(
      z.object({
        type: z.enum(RESOURCE_TYPES),
        language: z.enum(LOCALES),
        fileName: z.string(),
        fileSizeBytes: z.number().int(),
        pageCount: z.number().int().nullable(),
      }),
    ),
  }),
);

export type UnitSummary = z.infer<typeof UnitSummarySchema>;
export type UnitDetail = z.infer<typeof UnitDetailSchema>;
