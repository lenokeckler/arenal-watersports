import { describe, expect, it } from "vitest";
import { fromMinorUnits } from "../fromMinorUnits";
import { toMinorUnits } from "../toMinorUnits";
import {
  EXPECTED_LARGE_COLONES_CENTS,
  EXPECTED_REPEATED_PRICE_CENTS,
  FLOAT_NOISE_AMOUNTS,
  LARGE_COLONES_AMOUNT,
  NO_AMOUNT,
  NO_CENTS,
  PRICE_REPEAT_COUNT,
  PRICE_WITH_CENTS,
} from "./minorUnitsEdges.constants";

describe("toMinorUnits edges", () => {
  it.each(FLOAT_NOISE_AMOUNTS)(
    "turns %s into %s cents despite binary float noise",
    (amount, cents) => {
      expect(toMinorUnits(amount)).toBe(cents);
    }
  );

  it("keeps a large colones amount exact in cents", () => {
    expect(toMinorUnits(LARGE_COLONES_AMOUNT)).toBe(
      EXPECTED_LARGE_COLONES_CENTS
    );
    expect(
      Number.isSafeInteger(
        toMinorUnits(LARGE_COLONES_AMOUNT)
      )
    ).toBe(true);
  });

  it("sums a thousand identical prices without drift", () => {
    const total = Array.from(
      { length: PRICE_REPEAT_COUNT },
      () => toMinorUnits(PRICE_WITH_CENTS)
    ).reduce((sum, cents) => sum + cents, NO_CENTS);

    expect(total).toBe(EXPECTED_REPEATED_PRICE_CENTS);
  });

  it("turns zero into zero cents", () => {
    expect(toMinorUnits(NO_AMOUNT)).toBe(NO_CENTS);
  });
});

describe("fromMinorUnits edges", () => {
  it("round-trips a large colones amount", () => {
    expect(
      fromMinorUnits(toMinorUnits(LARGE_COLONES_AMOUNT))
    ).toBe(LARGE_COLONES_AMOUNT);
  });
});
