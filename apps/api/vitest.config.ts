import { defineConfig } from "vitest/config";

/**
 * Tests run against a SEPARATE database (al_agri_test by default), which the global setup
 * resets, migrates and seeds before every run. Never point TEST_DATABASE_URL at real data.
 */
const testDatabaseUrl =
  process.env.TEST_DATABASE_URL ?? "mysql://al_agri:al_agri@localhost:3307/al_agri_test";

// The global setup runs in this process, so it needs the URL here too.
process.env.DATABASE_URL = testDatabaseUrl;

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts", "test/**/*.test.ts"],
    globalSetup: ["./test/global-setup.ts"],
    // Integration tests share one database; run files one after another.
    fileParallelism: false,
    testTimeout: 15_000,
    hookTimeout: 120_000,
    env: {
      NODE_ENV: "test",
      LOG_LEVEL: "silent",
      DATABASE_URL: testDatabaseUrl,
      API_DOCS_ENABLED: "true",
    },
  },
});
