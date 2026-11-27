import { describe, expect, it } from "vitest";
import { hasExtraOccupancyChanged } from "../utils/hasExtraOccupancyChanged";
import { FAKE_OCCUPIED_QUANTITY } from "./Extra.constants";
import {
  CHARGE_ONLY_COLUMNS,
  OCCUPYING_COLUMNS,
} from "./ExtraOccupancy.constants";

describe("hasExtraOccupancyChanged", () => {
  it("is false for the same occupancy", () => {
    expect(
      hasExtraOccupancyChanged(
        OCCUPYING_COLUMNS,
        OCCUPYING_COLUMNS
      )
    ).toBe(false);
    expect(
      hasExtraOccupancyChanged(
        CHARGE_ONLY_COLUMNS,
        CHARGE_ONLY_COLUMNS
      )
    ).toBe(false);
  });

  it("is true when the quantity changes", () => {
    expect(
      hasExtraOccupancyChanged(OCCUPYING_COLUMNS, {
        ...OCCUPYING_COLUMNS,
        occupies_quantity: FAKE_OCCUPIED_QUANTITY + 1,
      })
    ).toBe(true);
  });

  it("is true when the extra starts or stops occupying equipment", () => {
    expect(
      hasExtraOccupancyChanged(
        CHARGE_ONLY_COLUMNS,
        OCCUPYING_COLUMNS
      )
    ).toBe(true);
    expect(
      hasExtraOccupancyChanged(
        OCCUPYING_COLUMNS,
        CHARGE_ONLY_COLUMNS
      )
    ).toBe(true);
  });
});
