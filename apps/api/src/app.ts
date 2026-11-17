import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express, type Request } from "express";
import helmet from "helmet";
import { pinoHttp } from "pino-http";
import { env } from "./config/env.js";
import { logger } from "./lib/logger.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { getRequestId, requestId } from "./middleware/request-id.js";
import { healthRouter } from "./routes/health.js";

/**
 * Builds the Express application. Kept separate from `index.ts` so tests can
 * create an app instance without opening a network port.
 */
export function createApp(): Express {
  const app = express();

  // Trust the first proxy (load balancer / CDN) so req.ip and secure cookies work in production.
  app.set("trust proxy", 1);
  app.disable("x-powered-by");

  // --- Security & plumbing ---
  app.use(requestId);
  app.use(
    helmet({
      // The API only returns JSON; a strict CSP keeps any accidental HTML response inert.
      contentSecurityPolicy: { directives: { defaultSrc: ["'none'"], frameAncestors: ["'none'"] } },
    }),
  );
  app.use(
    cors({
      origin: env.WEB_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "X-Request-Id", "X-CSRF-Token"],
    }),
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: false, limit: "1mb" })); // PayHere posts form-encoded notifications
  app.use(cookieParser());
  app.use(
    pinoHttp({
      logger,
      genReqId: (req) => getRequestId(req as Request),
      autoLogging: { ignore: (req) => req.url === "/api/health" },
    }),
  );

  // --- Routes ---
  app.use("/api", healthRouter);

  // --- Errors (order matters: 404 first, then the handler) ---
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
