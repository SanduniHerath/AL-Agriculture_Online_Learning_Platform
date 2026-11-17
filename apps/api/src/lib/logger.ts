import pino from "pino";
import { env, isProduction } from "../config/env.js";

/**
 * Application logger. In development it prints readable coloured lines;
 * in production it emits one JSON object per line for log collectors.
 * Sensitive fields are redacted so they never reach log files.
 */
export const logger = pino({
  level: env.LOG_LEVEL,
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "res.headers['set-cookie']",
      "*.password",
      "*.passwordHash",
      "*.otp",
      "*.token",
      "*.merchant_secret",
    ],
    censor: "[REDACTED]",
  },
  ...(isProduction
    ? {}
    : {
        transport: {
          target: "pino-pretty",
          options: { colorize: true, translateTime: "HH:MM:ss", ignore: "pid,hostname" },
        },
      }),
});
