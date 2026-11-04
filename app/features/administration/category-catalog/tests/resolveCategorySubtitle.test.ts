import { describe, expect, it } from "vitest";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { resolveCategorySubtitle } from "../utils/resolveCategorySubtitle";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

describe("resolveCategorySubtitle", () => {
  it("names a by-quantity category with its current quantity", () => {
    expect(
      resolveCategorySubtitle({
        ...DEFAULT_CATEGORY_LIST_ITEM,
        trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
        currentQuantity: 24,
      })
    ).toBe("Por cantidad · 24 unidades");
  });

  it("names a by-unit category with its current units", () => {
    expect(
      resolveCategorySubtitle({
        ...DEFAULT_CATEGORY_LIST_ITEM,
        trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
        currentQuantity: 6,
      })
    ).toBe("Por unidad · 6 unidades");
  });

  it("writes one unit in the singular", () => {
    expect(
      resolveCategorySubtitle({
        ...DEFAULT_CATEGORY_LIST_ITEM,
        currentQuantity: 1,
      })
    ).toBe("Por unidad · 1 unidad");
  });

  it("writes an empty category as zero units", () => {
    expect(
      resolveCategorySubtitle({
        ...DEFAULT_CATEGORY_LIST_ITEM,
        currentQuantity: 0,
      })
    ).toBe("Por unidad · 0 unidades");
  });
});
