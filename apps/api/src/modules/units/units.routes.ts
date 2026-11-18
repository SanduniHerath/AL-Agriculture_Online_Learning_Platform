import { Router } from "express";
import { errorResponses, registry } from "../../lib/openapi.js";
import { z } from "../../lib/zod.js";
import * as controller from "./units.controller.js";
import {
  listUnitsQuerySchema,
  UnitDetailSchema,
  unitParamsSchema,
  UnitSummarySchema,
} from "./units.schemas.js";

/** Public, read-only syllabus catalogue (SRS 5.3). Access/lock states arrive in Phase 4. */
export const unitsRouter: Router = Router();

unitsRouter.get("/units", controller.list);
unitsRouter.get("/units/:number", controller.getByNumber);

registry.registerPath({
  method: "get",
  path: "/api/units",
  tags: ["Units"],
  summary: "List published units",
  description: "All published syllabus units in display order, optionally filtered by grade.",
  request: { query: listUnitsQuerySchema },
  responses: {
    200: {
      description: "Units",
      content: { "application/json": { schema: z.object({ units: z.array(UnitSummarySchema) }) } },
    },
    400: errorResponses[400],
  },
});

registry.registerPath({
  method: "get",
  path: "/api/units/{number}",
  tags: ["Units"],
  summary: "Get one unit",
  description:
    "Sub-parts with their teaching videos, past-paper discussion videos by type, and free " +
    "PDF resources. Only metadata - playback and downloads are separate, access-checked endpoints.",
  request: { params: unitParamsSchema },
  responses: {
    200: {
      description: "The unit",
      content: { "application/json": { schema: z.object({ unit: UnitDetailSchema }) } },
    },
    400: errorResponses[400],
    404: errorResponses[404],
  },
});
