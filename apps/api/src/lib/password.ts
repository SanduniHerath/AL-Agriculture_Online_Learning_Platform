import { hash, verify } from "@node-rs/argon2";

/**
 * Password hashing with Argon2id (SRS NFR-SEC-03). Parameters follow the OWASP Password
 * Storage Cheat Sheet minimum for Argon2id: 19 MiB memory, 2 iterations, 1 lane.
 * Each hash embeds its own random salt and parameters, so they can be raised later
 * without breaking existing passwords.
 */
const OPTIONS = {
  memoryCost: 19_456, // KiB
  timeCost: 2,
  parallelism: 1,
} as const;

export function hashPassword(password: string): Promise<string> {
  return hash(password, OPTIONS);
}

/** Constant-time comparison; returns false (never throws) for malformed hashes. */
export async function verifyPassword(passwordHash: string, password: string): Promise<boolean> {
  try {
    return await verify(passwordHash, password);
  } catch {
    return false;
  }
}
