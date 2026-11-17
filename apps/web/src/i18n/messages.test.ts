import { IntlMessageFormat } from "intl-messageformat";
import { describe, expect, it } from "vitest";
import en from "../../messages/en.json";
import si from "../../messages/si.json";

type Tree = { [key: string]: string | Tree };

/** Flattens nested messages to { "units.title": "..." }. */
function flatten(tree: Tree, prefix = ""): Record<string, string> {
  return Object.entries(tree).reduce<Record<string, string>>((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") acc[path] = value;
    else Object.assign(acc, flatten(value, path));
    return acc;
  }, {});
}

/** Top-level ICU argument names and rich-text tags used in a message. */
function argumentsOf(message: string): string[] {
  const args = [...message.matchAll(/\{\s*([A-Za-z_]\w*)/g)].map((m) => `{${m[1]}}`);
  const tags = [...message.matchAll(/<([a-z]\w*)>/g)].map((m) => `<${m[1]}>`);
  return [...new Set([...args, ...tags])].sort();
}

const flatEn = flatten(en as Tree);
const flatSi = flatten(si as Tree);

describe("translation messages", () => {
  it("Sinhala and English have exactly the same keys", () => {
    expect(Object.keys(flatSi).sort()).toEqual(Object.keys(flatEn).sort());
  });

  it("no message is empty", () => {
    for (const [key, value] of [...Object.entries(flatEn), ...Object.entries(flatSi)]) {
      expect(value.trim(), key).not.toBe("");
    }
  });

  it.each(Object.keys(flatEn))("%s uses the same placeholders in both languages", (key) => {
    expect(argumentsOf(flatSi[key] ?? "")).toEqual(argumentsOf(flatEn[key] ?? ""));
  });

  it.each(Object.keys(flatEn))("%s is valid ICU syntax in both languages", (key) => {
    expect(() => new IntlMessageFormat(flatEn[key] ?? "", "en")).not.toThrow();
    expect(() => new IntlMessageFormat(flatSi[key] ?? "", "si")).not.toThrow();
  });
});
