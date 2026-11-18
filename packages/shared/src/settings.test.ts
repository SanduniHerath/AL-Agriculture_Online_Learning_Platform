import { describe, expect, it } from "vitest";
import {
  computeAccessExpiry,
  SITE_SETTING_DEFAULTS,
  SITE_SETTING_KEYS,
  siteSettingSchemas,
} from "./settings.js";

describe("site setting defaults", () => {
  it.each(SITE_SETTING_KEYS)("default for %s passes its own schema", (key) => {
    expect(siteSettingSchemas[key].safeParse(SITE_SETTING_DEFAULTS[key]).success).toBe(true);
  });

  it("defaults to lifetime access and a 2-device limit", () => {
    expect(SITE_SETTING_DEFAULTS["access.duration.unit"]).toEqual({ mode: "LIFETIME" });
    expect(SITE_SETTING_DEFAULTS["security.deviceLimit"]).toBe(2);
  });

  it("rejects invalid values", () => {
    const duration = siteSettingSchemas["access.duration.unit"];
    expect(duration.safeParse({ mode: "FIXED_MONTHS", months: 0 }).success).toBe(false);
    expect(duration.safeParse({ mode: "FIXED_DATE", date: "31/12/2026" }).success).toBe(false);
    expect(siteSettingSchemas["contact.whatsapp"].safeParse("0771234567").success).toBe(false);
    expect(siteSettingSchemas["contact.whatsapp"].safeParse("94771234567").success).toBe(true);
  });
});

describe("computeAccessExpiry", () => {
  const purchased = new Date("2026-01-31T10:00:00Z");

  it("returns null for lifetime access", () => {
    expect(computeAccessExpiry({ mode: "LIFETIME" }, purchased)).toBeNull();
  });

  it("adds months, clamping to the end of shorter months", () => {
    expect(
      computeAccessExpiry({ mode: "FIXED_MONTHS", months: 12 }, purchased)?.toISOString(),
    ).toBe("2027-01-31T10:00:00.000Z");
    // 31 January + 1 month = 28 February (not 3 March)
    expect(computeAccessExpiry({ mode: "FIXED_MONTHS", months: 1 }, purchased)?.toISOString()).toBe(
      "2026-02-28T10:00:00.000Z",
    );
  });

  it("ends a fixed date at 23:59:59.999 Sri Lanka time", () => {
    expect(
      computeAccessExpiry({ mode: "FIXED_DATE", date: "2026-12-31" }, purchased)?.toISOString(),
    ).toBe("2026-12-31T18:29:59.999Z");
  });
});
