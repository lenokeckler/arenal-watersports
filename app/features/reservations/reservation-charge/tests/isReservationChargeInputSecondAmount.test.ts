import { describe, expect, it } from "vitest";
import { isReservationChargeInput } from "../utils/isReservationChargeInput";
import {
  EXTRA_INPUT_KEYS,
  MISSING_SECOND_AMOUNT_KEY,
  NUMERIC_SECOND_AMOUNT,
  OBJECT_SECOND_AMOUNT,
} from "./ReservationChargeMixed.constants";
import {
  MIXED_CHARGE_INPUT,
  VALID_CHARGE_INPUT,
} from "./ReservationChargeValues.constants";

describe("isReservationChargeInput second amount", () => {
  it.each([
    ["null", VALID_CHARGE_INPUT],
    ["a string", MIXED_CHARGE_INPUT],
  ])("accepts %s", (_, input) => {
    expect(isReservationChargeInput(input)).toBe(true);
  });

  it.each([
    ["a number", NUMERIC_SECOND_AMOUNT],
    ["an object", OBJECT_SECOND_AMOUNT],
    ["undefined", undefined],
  ])("refuses %s", (_, secondAmountText) => {
    expect(
      isReservationChargeInput({
        ...VALID_CHARGE_INPUT,
        secondAmountText,
      })
    ).toBe(false);
  });

  it("refuses an input without the key", () => {
    const withoutKey: Record<string, unknown> = {
      ...VALID_CHARGE_INPUT,
    };
    delete withoutKey[MISSING_SECOND_AMOUNT_KEY];

    expect(isReservationChargeInput(withoutKey)).toBe(
      false
    );
  });

  it("accepts an input carrying extra keys", () => {
    expect(
      isReservationChargeInput({
        ...MIXED_CHARGE_INPUT,
        ...EXTRA_INPUT_KEYS,
      })
    ).toBe(true);
  });
});
