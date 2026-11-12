import { describe, expect, it } from "vitest";
import { STOCK_CATALOG_COPY } from "../constants/StockCatalogCopy.constants";
import type { StockAdjustmentReason } from "../constants/StockAdjustmentReason.constants";
import { validateStockAdjustment } from "../utils/validateStockAdjustment";
import {
  DEFAULT_ADJUST_STOCK_INPUT,
  DEFAULT_STOCK_ADJUSTMENT_CONTEXT,
  DEFAULT_STOCK_LEVELS,
  FAKE_EXPIRY_DATE,
  FAKE_IMPOSSIBLE_EXPIRY_DATE,
  FAKE_MALFORMED_EXPIRY_DATE,
  INVALID_QUANTITIES,
} from "./Stock.constants";

const EXPIRY_CONTEXT = {
  ...DEFAULT_STOCK_ADJUSTMENT_CONTEXT,
  hasExpiryAlert: true,
};

describe("validateStockAdjustment", () => {
  it("accepts a changed count with a valid reason", () => {
    expect(
      validateStockAdjustment(
        DEFAULT_ADJUST_STOCK_INPUT,
        DEFAULT_STOCK_ADJUSTMENT_CONTEXT
      )
    ).toBeUndefined();
  });

  it.each(INVALID_QUANTITIES)(
    "refuses %s as a quantity",
    (invalidQuantity) => {
      expect(
        validateStockAdjustment(
          {
            ...DEFAULT_ADJUST_STOCK_INPUT,
            damaged: invalidQuantity,
          },
          DEFAULT_STOCK_ADJUSTMENT_CONTEXT
        )
      ).toBe(STOCK_CATALOG_COPY.QUANTITY_INVALID_ERROR);
    }
  );

  it("refuses a reason outside the closed set", () => {
    expect(
      validateStockAdjustment(
        {
          ...DEFAULT_ADJUST_STOCK_INPUT,
          reason: "stolen" as StockAdjustmentReason,
        },
        DEFAULT_STOCK_ADJUSTMENT_CONTEXT
      )
    ).toBe(STOCK_CATALOG_COPY.REASON_INVALID_ERROR);
  });

  it("refuses an expiry date when the category has no expiry alert", () => {
    expect(
      validateStockAdjustment(
        {
          ...DEFAULT_ADJUST_STOCK_INPUT,
          expiryDate: FAKE_EXPIRY_DATE,
        },
        DEFAULT_STOCK_ADJUSTMENT_CONTEXT
      )
    ).toBe(STOCK_CATALOG_COPY.EXPIRY_NOT_APPLICABLE_ERROR);
  });

  it("accepts an expiry date when the category has an expiry alert", () => {
    expect(
      validateStockAdjustment(
        {
          ...DEFAULT_ADJUST_STOCK_INPUT,
          expiryDate: FAKE_EXPIRY_DATE,
        },
        EXPIRY_CONTEXT
      )
    ).toBeUndefined();
  });

  it.each([
    FAKE_MALFORMED_EXPIRY_DATE,
    FAKE_IMPOSSIBLE_EXPIRY_DATE,
  ])("refuses the expiry date %s", (invalidDate) => {
    expect(
      validateStockAdjustment(
        {
          ...DEFAULT_ADJUST_STOCK_INPUT,
          expiryDate: invalidDate,
        },
        EXPIRY_CONTEXT
      )
    ).toBe(STOCK_CATALOG_COPY.EXPIRY_DATE_INVALID_ERROR);
  });

  it("refuses an adjustment that changes nothing", () => {
    expect(
      validateStockAdjustment(
        {
          ...DEFAULT_ADJUST_STOCK_INPUT,
          available: DEFAULT_STOCK_LEVELS.available,
        },
        DEFAULT_STOCK_ADJUSTMENT_CONTEXT
      )
    ).toBe(STOCK_CATALOG_COPY.ADJUSTMENT_UNCHANGED_ERROR);
  });

  it("accepts a change that only moves the expiry date", () => {
    expect(
      validateStockAdjustment(
        {
          ...DEFAULT_ADJUST_STOCK_INPUT,
          available: DEFAULT_STOCK_LEVELS.available,
          expiryDate: FAKE_EXPIRY_DATE,
        },
        EXPIRY_CONTEXT
      )
    ).toBeUndefined();
  });
});
