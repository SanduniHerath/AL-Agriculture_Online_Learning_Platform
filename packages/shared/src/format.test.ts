import { describe, expect, it } from "vitest";
import { formatDate, formatDuration, formatLkr, formatTime, formatUnitNumber } from "./format.js";

describe("formatLkr", () => {
  it("formats rupees with the language's prefix and comma grouping", () => {
    expect(formatLkr(1500, "en")).toBe("Rs. 1,500");
    expect(formatLkr(1500, "si")).toBe("රු. 1,500");
    expect(formatLkr(125000, "en")).toBe("Rs. 125,000");
    expect(formatLkr(750, "si")).toBe("රු. 750");
  });
});

describe("formatDate / formatTime", () => {
  // 2026-04-17 20:00 UTC is already 18 April 01:30 in Sri Lanka (UTC+05:30).
  const lateUtc = new Date("2026-04-17T20:00:00Z");

  it("uses DD/MM/YYYY in Asia/Colombo", () => {
    expect(formatDate(lateUtc)).toBe("18/04/2026");
    expect(formatDate("2026-01-05T00:00:00+05:30")).toBe("05/01/2026");
  });

  it("uses hh:mm AM/PM in Asia/Colombo", () => {
    expect(formatTime(lateUtc)).toBe("01:30 AM");
  });
});

describe("formatDuration", () => {
  it("formats seconds as mm:ss or h:mm:ss", () => {
    expect(formatDuration(760)).toBe("12:40");
    expect(formatDuration(65)).toBe("01:05");
    expect(formatDuration(12_000)).toBe("3:20:00");
  });
});

describe("formatUnitNumber", () => {
  it("zero-pads to two digits", () => {
    expect(formatUnitNumber(1)).toBe("01");
    expect(formatUnitNumber(19)).toBe("19");
  });
});
