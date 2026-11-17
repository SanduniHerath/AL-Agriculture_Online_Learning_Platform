/**
 * Application error type. Services throw these; the error-handler middleware
 * turns them into a consistent JSON response:
 *
 *   { "error": { "code": "NOT_FOUND", "message": "Unit not found", "details"?: ... } }
 */
export class AppError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }

  static badRequest(message: string, details?: unknown): AppError {
    return new AppError(400, "BAD_REQUEST", message, details);
  }
  static unauthorized(message = "Authentication required"): AppError {
    return new AppError(401, "UNAUTHORIZED", message);
  }
  static forbidden(message = "You do not have access to this resource"): AppError {
    return new AppError(403, "FORBIDDEN", message);
  }
  static notFound(message = "Not found"): AppError {
    return new AppError(404, "NOT_FOUND", message);
  }
  static conflict(message: string): AppError {
    return new AppError(409, "CONFLICT", message);
  }
  static tooManyRequests(message = "Too many requests, please try again later"): AppError {
    return new AppError(429, "RATE_LIMITED", message);
  }
}
