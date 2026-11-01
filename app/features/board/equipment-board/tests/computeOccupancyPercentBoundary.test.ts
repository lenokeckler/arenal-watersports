import { describe, expect, it } from "vitest";
import { computeOccupancyPercent } from "../utils/computeOccupancyPercent";
import {
  OCCUPANCY_BOUNDARY_CASES,
  OCCUPANCY_BOUNDARY_EXPECTED,
} from "./EquipmentBoardLocale.constants";

describe("computeOccupancyPercent boundaries", () => {
  it("rounds an exact half up", () => {
    const { inUse, total } =
      OCCUPANCY_BOUNDARY_CASES.HALF_ROUNDS_UP;

    expect(computeOccupancyPercent(inUse, total)).toBe(
      OCCUPANCY_BOUNDARY_EXPECTED.HALF_ROUNDS_UP
    );
  });

  it("returns zero when nothing is in use", () => {
    const { inUse, total } =
      OCCUPANCY_BOUNDARY_CASES.ZERO_IN_USE;

    expect(computeOccupancyPercent(inUse, total)).toBe(
      OCCUPANCY_BOUNDARY_EXPECTED.EMPTY
    );
  });

  it.each([
    OCCUPANCY_BOUNDARY_CASES.NOT_A_NUMBER_IN_USE,
    OCCUPANCY_BOUNDARY_CASES.NOT_A_NUMBER_TOTAL,
  ])("returns zero for a non-finite count", (counts) => {
    expect(
      computeOccupancyPercent(counts.inUse, counts.total)
    ).toBe(OCCUPANCY_BOUNDARY_EXPECTED.EMPTY);
  });

  it("returns zero when the total is negative", () => {
    const { inUse, total } =
      OCCUPANCY_BOUNDARY_CASES.NEGATIVE_TOTAL;

    expect(computeOccupancyPercent(inUse, total)).toBe(
      OCCUPANCY_BOUNDARY_EXPECTED.EMPTY
    );
  });
});
