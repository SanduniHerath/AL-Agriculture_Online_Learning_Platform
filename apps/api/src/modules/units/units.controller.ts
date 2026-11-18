import type { Request, Response } from "express";
import { listUnitsQuerySchema, unitParamsSchema } from "./units.schemas.js";
import * as service from "./units.service.js";

/**
 * HTTP layer: validate the request with Zod (a ZodError becomes a 400 automatically),
 * call the service, send JSON. No database code here.
 */

export async function list(req: Request, res: Response): Promise<void> {
  const { grade } = listUnitsQuerySchema.parse(req.query);
  const units = await service.listUnits(grade);
  // Public catalogue: browsers and CDNs may cache briefly.
  res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
  res.json({ units });
}

export async function getByNumber(req: Request, res: Response): Promise<void> {
  const { number } = unitParamsSchema.parse(req.params);
  const unit = await service.getUnit(number);
  res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
  res.json({ unit });
}
