import { describe, expect, it } from "vitest";
import { STOCK_EMPTY_LEVELS } from "../constants/StockEmptyLevels.constants";
import { hasRegisteredStockCount } from "../utils/hasRegisteredStockCount";
import { DEFAULT_STOCK_LEVELS } from "./Stock.constants";

describe("hasRegisteredStockCount", () => {
  it("is false for empty levels without movements", () => {
    expect(
      hasRegisteredStockCount(STOCK_EMPTY_LEVELS, false)
    ).toBe(false);
  });

  it("is true when any level holds units, even without movements", () => {
    expect(
      hasRegisteredStockCount(DEFAULT_STOCK_LEVELS, false)
    ).toBe(true);
    expect(
      hasRegisteredStockCount(
        { ...STOCK_EMPTY_LEVELS, inRepair: 1 },
        false
      )
    ).toBe(true);
  });

  it("is true when movements exist even if every level is zero", () => {
    expect(
      hasRegisteredStockCount(STOCK_EMPTY_LEVELS, true)
    ).toBe(true);
  });
});
