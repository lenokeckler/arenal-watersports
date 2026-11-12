import { describe, expect, it } from "vitest";
import { STOCK_EMPTY_LEVELS } from "../constants/StockEmptyLevels.constants";
import { mapAdjustStockInputToRpcArgs } from "../utils/mapAdjustStockInputToRpcArgs";
import { mapStockCategoryRowToCategory } from "../utils/mapStockCategoryRowToCategory";
import { mapStockLevelsRowToLevels } from "../utils/mapStockLevelsRowToLevels";
import { mapStockMovementRowToItem } from "../utils/mapStockMovementRowToItem";
import {
  DEFAULT_ADJUST_STOCK_INPUT,
  DEFAULT_STOCK_CATEGORY,
  DEFAULT_STOCK_CATEGORY_ROW,
  DEFAULT_STOCK_LEVELS,
  DEFAULT_STOCK_MOVEMENT_ITEM,
  DEFAULT_STOCK_MOVEMENT_ROW,
  FAKE_EXPIRY_DATE,
  FAKE_STOCK_CATEGORY_ID,
} from "./Stock.constants";

describe("stock mappers", () => {
  it("flags the category as having an expiry alert when it has expiry days", () => {
    expect(
      mapStockCategoryRowToCategory(
        DEFAULT_STOCK_CATEGORY_ROW
      )
    ).toEqual(DEFAULT_STOCK_CATEGORY);
    expect(
      mapStockCategoryRowToCategory({
        ...DEFAULT_STOCK_CATEGORY_ROW,
        alert_expiry_days: null,
      }).hasExpiryAlert
    ).toBe(false);
  });

  it("maps a stock row to levels", () => {
    expect(
      mapStockLevelsRowToLevels({
        expiry_date: null,
        quantity_available: 10,
        quantity_damaged: 2,
        quantity_in_repair: 1,
      })
    ).toEqual(DEFAULT_STOCK_LEVELS);
  });

  it("starts a never-counted category at zero", () => {
    expect(STOCK_EMPTY_LEVELS).toEqual({
      available: 0,
      damaged: 0,
      expiryDate: null,
      inRepair: 0,
    });
  });

  it("maps a movement row with from-to totals", () => {
    expect(
      mapStockMovementRowToItem(DEFAULT_STOCK_MOVEMENT_ROW)
    ).toEqual(DEFAULT_STOCK_MOVEMENT_ITEM);
  });

  it("omits the expiry date argument when there is none", () => {
    expect(
      mapAdjustStockInputToRpcArgs(
        DEFAULT_ADJUST_STOCK_INPUT
      )
    ).toEqual({
      p_available: 8,
      p_category_id: FAKE_STOCK_CATEGORY_ID,
      p_damaged: 2,
      p_expiry_date: undefined,
      p_in_repair: 1,
      p_reason: DEFAULT_ADJUST_STOCK_INPUT.reason,
    });
  });

  it("sends the expiry date when there is one", () => {
    expect(
      mapAdjustStockInputToRpcArgs({
        ...DEFAULT_ADJUST_STOCK_INPUT,
        expiryDate: FAKE_EXPIRY_DATE,
      }).p_expiry_date
    ).toBe(FAKE_EXPIRY_DATE);
  });
});
