import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { env } from "../config/env.js";
import { PrismaClient } from "../generated/prisma/client.js";

/**
 * Prisma 7 talks to MySQL through a "driver adapter" (the MariaDB driver, which fully
 * supports MySQL). We parse DATABASE_URL ourselves so pool size and TLS are explicit.
 */
export function createPrismaClient(databaseUrl: string = env.DATABASE_URL): PrismaClient {
  const url = new URL(databaseUrl);

  const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ""),
    connectionLimit: env.DATABASE_POOL_SIZE,
    // Every connection works in UTC, whatever the server's default is. Prisma reads and
    // writes UTC, and values MySQL fills in itself (CURRENT_TIMESTAMP) must match.
    initSql: "SET time_zone = '+00:00'",
    ...(env.DATABASE_SSL
      ? // Managed MySQL in production: encrypted connection with certificate checks.
        { ssl: { rejectUnauthorized: true } }
      : // Local Docker MySQL has no TLS; MySQL 8's default login method then needs the
        // server's public key to be fetched. Acceptable only on a local network.
        { allowPublicKeyRetrieval: true }),
  });

  return new PrismaClient({
    adapter,
    log: env.LOG_LEVEL === "trace" ? ["query", "warn", "error"] : ["warn", "error"],
  });
}

/** The application's shared client (one connection pool per process). */
export const prisma = createPrismaClient();

/** Lightweight connectivity check used by the readiness endpoint. */
export async function pingDatabase(client: PrismaClient = prisma): Promise<boolean> {
  try {
    await client.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
