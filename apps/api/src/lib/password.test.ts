import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password.js";

describe("password hashing", () => {
  it("produces a salted Argon2id hash that verifies", async () => {
    const first = await hashPassword("goodpass1");
    const second = await hashPassword("goodpass1");

    expect(first.startsWith("$argon2id$")).toBe(true);
    expect(first).not.toBe(second); // different salt each time
    expect(await verifyPassword(first, "goodpass1")).toBe(true);
    expect(await verifyPassword(first, "wrongpass1")).toBe(false);
  });

  it("returns false for a malformed hash instead of throwing", async () => {
    expect(await verifyPassword("not-a-hash", "goodpass1")).toBe(false);
  });
});
