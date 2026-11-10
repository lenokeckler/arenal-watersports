import { describe, expect, it } from "vitest";
import { STOCK_ADJUSTMENT_REASON } from "../constants/StockAdjustmentReason.constants";
import { mapStockFormValuesToInput } from "../utils/mapStockFormValuesToInput";
import { mapStockLevelsToFormValues } from "../utils/mapStockLevelsToFormValues";
import { parseStockQuantity } from "../utils/parseStockQuantity";
import { resolveStockDefaultReason } from "../utils/resolveStockDefaultReason";
import { resolveStockFormTotal } from "../utils/resolveStockFormTotal";
import {
  DEFAULT_STOCK_LEVELS,
  FAKE_EXPIRY_DATE,
  FAKE_STOCK_CATEGORY_ID,
} from "./Stock.constants";
import {
  buildStockFormValues,
  FRACTION_QUANTITY_TEXT,
  INVALID_QUANTITY_TEXT,
  SPACED_QUANTITY,
  SPACED_QUANTITY_TEXT,
  TYPED_AVAILABLE,
  TYPED_DAMAGED,
  TYPED_IN_REPAIR,
  TYPED_TOTAL,
} from "./StockCount.constants";

describe("parseStockQuantity", () => {
  it("reads a whole number, ignoring surrounding spaces", () => {
    expect(parseStockQuantity(SPACED_QUANTITY_TEXT)).toBe(
      SPACED_QUANTITY
    );
  });

  it.each([
    "",
    INVALID_QUANTITY_TEXT,
    FRACTION_QUANTITY_TEXT,
    "-1",
  ])("reads %j as not a number", (text) => {
    expect(parseStockQuantity(text)).toBeNaN();
  });
});

describe("resolveStockFormTotal", () => {
  it("adds the three counts", () => {
    expect(
      resolveStockFormTotal(
        buildStockFormValues({
          available: TYPED_AVAILABLE,
          damaged: TYPED_DAMAGED,
          inRepair: TYPED_IN_REPAIR,
        })
      )
    ).toBe(TYPED_TOTAL);
  });

  it("counts a field that is not a number as zero", () => {
    expect(
      resolveStockFormTotal(
        buildStockFormValues({
          available: INVALID_QUANTITY_TEXT,
          damaged: TYPED_DAMAGED,
          inRepair: TYPED_IN_REPAIR,
        })
      )
    ).toBe(Number(TYPED_DAMAGED) + Number(TYPED_IN_REPAIR));
  });
});

describe("mapStockLevelsToFormValues", () => {
  it("writes each count as text and a missing expiry date as empty", () => {
    expect(
      mapStockLevelsToFormValues(
        DEFAULT_STOCK_LEVELS,
        STOCK_ADJUSTMENT_REASON.LOST
      )
    ).toEqual(
      buildStockFormValues({
        reason: STOCK_ADJUSTMENT_REASON.LOST,
      })
    );
  });

  it("keeps the stored expiry date", () => {
    expect(
      mapStockLevelsToFormValues(
        {
          ...DEFAULT_STOCK_LEVELS,
          expiryDate: FAKE_EXPIRY_DATE,
        },
        STOCK_ADJUSTMENT_REASON.LOST
      ).expiryDate
    ).toBe(FAKE_EXPIRY_DATE);
  });
});

describe("resolveStockDefaultReason", () => {
  it("is the initial count until a count exists, then a correction", () => {
    expect(resolveStockDefaultReason(false)).toBe(
      STOCK_ADJUSTMENT_REASON.INITIAL_COUNT
    );
    expect(resolveStockDefaultReason(true)).toBe(
      STOCK_ADJUSTMENT_REASON.COUNT_CORRECTION
    );
  });
});

describe("mapStockFormValuesToInput", () => {
  it("builds numbers, the category id and a null expiry for an empty date", () => {
    expect(
      mapStockFormValuesToInput(
        buildStockFormValues(),
        FAKE_STOCK_CATEGORY_ID
      )
    ).toEqual({
      available: DEFAULT_STOCK_LEVELS.available,
      categoryId: FAKE_STOCK_CATEGORY_ID,
      damaged: DEFAULT_STOCK_LEVELS.damaged,
      expiryDate: null,
      inRepair: DEFAULT_STOCK_LEVELS.inRepair,
      reason: STOCK_ADJUSTMENT_REASON.COUNT_CORRECTION,
    });
  });

  it("keeps a typed expiry date", () => {
    expect(
      mapStockFormValuesToInput(
        buildStockFormValues({
          expiryDate: FAKE_EXPIRY_DATE,
        }),
        FAKE_STOCK_CATEGORY_ID
      ).expiryDate
    ).toBe(FAKE_EXPIRY_DATE);
  });
});
