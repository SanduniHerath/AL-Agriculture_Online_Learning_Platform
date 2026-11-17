import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { isProduction } from "../config/env.js";
import { AppError } from "../lib/errors.js";
import { logger } from "../lib/logger.js";
import { getRequestId } from "./request-id.js";

interface ErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
    requestId: string;
  };
}

/** 404 for unknown routes - must be registered after all other routes. */
export function notFoundHandler(req: Request, _res: Response, next: NextFunction): void {
  next(AppError.notFound(`Route ${req.method} ${req.path} not found`));
}

/**
 * Central error handler. Converts known errors into the standard JSON shape and
 * hides internals (stack traces, SQL, provider messages) in production.
 */
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  const requestId = getRequestId(req);

  if (err instanceof ZodError) {
    const body: ErrorBody = {
      error: {
        code: "VALIDATION_ERROR",
        message: "Request validation failed",
        details: err.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
        requestId,
      },
    };
    res.status(400).json(body);
    return;
  }

  if (err instanceof AppError) {
    const body: ErrorBody = {
      error: { code: err.code, message: err.message, requestId },
    };
    if (err.details !== undefined) body.error.details = err.details;
    res.status(err.status).json(body);
    return;
  }

  // Unknown error: log everything, tell the client very little.
  logger.error({ err, requestId }, "Unhandled error");
  const body: ErrorBody = {
    error: {
      code: "INTERNAL_ERROR",
      message: isProduction
        ? "Something went wrong. Please try again."
        : err instanceof Error
          ? err.message
          : String(err),
      requestId,
    },
  };
  res.status(500).json(body);
}
