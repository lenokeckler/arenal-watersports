import { describe, expect, it } from "vitest";
import { RESERVATION_CHARGE_LIMITS } from "../constants/ReservationChargeLimits.constants";
import { RESERVATION_CHARGE_PAYMENT_CHOICE } from "../constants/ReservationChargePaymentChoice.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as COPY } from "../constants/ReservationChargeValidationCopy.constants";
import { resolveReservationChargeErrors } from "../utils/resolveReservationChargeErrors";
import {
  OTHER_CHARGE_VALUES,
  VALID_CHARGE_VALUES,
  ZERO_WIDTH_SPACE,
} from "./ReservationChargeValues.constants";

const TOO_LONG_METHOD = "a".repeat(
  RESERVATION_CHARGE_LIMITS.PAYMENT_METHOD_MAX_LENGTH + 1
);

describe("resolveReservationChargeErrors", () => {
  it("returns no keys for valid values", () => {
    expect(
      resolveReservationChargeErrors(VALID_CHARGE_VALUES)
    ).toEqual({});
  });

  it("reports only the amount when only it fails", () => {
    expect(
      resolveReservationChargeErrors({
        ...VALID_CHARGE_VALUES,
        amountText: "0",
      })
    ).toEqual({ amount: COPY.AMOUNT.not_positive });
  });

  it("asks for a choice when none is made", () => {
    expect(
      resolveReservationChargeErrors({
        ...VALID_CHARGE_VALUES,
        paymentChoice: null,
      })
    ).toEqual({ paymentChoice: COPY.CHOICE_REQUIRED });
  });

  it("asks for the other method text when Otro is chosen empty", () => {
    expect(
      resolveReservationChargeErrors({
        ...OTHER_CHARGE_VALUES,
        otherPaymentMethod: " ",
      })
    ).toEqual({ otherPaymentMethod: COPY.OTHER_REQUIRED });
  });

  it("refuses an other method over the limit", () => {
    expect(
      resolveReservationChargeErrors({
        ...OTHER_CHARGE_VALUES,
        otherPaymentMethod: TOO_LONG_METHOD,
      })
    ).toEqual({ otherPaymentMethod: COPY.METHOD_TOO_LONG });
  });

  it("refuses disallowed characters in the other method", () => {
    expect(
      resolveReservationChargeErrors({
        ...OTHER_CHARGE_VALUES,
        otherPaymentMethod: `a${ZERO_WIDTH_SPACE}b`,
      })
    ).toEqual({
      otherPaymentMethod: COPY.METHOD_DISALLOWED_CHARACTERS,
    });
  });

  it("ignores stale other text once another chip is chosen", () => {
    expect(
      resolveReservationChargeErrors({
        ...OTHER_CHARGE_VALUES,
        otherPaymentMethod: TOO_LONG_METHOD,
        paymentChoice:
          RESERVATION_CHARGE_PAYMENT_CHOICE.CARD,
      })
    ).toEqual({});
  });

  it("reports both fields, amount first", () => {
    const errors = resolveReservationChargeErrors({
      ...VALID_CHARGE_VALUES,
      amountText: "",
      paymentChoice: null,
    });

    expect(Object.keys(errors)).toEqual([
      "amount",
      "paymentChoice",
    ]);
    expect(errors).toEqual({
      amount: COPY.AMOUNT_REQUIRED,
      paymentChoice: COPY.CHOICE_REQUIRED,
    });
  });
});
