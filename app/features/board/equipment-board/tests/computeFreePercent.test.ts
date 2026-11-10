import { describe, expect, it } from "vitest";
import { computeFreePercent } from "../utils/computeFreePercent";
import {
  FREE_PERCENT_CASES,
  FREE_PERCENT_EXPECTED,
} from "./EquipmentBoardUtils.constants";

describe("computeFreePercent", () => {
  it("returns zero when the total is zero", () => {
    const { freeCount, totalCount } =
      FREE_PERCENT_CASES.ZERO_TOTAL;

    expect(computeFreePercent(freeCount, totalCount)).toBe(
      FREE_PERCENT_EXPECTED.EMPTY
    );
  });

  it("returns the maximum when everything is free", () => {
    const { freeCount, totalCount } =
      FREE_PERCENT_CASES.FULL;

    expect(computeFreePercent(freeCount, totalCount)).toBe(
      FREE_PERCENT_EXPECTED.FULL
    );
  });

  it("clamps above the maximum", () => {
    const { freeCount, totalCount } =
      FREE_PERCENT_CASES.CLAMPED_ABOVE;

    expect(computeFreePercent(freeCount, totalCount)).toBe(
      FREE_PERCENT_EXPECTED.FULL
    );
  });

  it("clamps below zero", () => {
    const { freeCount, totalCount } =
      FREE_PERCENT_CASES.CLAMPED_BELOW;

    expect(computeFreePercent(freeCount, totalCount)).toBe(
      FREE_PERCENT_EXPECTED.EMPTY
    );
  });

  it("rounds down to an integer", () => {
    const { freeCount, totalCount } =
      FREE_PERCENT_CASES.ROUNDED_DOWN;

    expect(computeFreePercent(freeCount, totalCount)).toBe(
      FREE_PERCENT_EXPECTED.ROUNDED_DOWN
    );
  });

  it("rounds up to an integer", () => {
    const { freeCount, totalCount } =
      FREE_PERCENT_CASES.ROUNDED_UP;

    expect(computeFreePercent(freeCount, totalCount)).toBe(
      FREE_PERCENT_EXPECTED.ROUNDED_UP
    );
  });
});
