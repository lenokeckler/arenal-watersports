import { describe, expect, it } from "vitest";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { resolveCategoryTrackingModeLabel } from "../utils/resolveCategoryTrackingModeLabel";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

describe("resolveCategoryTrackingModeLabel", () => {
  it("returns the by-quantity micro label for a by-quantity category", () => {
    const category = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
    };

    expect(resolveCategoryTrackingModeLabel(category)).toBe(
      CATEGORY_CATALOG_COPY.TRACKING_MODE_MICRO_LABEL_BY_QUANTITY
    );
  });

  it("returns the by-unit micro label for a by-unit category", () => {
    const category = {
      ...DEFAULT_CATEGORY_LIST_ITEM,
      trackingMode: CATEGORY_TRACKING_MODE.BY_UNIT,
    };

    expect(resolveCategoryTrackingModeLabel(category)).toBe(
      CATEGORY_CATALOG_COPY.TRACKING_MODE_MICRO_LABEL_BY_UNIT
    );
  });
});
