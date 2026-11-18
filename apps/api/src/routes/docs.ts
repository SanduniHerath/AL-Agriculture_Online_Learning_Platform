import { Router } from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { buildOpenApiDocument } from "../lib/openapi.js";

/**
 * API documentation:
 *   /api/openapi.json  machine-readable OpenAPI 3.1 document
 *   /api/docs          Swagger UI (interactive)
 * Enabled outside production by default (API_DOCS_ENABLED).
 */
export function createDocsRouter(): Router {
  const router = Router();
  const document = buildOpenApiDocument();

  router.get("/openapi.json", (_req, res) => {
    res.json(document);
  });

  router.use(
    "/docs",
    // Swagger UI needs its own scripts and styles, so it gets a looser CSP than the JSON API.
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:"],
          frameAncestors: ["'none'"],
        },
      },
    }),
    swaggerUi.serve,
    swaggerUi.setup(document, { customSiteTitle: "A/L Agriculture API" }),
  );

  return router;
}
