import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

/**
 * Gives every request a unique id (or reuses one sent by a proxy/CDN) so a
 * single request can be traced through logs, audit entries and error reports.
 */
export function requestId(req: Request, res: Response, next: NextFunction): void {
  const incoming = req.header("x-request-id");
  const id = incoming && incoming.length <= 128 ? incoming : randomUUID();
  req.id = id;
  res.setHeader("x-request-id", id);
  next();
}

/** Returns the request id as a string (pino-http types `req.id` loosely). */
export function getRequestId(req: Request): string {
  const id: unknown = req.id;
  return typeof id === "string" || typeof id === "number" ? String(id) : "unknown";
}
