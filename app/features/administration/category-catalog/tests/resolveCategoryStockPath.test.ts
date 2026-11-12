import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { resolveCategoryStockPath } from "../utils/resolveCategoryStockPath";
import { FAKE_CATEGORY_ID } from "./EquipmentCategoryRow.constants";

describe("resolveCategoryStockPath", () => {
  it("places the category id between the list path and the stock segment", () => {
    expect(resolveCategoryStockPath(FAKE_CATEGORY_ID)).toBe(
      `${PATHS.ADMINISTRATION.CATEGORIES}/${FAKE_CATEGORY_ID}/${PATHS.ADMINISTRATION.CATEGORY_STOCK_SEGMENT}`
    );
  });
});
