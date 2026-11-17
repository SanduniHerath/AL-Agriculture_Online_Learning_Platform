import { describe, expect, it } from "vitest";
import { otpCodeSchema, passwordSchema, slMobileSchema } from "./schemas.js";

describe("slMobileSchema", () => {
  it.each([
    ["0771234567", "+94771234567"],
    ["077 123 4567", "+94771234567"],
    ["77-123-4567", "+94771234567"],
    ["+94771234567", "+94771234567"],
    ["94771234567", "+94771234567"],
  ])("normalises %s to %s", (input, expected) => {
    expect(slMobileSchema.parse(input)).toBe(expected);
  });

  it.each(["12345", "0112345678", "+1771234567", "abc"])("rejects %s", (input) => {
    expect(slMobileSchema.safeParse(input).success).toBe(false);
  });
});

describe("passwordSchema", () => {
  it("requires 8+ characters and a digit", () => {
    expect(passwordSchema.safeParse("short1").success).toBe(false);
    expect(passwordSchema.safeParse("longenoughbutnodigit").success).toBe(false);
    expect(passwordSchema.safeParse("goodpass1").success).toBe(true);
  });
});

describe("otpCodeSchema", () => {
  it("accepts exactly six digits", () => {
    expect(otpCodeSchema.safeParse("123456").success).toBe(true);
    expect(otpCodeSchema.safeParse("12345").success).toBe(false);
    expect(otpCodeSchema.safeParse("12345a").success).toBe(false);
  });
});
