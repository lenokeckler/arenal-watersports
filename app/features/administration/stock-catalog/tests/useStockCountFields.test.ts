import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { STOCK_ADJUSTMENT_REASON } from "../constants/StockAdjustmentReason.constants";
import {
  STOCK_QUANTITY_FIELD,
  STOCK_QUANTITY_STEP,
} from "../constants/StockQuantityField.constants";
import { STOCK_EMPTY_LEVELS } from "../constants/StockEmptyLevels.constants";
import { useStockCountFields } from "../hooks/useStockCountFields";
import { DEFAULT_STOCK_LEVELS } from "./Stock.constants";

describe("useStockCountFields default reason", () => {
  it("starts as the initial count when no count exists", () => {
    const { result } = renderHook(() =>
      useStockCountFields({
        hasHistory: false,
        levels: STOCK_EMPTY_LEVELS,
      })
    );

    expect(result.current.values.reason).toBe(
      STOCK_ADJUSTMENT_REASON.INITIAL_COUNT
    );
  });

  it("starts as a correction when a stock row already holds units", () => {
    const { result } = renderHook(() =>
      useStockCountFields({
        hasHistory: false,
        levels: DEFAULT_STOCK_LEVELS,
      })
    );

    expect(result.current.values.reason).toBe(
      STOCK_ADJUSTMENT_REASON.COUNT_CORRECTION
    );
  });

  it("starts as a correction when movements exist", () => {
    const { result } = renderHook(() =>
      useStockCountFields({
        hasHistory: true,
        levels: STOCK_EMPTY_LEVELS,
      })
    );

    expect(result.current.values.reason).toBe(
      STOCK_ADJUSTMENT_REASON.COUNT_CORRECTION
    );
  });
});

describe("useStockCountFields quantity steps", () => {
  it("adds one unit to the stepped field only", () => {
    const { result } = renderHook(() =>
      useStockCountFields({
        hasHistory: true,
        levels: DEFAULT_STOCK_LEVELS,
      })
    );

    act(() => {
      result.current.handlers.onQuantityStep(
        STOCK_QUANTITY_FIELD.DAMAGED,
        STOCK_QUANTITY_STEP.INCREASE
      );
    });

    expect(result.current.values.damaged).toBe(
      `${DEFAULT_STOCK_LEVELS.damaged + 1}`
    );
    expect(result.current.values.available).toBe(
      `${DEFAULT_STOCK_LEVELS.available}`
    );
  });

  it("stops at zero when removing from an empty field", () => {
    const { result } = renderHook(() =>
      useStockCountFields({
        hasHistory: false,
        levels: STOCK_EMPTY_LEVELS,
      })
    );

    act(() => {
      result.current.handlers.onQuantityStep(
        STOCK_QUANTITY_FIELD.IN_REPAIR,
        STOCK_QUANTITY_STEP.DECREASE
      );
    });

    expect(result.current.values.inRepair).toBe("0");
  });
});
