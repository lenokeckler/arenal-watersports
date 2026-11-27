import { describe, expect, it } from "vitest";
import { EXTRA_OCCUPANCY_LIMITS } from "../constants/ExtraOccupancyLimits.constants";
import { stepExtraOccupancyQuantity } from "../utils/stepExtraOccupancyQuantity";

const UP = EXTRA_OCCUPANCY_LIMITS.STEP;
const DOWN = -EXTRA_OCCUPANCY_LIMITS.STEP;

describe("stepExtraOccupancyQuantity", () => {
  it.each([
    ["2", UP, "3"],
    ["2", DOWN, "1"],
    ["1", DOWN, "1"],
    ["99", UP, "99"],
    ["", UP, "1"],
    ["abc", DOWN, "1"],
  ])(
    "turns %j with step %i into %j",
    (text, step, expected) => {
      expect(stepExtraOccupancyQuantity(text, step)).toBe(
        expected
      );
    }
  );
});
