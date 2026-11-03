import { describe, expect, it } from "vitest";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_COUNT_SYMBOL } from "../constants/StockCountSymbol.constants";
import { STOCK_QUANTITY_STEP } from "../constants/StockQuantityField.constants";
import { formatStockDelta } from "../utils/formatStockDelta";
import { formatStockValueChange } from "../utils/formatStockValueChange";
import { resolveStockCountSummary } from "../utils/resolveStockCountSummary";
import { resolveStockQuantityChanges } from "../utils/resolveStockQuantityChanges";
import { stepStockQuantity } from "../utils/stepStockQuantity";
import { DEFAULT_STOCK_LEVELS } from "./Stock.constants";
import {
  INVALID_QUANTITY_TEXT,
  buildStockFormValues,
} from "./StockCount.constants";

const ARROW = STOCK_COUNT_COPY.MOVEMENT_ARROW;

describe("formatStockDelta", () => {
  it("signs a gain, a loss and hides no difference", () => {
    expect(formatStockDelta(3)).toBe(
      `${STOCK_COUNT_SYMBOL.PLUS}3`
    );
    expect(formatStockDelta(-2)).toBe(
      `${STOCK_COUNT_SYMBOL.MINUS}2`
    );
    expect(formatStockDelta(0)).toBe("");
    expect(formatStockDelta(Number.NaN)).toBe("");
  });
});

describe("formatStockValueChange", () => {
  it("writes from to only when they differ", () => {
    expect(formatStockValueChange(9, 12)).toBe(
      `9 ${ARROW} 12`
    );
    expect(formatStockValueChange(12, 12)).toBe("12");
  });
});

describe("resolveStockQuantityChanges", () => {
  it("compares each typed value with the saved one", () => {
    expect(
      resolveStockQuantityChanges(
        DEFAULT_STOCK_LEVELS,
        buildStockFormValues({
          available: "13",
          damaged: "2",
          inRepair: "0",
        })
      )
    ).toEqual({
      available: `${STOCK_COUNT_SYMBOL.PLUS}3`,
      damaged: "",
      inRepair: `${STOCK_COUNT_SYMBOL.MINUS}1`,
    });
  });

  it("shows nothing for a value that is not a number yet", () => {
    expect(
      resolveStockQuantityChanges(
        DEFAULT_STOCK_LEVELS,
        buildStockFormValues({
          available: INVALID_QUANTITY_TEXT,
        })
      ).available
    ).toBe("");
  });
});

describe("resolveStockCountSummary", () => {
  it("splits the typed units into usable and needing attention", () => {
    const summary = resolveStockCountSummary(
      DEFAULT_STOCK_LEVELS,
      buildStockFormValues({
        available: "10",
        damaged: "2",
        inRepair: "3",
      })
    );

    expect(summary.available).toBe(10);
    expect(summary.attention).toBe(5);
    expect(summary.totalText).toBe(`13 ${ARROW} 15`);
  });

  it("shows only the total when nothing changed", () => {
    expect(
      resolveStockCountSummary(
        DEFAULT_STOCK_LEVELS,
        buildStockFormValues({
          available: "10",
          damaged: "2",
          inRepair: "1",
        })
      ).totalText
    ).toBe("13");
  });
});

describe("stepStockQuantity", () => {
  it("adds and removes one unit", () => {
    expect(
      stepStockQuantity("4", STOCK_QUANTITY_STEP.INCREASE)
    ).toBe("5");
    expect(
      stepStockQuantity("4", STOCK_QUANTITY_STEP.DECREASE)
    ).toBe("3");
  });

  it("never goes below zero", () => {
    expect(
      stepStockQuantity("0", STOCK_QUANTITY_STEP.DECREASE)
    ).toBe("0");
  });

  it("starts from zero when the text is not a number", () => {
    expect(
      stepStockQuantity(
        INVALID_QUANTITY_TEXT,
        STOCK_QUANTITY_STEP.INCREASE
      )
    ).toBe("1");
  });
});
