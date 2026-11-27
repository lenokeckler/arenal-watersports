import { describe, expect, it } from "vitest";
import { isString } from "../isString";

describe("isString", () => {
  it("accepts text and nothing else", () => {
    expect(isString("a")).toBe(true);
    expect(isString(["a"])).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(1)).toBe(false);
  });
});
