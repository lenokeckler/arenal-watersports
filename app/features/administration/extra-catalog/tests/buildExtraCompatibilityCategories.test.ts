import { describe, expect, it } from "vitest";
import { buildExtraCompatibilityCategories } from "../utils/buildExtraCompatibilityCategories";
import {
  COMPATIBILITY_CATEGORY_ROW,
  COMPATIBILITY_CATEGORY_SUMMARY,
  EMPTY_COMPATIBILITY_CATEGORY_ROW,
  LINKED_UNIT_ID,
  OTHER_CATEGORY_UNIT_ID,
} from "./ExtraCompatibility.constants";

describe("buildExtraCompatibilityCategories", () => {
  it("counts the units of a category without the decommissioned ones and the linked among them", () => {
    expect(
      buildExtraCompatibilityCategories(
        [COMPATIBILITY_CATEGORY_ROW],
        new Set([LINKED_UNIT_ID])
      )
    ).toEqual([COMPATIBILITY_CATEGORY_SUMMARY]);
  });

  it("ignores links to units of other categories", () => {
    const [category] = buildExtraCompatibilityCategories(
      [COMPATIBILITY_CATEGORY_ROW],
      new Set([OTHER_CATEGORY_UNIT_ID])
    );

    expect(category.linkedUnitCount).toBe(0);
  });

  it("leaves out a category whose units are all decommissioned", () => {
    expect(
      buildExtraCompatibilityCategories(
        [EMPTY_COMPATIBILITY_CATEGORY_ROW],
        new Set()
      )
    ).toEqual([]);
  });
});
