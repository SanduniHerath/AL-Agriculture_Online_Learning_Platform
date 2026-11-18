import {
  DISCUSSION_TYPES,
  PAST_PAPER_FIRST_YEAR,
  PAST_PAPER_LAST_YEAR,
  SITE_SETTING_DEFAULTS,
  SITE_SETTING_KEYS,
  formatUnitNumber,
} from "@al-agri/shared";
import type { Prisma, PrismaClient } from "../../src/generated/prisma/client.js";
import { hashPassword } from "../../src/lib/password.js";
import { SAMPLE_LESSONS, TEACHER_PROFILE, TESTIMONIALS } from "./content.js";
import { DEFAULT_PRICES, PLACEHOLDER_SUBPARTS, SYLLABUS_UNITS } from "./syllabus.js";

/**
 * Seeds the database. Safe to run any number of times: it only ADDS what is missing and
 * never overwrites rows the teacher may have edited in the admin panel.
 */
export type SeedOptions = {
  /** Add sample videos, PDFs and past-paper files (development / demos only). */
  sampleContent: boolean;
  /** The first admin account. Skipped when not provided. */
  admin?: { fullName: string; mobile: string; email?: string; password: string };
  log?: (message: string) => void;
};

export type SeedSummary = Record<string, number | string>;

export async function seed(prisma: PrismaClient, options: SeedOptions): Promise<SeedSummary> {
  const log = options.log ?? (() => undefined);
  const summary: SeedSummary = {};

  // --- Units (19, from the NIE syllabus) ---------------------------------------------
  for (const unit of SYLLABUS_UNITS) {
    await prisma.unit.upsert({
      where: { number: unit.number },
      update: {}, // never overwrite admin edits
      create: {
        number: unit.number,
        grade: unit.grade,
        slug: `unit-${unit.number}`,
        titleEn: unit.titleEn,
        titleSi: unit.titleSi,
        descriptionEn: unit.competency,
        sortOrder: unit.number,
        isPublished: true,
      },
    });
  }
  const units = await prisma.unit.findMany({ orderBy: { number: "asc" } });
  summary.units = units.length;

  // --- Placeholder sub-parts (only for units that have none yet) -----------------------
  let subPartsCreated = 0;
  for (const unit of units) {
    if ((await prisma.subPart.count({ where: { unitId: unit.id } })) > 0) continue;
    const count = unit.number % 2 === 0 ? 4 : 3;
    const { count: created } = await prisma.subPart.createMany({
      data: PLACEHOLDER_SUBPARTS.slice(0, count).map((part, index) => ({
        unitId: unit.id,
        code: `${unit.number}.${index + 1}`,
        titleEn: part.titleEn,
        titleSi: part.titleSi,
        sortOrder: index + 1,
      })),
    });
    subPartsCreated += created;
  }
  summary.subPartsCreated = subPartsCreated;

  // --- Past paper years 1996-2025 ------------------------------------------------------
  const years = Array.from(
    { length: PAST_PAPER_LAST_YEAR - PAST_PAPER_FIRST_YEAR + 1 },
    (_, index) => PAST_PAPER_LAST_YEAR - index,
  );
  const { count: pastPapersCreated } = await prisma.pastPaper.createMany({
    data: years.map((year) => ({ year, isPublished: true })),
    skipDuplicates: true,
  });
  summary.pastPapersCreated = pastPapersCreated;
  const pastPapers = await prisma.pastPaper.findMany();

  // --- Products and starting prices ----------------------------------------------------
  const { count: unitProducts } = await prisma.product.createMany({
    data: units.map((unit) => ({
      type: "UNIT" as const,
      unitId: unit.id,
      priceLkr: DEFAULT_PRICES.unit[unit.grade as 12 | 13],
    })),
    skipDuplicates: true,
  });
  const { count: paperProducts } = await prisma.product.createMany({
    data: pastPapers.map((paper) => ({
      type: "PAST_PAPER_YEAR" as const,
      pastPaperId: paper.id,
      priceLkr: DEFAULT_PRICES.pastPaper(paper.year),
    })),
    skipDuplicates: true,
  });
  summary.productsCreated = unitProducts + paperProducts;

  // --- Site settings (defaults only for keys never saved) ------------------------------
  const { count: settingsCreated } = await prisma.siteSetting.createMany({
    data: SITE_SETTING_KEYS.map((key) => ({
      key,
      value: SITE_SETTING_DEFAULTS[key],
    })),
    skipDuplicates: true,
  });
  summary.settingsCreated = settingsCreated;

  // --- Teacher profile & testimonials (placeholders from the design) -------------------
  await prisma.teacherProfile.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, ...TEACHER_PROFILE },
  });
  if ((await prisma.testimonial.count()) === 0) {
    await prisma.testimonial.createMany({
      data: TESTIMONIALS.map((testimonial, index) => ({ ...testimonial, sortOrder: index + 1 })),
    });
    summary.testimonialsCreated = TESTIMONIALS.length;
  }

  // --- First admin ----------------------------------------------------------------------
  if (options.admin) {
    const existing = await prisma.user.findUnique({ where: { mobile: options.admin.mobile } });
    if (!existing) {
      await prisma.user.create({
        data: {
          role: "ADMIN",
          fullName: options.admin.fullName,
          mobile: options.admin.mobile,
          email: options.admin.email ?? null,
          passwordHash: await hashPassword(options.admin.password),
          mobileVerifiedAt: new Date(),
          preferredLanguage: "si",
        },
      });
      summary.admin = "created";
    } else if (existing.role !== "ADMIN") {
      // Never silently promote an existing account to admin.
      log(`WARNING: ${options.admin.mobile} already belongs to a ${existing.role}; not changed.`);
      summary.admin = "skipped (mobile used by a non-admin)";
    } else {
      summary.admin = "already exists (password unchanged)";
    }
  }

  // --- Sample content for development --------------------------------------------------
  if (options.sampleContent) {
    Object.assign(summary, await seedSampleContent(prisma, units, pastPapers));
  }

  return summary;
}

async function seedSampleContent(
  prisma: PrismaClient,
  units: Array<{ id: number; number: number }>,
  pastPapers: Array<{ id: string; year: number }>,
): Promise<SeedSummary> {
  const subParts = await prisma.subPart.findMany({
    orderBy: [{ unitId: "asc" }, { sortOrder: "asc" }],
  });

  // Teaching videos: 2-3 per sub-part, played by the MOCK provider in development.
  const teaching: Prisma.VideoCreateManyInput[] = subParts.flatMap((part, partIndex) => {
    const lessons = partIndex % 3 === 2 ? 2 : 3;
    return SAMPLE_LESSONS.slice(0, lessons).map((lesson, index) => ({
      unitId: part.unitId,
      subPartId: part.id,
      kind: "TEACHING" as const,
      titleEn: lesson.titleEn,
      titleSi: lesson.titleSi,
      provider: "MOCK" as const,
      providerVideoId: `mock-teaching-${part.code}-${index + 1}`,
      status: "READY" as const,
      durationSec: 540 + ((partIndex * 7 + index * 5) % 12) * 60, // 9-20 minutes
      sortOrder: index + 1,
      isPreview: part.code.endsWith(".1") && index === 0,
      isPublished: true,
    }));
  });

  // Discussion videos: MCQ / Structured / Essay for the two latest years, per unit.
  const discussion: Prisma.VideoCreateManyInput[] = units.flatMap((unit) =>
    DISCUSSION_TYPES.flatMap((type) =>
      [2025, 2024].map((year, index) => ({
        unitId: unit.id,
        kind: "DISCUSSION" as const,
        discussionType: type,
        paperYear: year,
        titleEn: `${year} ${type === "MCQ" ? "MCQ" : type === "STRUCTURED" ? "Structured" : "Essay"} question discussion`,
        titleSi: `${year} ${type === "MCQ" ? "බහුවරණ" : type === "STRUCTURED" ? "ව්‍යුහගත" : "රචනා"} ප්‍රශ්න සාකච්ඡාව`,
        provider: "MOCK" as const,
        providerVideoId: `mock-discussion-${unit.number}-${type.toLowerCase()}-${year}`,
        status: "READY" as const,
        durationSec: type === "ESSAY" ? 1450 : 990,
        sortOrder: index + 1,
        isPublished: true,
      })),
    ),
  );

  const { count: videos } = await prisma.video.createMany({
    data: [...teaching, ...discussion],
    skipDuplicates: true,
  });

  // Free PDFs: placeholder storage keys (files are uploaded through the admin in Phase 5).
  const { count: resources } = await prisma.resource.createMany({
    data: units.flatMap((unit) => {
      const folder = `public/units/${formatUnitNumber(unit.number)}`;
      return [
        {
          unitId: unit.id,
          type: "THEORY_NOTE" as const,
          fileKey: `${folder}/theory-note-si.pdf`,
          fileName: `unit-${formatUnitNumber(unit.number)}-theory-note.pdf`,
          fileSizeBytes: 4_800_000,
          pageCount: 18,
          isPublished: true,
        },
        {
          unitId: unit.id,
          type: "PAST_PAPER_QUESTIONS" as const,
          fileKey: `${folder}/past-paper-questions-si.pdf`,
          fileName: `unit-${formatUnitNumber(unit.number)}-past-paper-questions.pdf`,
          fileSizeBytes: 12_600_000,
          pageCount: 42,
          isPublished: true,
        },
      ];
    }),
    skipDuplicates: true,
  });

  // Past paper files: Paper I / II and marking schemes for every year.
  const { count: paperFiles } = await prisma.pastPaperFile.createMany({
    data: pastPapers.flatMap((paper) =>
      (["PAPER", "MARKING_SCHEME"] as const).flatMap((kind) =>
        (["I", "II"] as const).map((part) => {
          const slug = kind === "PAPER" ? "paper" : "marking-scheme";
          return {
            pastPaperId: paper.id,
            kind,
            part,
            fileKey: `private/past-papers/${paper.year}/${slug}-${part.toLowerCase()}-si.pdf`,
            fileName: `al-agriculture-${paper.year}-${slug}-${part.toLowerCase()}.pdf`,
            fileSizeBytes: kind === "PAPER" ? 2_600_000 : 3_100_000,
          };
        }),
      ),
    ),
    skipDuplicates: true,
  });

  return {
    sampleVideosCreated: videos,
    sampleResourcesCreated: resources,
    samplePaperFilesCreated: paperFiles,
  };
}
