import { describe, expect, it } from "vitest";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import { isCategoryInactive } from "../utils/isCategoryInactive";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

describe("isCategoryInactive", () => {
  it("returns true for an inactive category", () => {
    const category = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      status: CATEGORY_STATUS.INACTIVE,
    };

    expect(isCategoryInactive(category)).toBe(true);
  });

  it("returns false for an active category", () => {
    const category = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      status: CATEGORY_STATUS.ACTIVE,
    };

    expect(isCategoryInactive(category)).toBe(false);
  });
});
