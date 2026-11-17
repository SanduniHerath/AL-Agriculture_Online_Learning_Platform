import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("lets later classes override earlier ones", () => {
    expect(cn("px-5 py-3", "px-3")).toBe("py-3 px-3");
    expect(cn("bg-primary", "bg-surface")).toBe("bg-surface");
    expect(cn("rounded-button", "rounded-none")).toBe("rounded-none");
  });

  it("keeps a custom font size and a custom colour together", () => {
    expect(cn("text-h1 text-primary")).toBe("text-h1 text-primary");
    expect(cn("text-caption", "text-text-muted")).toBe("text-caption text-text-muted");
  });

  it("resolves conflicts between custom tokens of the same kind", () => {
    expect(cn("text-h1", "text-h2")).toBe("text-h2");
    expect(cn("text-primary", "text-on-primary")).toBe("text-on-primary");
    expect(cn("shadow-sm", "shadow-focus")).toBe("shadow-focus");
  });

  it("ignores falsy values", () => {
    expect(cn("a", false, undefined, null, "b")).toBe("a b");
  });
});
