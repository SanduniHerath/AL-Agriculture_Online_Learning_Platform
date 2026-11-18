import { Router } from "express";
import { pingDatabase } from "../lib/prisma.js";
import { registry } from "../lib/openapi.js";
import { z } from "../lib/zod.js";

/**
 * Health endpoints for uptime monitors and the hosting platform:
 *   /api/health        liveness  - the process is running (never touches the database)
 *   /api/health/ready  readiness - the database answers; 503 if not
 */
export const healthRouter: Router = Router();

healthRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "al-agri-api",
    version: process.env.npm_package_version ?? "0.1.0",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
  });
});

healthRouter.get("/health/ready", async (_req, res) => {
  const databaseUp = await pingDatabase();
  res.status(databaseUp ? 200 : 503).json({
    status: databaseUp ? "ready" : "unavailable",
    database: databaseUp ? "up" : "down",
  });
});

registry.registerPath({
  method: "get",
  path: "/api/health",
  tags: ["Health"],
  summary: "Liveness check",
  responses: {
    200: {
      description: "The API process is running",
      content: {
        "application/json": {
          schema: z.object({
            status: z.literal("ok"),
            service: z.string(),
            version: z.string(),
            timestamp: z.string(),
            uptimeSeconds: z.number(),
          }),
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/health/ready",
  tags: ["Health"],
  summary: "Readiness check (database)",
  responses: {
    200: {
      description: "Ready to serve traffic",
      content: {
        "application/json": {
          schema: z.object({ status: z.literal("ready"), database: z.literal("up") }),
        },
      },
    },
    503: {
      description: "Database unreachable",
      content: {
        "application/json": {
          schema: z.object({ status: z.literal("unavailable"), database: z.literal("down") }),
        },
      },
    },
  },
});
