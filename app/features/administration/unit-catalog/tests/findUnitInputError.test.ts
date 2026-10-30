import { describe, expect, it } from "vitest";
import { UNIT_FORM_ERROR_COPY } from "../constants/UnitFormErrorCopy.constants";
import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import { findUnitInputError } from "../utils/findUnitInputError";
import { buildCreateUnitInput } from "./Unit.constants";

const NEGATIVE_AMOUNT = -1;
const THREE_DECIMALS = 1.234;
const FUEL_ABOVE_MAX = 5;
const FUEL_MAX_TOO_HIGH = 21;
const FRACTIONAL_FUEL_MAX = 4.5;

describe("findUnitInputError", () => {
  it("accepts the default input", () => {
    expect(
      findUnitInputError(buildCreateUnitInput())
    ).toBeUndefined();
  });

  it.each([
    [
      "a negative usage",
      { usageTotal: NEGATIVE_AMOUNT },
      UNIT_FORM_ERROR_COPY.DECIMAL_INVALID,
    ],
    [
      "a negative oil change",
      { nextOilChangeAt: NEGATIVE_AMOUNT },
      UNIT_FORM_ERROR_COPY.DECIMAL_INVALID,
    ],
    [
      "three decimals",
      { usageTotal: THREE_DECIMALS },
      UNIT_FORM_ERROR_COPY.DECIMAL_INVALID,
    ],
    [
      "a non-finite usage",
      { usageTotal: Number.NaN },
      UNIT_FORM_ERROR_COPY.DECIMAL_INVALID,
    ],
    [
      "gauge bars above the limit",
      { fuelMax: FUEL_MAX_TOO_HIGH },
      UNIT_FORM_ERROR_COPY.FUEL_MAX_INVALID,
    ],
    [
      "fractional gauge bars",
      { fuelMax: FRACTIONAL_FUEL_MAX },
      UNIT_FORM_ERROR_COPY.FUEL_MAX_INVALID,
    ],
    [
      "a fuel level above the bars",
      { fuelMax: 4, fuelLevel: FUEL_ABOVE_MAX },
      UNIT_FORM_ERROR_COPY.FUEL_LEVEL_ABOVE_MAX,
    ],
    [
      "the decommissioned status",
      { status: UNIT_STATUS.DECOMMISSIONED },
      UNIT_FORM_ERROR_COPY.STATUS_INVALID,
    ],
  ])("refuses %s", (_description, overrides, message) => {
    expect(
      findUnitInputError(buildCreateUnitInput(overrides))
    ).toBe(message);
  });
});
