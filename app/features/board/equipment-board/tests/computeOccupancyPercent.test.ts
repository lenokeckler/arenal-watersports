import { describe, expect, it } from "vitest";
import { computeOccupancyPercent } from "../utils/computeOccupancyPercent";
import {
  OCCUPANCY_CASES,
  OCCUPANCY_EXPECTED,
} from "./EquipmentBoardUtils.constants";

describe("computeOccupancyPercent", () => {
  it("returns zero when the total is zero", () => {
    const { inUse, total } = OCCUPANCY_CASES.ZERO_TOTAL;

    expect(computeOccupancyPercent(inUse, total)).toBe(
      OCCUPANCY_EXPECTED.EMPTY
    );
  });

  it("returns the maximum when everything is in use", () => {
    const { inUse, total } = OCCUPANCY_CASES.FULL;

    expect(computeOccupancyPercent(inUse, total)).toBe(
      OCCUPANCY_EXPECTED.FULL
    );
  });

  it("clamps above the maximum", () => {
    const { inUse, total } = OCCUPANCY_CASES.CLAMPED_ABOVE;

    expect(computeOccupancyPercent(inUse, total)).toBe(
      OCCUPANCY_EXPECTED.FULL
    );
  });

  it("clamps below zero", () => {
    const { inUse, total } = OCCUPANCY_CASES.CLAMPED_BELOW;

    expect(computeOccupancyPercent(inUse, total)).toBe(
      OCCUPANCY_EXPECTED.EMPTY
    );
  });

  it("rounds down to an integer", () => {
    const { inUse, total } = OCCUPANCY_CASES.ROUNDED_DOWN;

    expect(computeOccupancyPercent(inUse, total)).toBe(
      OCCUPANCY_EXPECTED.ROUNDED_DOWN
    );
  });

  it("rounds up to an integer", () => {
    const { inUse, total } = OCCUPANCY_CASES.ROUNDED_UP;

    expect(computeOccupancyPercent(inUse, total)).toBe(
      OCCUPANCY_EXPECTED.ROUNDED_UP
    );
  });
});
