import { describe, expect, it } from "vitest";
import { isReservationChargeInput } from "../utils/isReservationChargeInput";
import { MALFORMED_RESERVATION_ID } from "./ReservationCharge.constants";
import { VALID_CHARGE_INPUT } from "./ReservationChargeValues.constants";

describe("isReservationChargeInput", () => {
  it("accepts a well formed input", () => {
    expect(
      isReservationChargeInput(VALID_CHARGE_INPUT)
    ).toBe(true);
  });

  it.each([
    ["null", null],
    ["a string", "charge"],
    [
      "a malformed id",
      {
        ...VALID_CHARGE_INPUT,
        reservationId: MALFORMED_RESERVATION_ID,
      },
    ],
    [
      "a missing id",
      { ...VALID_CHARGE_INPUT, reservationId: undefined },
    ],
    [
      "a numeric amount",
      { ...VALID_CHARGE_INPUT, amountText: 45 },
    ],
    [
      "a missing amount",
      { ...VALID_CHARGE_INPUT, amountText: undefined },
    ],
    [
      "an unknown currency",
      { ...VALID_CHARGE_INPUT, currency: "EUR" },
    ],
    [
      "a lowercase currency",
      { ...VALID_CHARGE_INPUT, currency: "usd" },
    ],
    [
      "a missing currency",
      { ...VALID_CHARGE_INPUT, currency: undefined },
    ],
    [
      "a numeric method",
      { ...VALID_CHARGE_INPUT, paymentMethod: 7 },
    ],
    [
      "a missing method",
      { ...VALID_CHARGE_INPUT, paymentMethod: undefined },
    ],
  ])("refuses %s", (_, input) => {
    expect(isReservationChargeInput(input)).toBe(false);
  });

  it.each([
    "reservationId",
    "amountText",
    "currency",
    "paymentMethod",
  ])("refuses an input without the %s key", (key) => {
    const withoutKey: Record<string, unknown> = {
      ...VALID_CHARGE_INPUT,
    };
    delete withoutKey[key];

    expect(isReservationChargeInput(withoutKey)).toBe(
      false
    );
  });
});
