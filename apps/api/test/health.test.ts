import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";

describe("GET /api/health", () => {
  const app = createApp();

  it("returns ok with a request id header", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ status: "ok", service: "al-agri-api" });
    expect(res.headers["x-request-id"]).toBeTruthy();
  });

  it("echoes a caller-supplied request id", async () => {
    const res = await request(app).get("/api/health").set("x-request-id", "test-123");
    expect(res.headers["x-request-id"]).toBe("test-123");
  });
});

describe("unknown routes", () => {
  const app = createApp();

  it("returns the standard error shape", async () => {
    const res = await request(app).get("/api/does-not-exist");
    expect(res.status).toBe(404);
    const body = res.body as { error: { code: string; requestId: string } };
    expect(body.error).toMatchObject({ code: "NOT_FOUND" });
    expect(typeof body.error.requestId).toBe("string");
  });

  it("does not expose the X-Powered-By header", async () => {
    const res = await request(app).get("/api/health");
    expect(res.headers["x-powered-by"]).toBeUndefined();
  });
});
