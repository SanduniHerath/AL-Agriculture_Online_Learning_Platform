import { Router } from "express";

/**
 * Liveness/readiness endpoint used by uptime monitors and the deployment platform.
 * Phase 2 will add a database ping to the readiness check.
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
