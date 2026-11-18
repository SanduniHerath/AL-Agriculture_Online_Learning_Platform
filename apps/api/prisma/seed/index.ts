/**
 * Seed command:  pnpm db:seed   (runs `prisma db seed`, which loads apps/api/.env)
 *
 * Environment:
 *   SEED_SAMPLE_CONTENT  "true" | "false" - defaults to true outside production
 *   ADMIN_FULL_NAME, ADMIN_MOBILE, ADMIN_EMAIL (optional), ADMIN_PASSWORD - first admin
 */
import { passwordSchema, slMobileSchema } from "@al-agri/shared";
import { z } from "zod";
import { createPrismaClient } from "../../src/lib/prisma.js";
import { seed } from "./seed.js";

const isProduction = process.env.NODE_ENV === "production";

const adminSchema = z.object({
  ADMIN_FULL_NAME: z.string().trim().min(2).max(120),
  ADMIN_MOBILE: slMobileSchema,
  ADMIN_EMAIL: z.union([z.email(), z.literal("")]).optional(),
  ADMIN_PASSWORD: passwordSchema.refine(
    (value) => !isProduction || !/change-me/i.test(value),
    "ADMIN_PASSWORD still has the placeholder value - set a real password for production",
  ),
});

function readAdmin() {
  if (!process.env.ADMIN_MOBILE) {
    console.warn("ADMIN_MOBILE not set - skipping the admin account.");
    return undefined;
  }
  const result = adminSchema.safeParse(process.env);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  - ${i.path.join(".")}: ${i.message}`);
    throw new Error(`Invalid admin seed settings:\n${issues.join("\n")}`);
  }
  const { ADMIN_FULL_NAME, ADMIN_MOBILE, ADMIN_EMAIL, ADMIN_PASSWORD } = result.data;
  return {
    fullName: ADMIN_FULL_NAME,
    mobile: ADMIN_MOBILE,
    password: ADMIN_PASSWORD,
    ...(ADMIN_EMAIL ? { email: ADMIN_EMAIL } : {}),
  };
}

async function main() {
  const sampleContent = (process.env.SEED_SAMPLE_CONTENT ?? String(!isProduction)) === "true";
  const admin = readAdmin();
  const prisma = createPrismaClient();
  try {
    const summary = await seed(prisma, {
      sampleContent,
      ...(admin ? { admin } : {}),
      log: (message) => console.warn(message),
    });
    console.log("Seed finished:");
    console.table(summary);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
