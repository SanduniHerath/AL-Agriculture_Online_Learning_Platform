import { z } from "zod";

/**
 * Environment configuration, validated once at startup.
 * If a required variable is missing or malformed the process exits immediately
 * with a clear message instead of failing later in an obscure way.
 *
 * Only the variables needed by the current phase are declared here; later
 * phases extend this schema (see apps/api/.env.example for the full list).
 */

/** "true"/"false" strings -> boolean. (z.coerce.boolean would turn "false" into true.) */
const booleanString = z.enum(["true", "false"]).transform((value) => value === "true");

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  API_URL: z.url().default("http://localhost:4000"),
  WEB_URL: z.url().default("http://localhost:3000"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),

  // Database
  DATABASE_URL: z
    .string()
    .regex(/^mysql:\/\//, "must be a mysql:// connection URL")
    .pipe(z.url()),
  DATABASE_POOL_SIZE: z.coerce.number().int().min(1).max(100).default(10),
  DATABASE_SSL: booleanString.default(false),

  // Swagger UI at /api/docs (defaults to on outside production)
  API_DOCS_ENABLED: booleanString.optional(),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }
  return result.data;
}

export const env: Env = loadEnv();
export const isProduction = env.NODE_ENV === "production";
export const apiDocsEnabled = env.API_DOCS_ENABLED ?? !isProduction;
