import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { STOCK_ADJUSTMENT_REASON } from "../constants/StockAdjustmentReason.constants";
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
