import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Prisma CLI configuration (Prisma 7). The CLI no longer reads .env by itself, so
 * `dotenv/config` loads apps/api/.env first.
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed/index.ts",
  },
  datasource: {
    // An empty value lets `prisma generate` run without a database (e.g. on a fresh clone);
    // commands that need the database fail with a clear "DATABASE_URL" error instead.
    url: process.env.DATABASE_URL ?? "",
  },
});
