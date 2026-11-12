import { describe, expect, it } from "vitest";
import { computeBarPercent } from "../utils/computeBarPercent";
import {
  ABOVE_LARGEST_AMOUNT,
  EXPECTED_NEAR_FULL_PERCENT,
  NEAR_FULL_AMOUNT,
  NOT_A_NUMBER_AMOUNT,
  EXPECTED_FULL_PERCENT,
  EXPECTED_HALF_PERCENT,
  EXPECTED_MIN_PERCENT,
  EXPECTED_ROUNDED_PERCENT,
  HALF_OF_LARGEST,
  LARGEST_AMOUNT,
  NO_LARGEST_AMOUNT,
  ROUNDED_AMOUNT,
  TINY_AMOUNT,
} from "./DailyIncomeUtils.constants";

describe("computeBarPercent", () => {
  it("draws the largest amount of a currency at the full width", () => {
    expect(
      computeBarPercent(LARGEST_AMOUNT, LARGEST_AMOUNT)
    ).toBe(EXPECTED_FULL_PERCENT);
  });

  it("draws an amount in proportion to the largest one", () => {
    expect(
      computeBarPercent(HALF_OF_LARGEST, LARGEST_AMOUNT)
    ).toBe(EXPECTED_HALF_PERCENT);
  });

  it("rounds the proportion to a whole percent", () => {
    expect(
      computeBarPercent(ROUNDED_AMOUNT, LARGEST_AMOUNT)
    ).toBe(EXPECTED_ROUNDED_PERCENT);
  });

  it("keeps a tiny amount visible with the minimum width", () => {
    expect(
      computeBarPercent(TINY_AMOUNT, LARGEST_AMOUNT)
    ).toBe(EXPECTED_MIN_PERCENT);
  });

  it("falls back to the minimum width when there is no largest amount", () => {
    expect(
      computeBarPercent(TINY_AMOUNT, NO_LARGEST_AMOUNT)
    ).toBe(EXPECTED_MIN_PERCENT);
  });

  it("rounds an amount just under the largest up to the full width", () => {
    expect(
      computeBarPercent(NEAR_FULL_AMOUNT, LARGEST_AMOUNT)
    ).toBe(EXPECTED_NEAR_FULL_PERCENT);
  });

  it("never draws a bar wider than the full width", () => {
    expect(
      computeBarPercent(
        ABOVE_LARGEST_AMOUNT,
        LARGEST_AMOUNT
      )
    ).toBeLessThanOrEqual(EXPECTED_FULL_PERCENT);
  });

  it("falls back to the minimum width when the amount is not a number", () => {
    expect(
      computeBarPercent(NOT_A_NUMBER_AMOUNT, LARGEST_AMOUNT)
    ).toBe(EXPECTED_MIN_PERCENT);
  });
});
