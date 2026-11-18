import { OpenAPIRegistry, OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import { env } from "../config/env.js";
import { z } from "./zod.js";

/**
 * Central OpenAPI registry. Each module registers its paths and schemas next to its
 * routes (see modules/units/units.routes.ts), so the docs cannot drift from the code.
 */
export const registry = new OpenAPIRegistry();

/** The standard error body every endpoint returns on failure (see error-handler.ts). */
export const ErrorResponseSchema = registry.register(
  "ErrorResponse",
  z
    .object({
      error: z.object({
        code: z.string().openapi({ example: "NOT_FOUND" }),
        message: z.string().openapi({ example: "Unit not found" }),
        details: z.unknown().optional(),
        requestId: z.string().openapi({ example: "8f14e45f-ceea-467f-a8f6-2a6b9e1f0c3d" }),
      }),
    })
    .openapi({ description: "Error response" }),
);

/** Reusable error responses for registerPath(). */
export const errorResponses = {
  400: {
    description: "Invalid request",
    content: { "application/json": { schema: ErrorResponseSchema } },
  },
  404: {
    description: "Not found",
    content: { "application/json": { schema: ErrorResponseSchema } },
  },
  500: {
    description: "Unexpected error",
    content: { "application/json": { schema: ErrorResponseSchema } },
  },
} as const;

export type OpenApiDocument = ReturnType<OpenApiGeneratorV31["generateDocument"]>;

export function buildOpenApiDocument(): OpenApiDocument {
  return new OpenApiGeneratorV31(registry.definitions).generateDocument({
    openapi: "3.1.0",
    info: {
      title: "A/L Agriculture Learning Platform API",
      version: process.env.npm_package_version ?? "0.1.0",
      description:
        "REST API for the A/L Agriculture Online Learning Platform. All responses are JSON; " +
        "errors use the ErrorResponse shape. Bilingual text is returned as { en, si }.",
    },
    servers: [{ url: env.API_URL }],
  });
}
