import { describe, expect, it } from "vitest";
import { computeBarPercent } from "../utils/computeBarPercent";
import {
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
});
