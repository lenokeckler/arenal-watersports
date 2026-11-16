import { describe, expect, it } from "vitest";
import { buildExtraCompatibilityCategories } from "../utils/buildExtraCompatibilityCategories";
import {
  COMPATIBILITY_CATEGORY_ID,
  COMPATIBILITY_CATEGORY_NAME,
  COMPATIBILITY_CATEGORY_ROW,
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
    ).toEqual([
      {
        id: COMPATIBILITY_CATEGORY_ID,
        name: COMPATIBILITY_CATEGORY_NAME,
        unitCount: 2,
        linkedUnitCount: 1,
      },
    ]);
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
