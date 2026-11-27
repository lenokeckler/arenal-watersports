import { describe, expect, it } from "vitest";
import { countExtraCompatibilityChanges } from "../utils/countExtraCompatibilityChanges";
import { resolveInitialOpenCategoryIds } from "../utils/resolveInitialOpenCategoryIds";
import {
  COMPATIBILITY_CATEGORY_ID,
  COMPATIBILITY_CATEGORY_SUMMARY,
  FREE_UNIT_ID,
  LINKED_UNIT_ID,
  OTHER_COMPATIBILITY_CATEGORY_ID,
  SINGLE_UNIT_CATEGORY_SUMMARY,
} from "./ExtraCompatibility.constants";

const NO_CHANGES = 0;
const ONE_ADDED_ONE_REMOVED = 2;

describe("countExtraCompatibilityChanges", () => {
  it("counts nothing when the selection matches what was saved", () => {
    expect(
      countExtraCompatibilityChanges(
        { [COMPATIBILITY_CATEGORY_ID]: [LINKED_UNIT_ID] },
        { [COMPATIBILITY_CATEGORY_ID]: [LINKED_UNIT_ID] }
      )
    ).toBe(NO_CHANGES);
  });

  it("counts every unit added or removed", () => {
    expect(
      countExtraCompatibilityChanges(
        { [COMPATIBILITY_CATEGORY_ID]: [LINKED_UNIT_ID] },
        { [COMPATIBILITY_CATEGORY_ID]: [FREE_UNIT_ID] }
      )
    ).toBe(ONE_ADDED_ONE_REMOVED);
  });
});

describe("resolveInitialOpenCategoryIds", () => {
  it("opens the categories that already have boats", () => {
    expect(
      resolveInitialOpenCategoryIds([
        COMPATIBILITY_CATEGORY_SUMMARY,
        SINGLE_UNIT_CATEGORY_SUMMARY,
      ])
    ).toEqual([COMPATIBILITY_CATEGORY_ID]);
  });

  it("opens the first category when none has boats", () => {
    expect(
      resolveInitialOpenCategoryIds([
        SINGLE_UNIT_CATEGORY_SUMMARY,
      ])
    ).toEqual([OTHER_COMPATIBILITY_CATEGORY_ID]);
  });
});
