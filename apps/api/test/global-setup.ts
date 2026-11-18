import { execSync } from "node:child_process";

/**
 * Runs once before the test suite:
 *   1. refuses to touch any database whose name does not end in "_test" (safety net),
 *   2. applies any pending migrations (`prisma migrate deploy` - never deletes data),
 *   3. runs the normal seed, which only adds missing rows.
 *
 * Nothing here is destructive, so the suite can run repeatedly against the same test
 * database. Tests that create records clean up after themselves. To start completely
 * fresh, drop the test database yourself (see docs/database.md).
 */
export default async function globalSetup(): Promise<void> {
  const url = process.env.DATABASE_URL ?? "";
  const databaseName = url ? new URL(url).pathname.replace(/^\//, "") : "";
  if (!databaseName.endsWith("_test")) {
    throw new Error(
      `Refusing to run tests against "${databaseName || "(none)"}": ` +
        "TEST_DATABASE_URL must point to a database whose name ends with _test.",
    );
  }

  execSync("pnpm exec prisma migrate deploy", {
    stdio: "pipe",
    env: { ...process.env, DATABASE_URL: url },
  });

  // Imported after the environment is set, because these modules read it on load.
  const { createPrismaClient } = await import("../src/lib/prisma.js");
  const { seed } = await import("../prisma/seed/seed.js");
  const prisma = createPrismaClient(url);
  try {
    await seed(prisma, {
      sampleContent: true,
      admin: { fullName: "Test Admin", mobile: "+94770000001", password: "testpass123" },
    });
  } finally {
    await prisma.$disconnect();
  }
}
