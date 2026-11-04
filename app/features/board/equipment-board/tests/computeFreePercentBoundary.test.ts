import { describe, expect, it } from "vitest";
import { computeFreePercent } from "../utils/computeFreePercent";
import {
  FREE_PERCENT_BOUNDARY_CASES,
  FREE_PERCENT_BOUNDARY_EXPECTED,
} from "./EquipmentBoardLocale.constants";

describe("computeFreePercent boundaries", () => {
  it("rounds an exact half up", () => {
    const { freeCount, totalCount } =
      FREE_PERCENT_BOUNDARY_CASES.HALF_ROUNDS_UP;

    expect(computeFreePercent(freeCount, totalCount)).toBe(
      FREE_PERCENT_BOUNDARY_EXPECTED.HALF_ROUNDS_UP
    );
  });

  it("returns zero when nothing is free", () => {
    const { freeCount, totalCount } =
      FREE_PERCENT_BOUNDARY_CASES.NONE_FREE;

    expect(computeFreePercent(freeCount, totalCount)).toBe(
      FREE_PERCENT_BOUNDARY_EXPECTED.EMPTY
    );
  });

  it.each([
    FREE_PERCENT_BOUNDARY_CASES.NOT_A_NUMBER_FREE,
    FREE_PERCENT_BOUNDARY_CASES.NOT_A_NUMBER_TOTAL,
    FREE_PERCENT_BOUNDARY_CASES.INFINITE_FREE,
  ])("returns zero for a non-finite count", (counts) => {
    expect(
      computeFreePercent(
        counts.freeCount,
        counts.totalCount
      )
    ).toBe(FREE_PERCENT_BOUNDARY_EXPECTED.EMPTY);
  });

  it("returns zero when the total is negative", () => {
    const { freeCount, totalCount } =
      FREE_PERCENT_BOUNDARY_CASES.NEGATIVE_TOTAL;

    expect(computeFreePercent(freeCount, totalCount)).toBe(
      FREE_PERCENT_BOUNDARY_EXPECTED.EMPTY
    );
  });
});
