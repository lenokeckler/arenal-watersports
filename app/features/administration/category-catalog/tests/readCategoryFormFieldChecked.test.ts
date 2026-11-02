import { describe, expect, it } from "vitest";
import { readCategoryFormFieldChecked } from "../utils/readCategoryFormFieldChecked";
import { buildCategoryFormFieldChangeEvent } from "./buildCategoryFormFieldChangeEvent";

describe("readCategoryFormFieldChecked", () => {
  it("returns true for a checked checkbox", () => {
    const event = buildCategoryFormFieldChangeEvent({
      checked: true,
    });

    expect(readCategoryFormFieldChecked(event)).toBe(true);
  });

  it("returns false for an unchecked checkbox", () => {
    const event = buildCategoryFormFieldChangeEvent({
      checked: false,
    });

    expect(readCategoryFormFieldChecked(event)).toBe(false);
  });

  it("returns false for a target without a checked state", () => {
    const event = buildCategoryFormFieldChangeEvent({
      value: "text",
    });

    expect(readCategoryFormFieldChecked(event)).toBe(false);
  });
});
