import { describe, expect, it } from "vitest";
import { PATHS } from "@/app/constants";
import { resolveCategoryStockPath } from "../utils/resolveStockPaths";
import { FAKE_STOCK_CATEGORY_ID } from "./Stock.constants";

describe("resolveCategoryStockPath", () => {
  it("places the category id between the list path and the stock segment", () => {
    expect(
      resolveCategoryStockPath(FAKE_STOCK_CATEGORY_ID)
    ).toBe(
      `${PATHS.ADMINISTRATION.CATEGORIES}/${FAKE_STOCK_CATEGORY_ID}/${PATHS.ADMINISTRATION.CATEGORY_STOCK_SEGMENT}`
    );
  });
});
