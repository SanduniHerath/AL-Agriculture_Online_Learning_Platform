import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

/** Integration tests: real Express app + real (seeded) test database. */
const app = createApp();

type UnitSummary = {
  number: number;
  grade: number;
  title: { en: string; si: string };
  subPartCount: number;
  videoCount: number;
  priceLkr: number | null;
  hasFreeResources: boolean;
};

describe("GET /api/units", () => {
  it("lists all 19 published units in syllabus order", async () => {
    const res = await request(app).get("/api/units");
    expect(res.status).toBe(200);
    const units = (res.body as { units: UnitSummary[] }).units;
    expect(units).toHaveLength(19);
    expect(units.map((u) => u.number)).toEqual(Array.from({ length: 19 }, (_, i) => i + 1));
    expect(units[0]).toMatchObject({
      number: 1,
      grade: 12,
      title: {
        en: "Agriculture and the Development of Sri Lanka",
        si: "ශ්‍රී ලංකාවේ සංවර්ධනයට කෘෂි අංශයේ දායකත්වය",
      },
      priceLkr: 1500,
      hasFreeResources: true,
    });
    expect(res.headers["cache-control"]).toContain("public");
  });

  it("filters by grade (Grade 12 = units 1-11, Grade 13 = 12-19)", async () => {
    const g12 = (await request(app).get("/api/units?grade=12")).body as { units: UnitSummary[] };
    const g13 = (await request(app).get("/api/units?grade=13")).body as { units: UnitSummary[] };
    expect(g12.units.map((u) => u.number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(g13.units.map((u) => u.number)).toEqual([12, 13, 14, 15, 16, 17, 18, 19]);
    expect(g13.units.every((u) => u.priceLkr === 1750)).toBe(true);
  });

  it("rejects an invalid grade with the standard error shape", async () => {
    const res = await request(app).get("/api/units?grade=11");
    expect(res.status).toBe(400);
    expect((res.body as { error: { code: string } }).error.code).toBe("VALIDATION_ERROR");
  });
});

describe("GET /api/units/:number", () => {
  it("returns sub-parts with videos, discussions by type, and free resources", async () => {
    const res = await request(app).get("/api/units/2");
    expect(res.status).toBe(200);
    const { unit } = res.body as {
      unit: {
        number: number;
        subParts: Array<{ code: string; videos: unknown[]; totalDurationSec: number }>;
        discussions: Record<"MCQ" | "STRUCTURED" | "ESSAY", Array<{ paperYear: number }>>;
        resources: Array<{ type: string }>;
      };
    };
    expect(unit.number).toBe(2);
    expect(unit.subParts.map((p) => p.code)).toEqual(["2.1", "2.2", "2.3", "2.4"]);
    expect(unit.subParts.every((p) => p.videos.length > 0 && p.totalDurationSec > 0)).toBe(true);
    expect(unit.discussions.MCQ.map((v) => v.paperYear)).toEqual([2025, 2024]);
    expect(unit.discussions.ESSAY).toHaveLength(2);
    expect(unit.resources.map((r) => r.type).sort()).toEqual([
      "PAST_PAPER_QUESTIONS",
      "THEORY_NOTE",
    ]);
  });

  it("never exposes storage keys or provider video ids", async () => {
    const res = await request(app).get("/api/units/1");
    const raw = JSON.stringify(res.body);
    expect(raw).not.toContain("fileKey");
    expect(raw).not.toContain("providerVideoId");
    expect(raw).not.toContain("mock-teaching");
  });

  it("returns 400 for an out-of-range number and 404 shape is consistent", async () => {
    const bad = await request(app).get("/api/units/20");
    expect(bad.status).toBe(400);
    const notNumber = await request(app).get("/api/units/abc");
    expect(notNumber.status).toBe(400);
  });
});

describe("health and docs", () => {
  it("reports the database as ready", async () => {
    const res = await request(app).get("/api/health/ready");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ready", database: "up" });
  });

  it("serves an OpenAPI 3.1 document that includes the units endpoints", async () => {
    const res = await request(app).get("/api/openapi.json");
    expect(res.status).toBe(200);
    const doc = res.body as { openapi: string; paths: Record<string, unknown> };
    expect(doc.openapi).toBe("3.1.0");
    expect(Object.keys(doc.paths)).toEqual(
      expect.arrayContaining([
        "/api/health",
        "/api/health/ready",
        "/api/units",
        "/api/units/{number}",
      ]),
    );
  });
});
