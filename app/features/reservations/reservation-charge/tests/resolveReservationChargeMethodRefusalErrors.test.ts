import { describe, expect, it } from "vitest";
import { RESERVATION_CHARGE_PAYMENT_CHOICE as CHOICE } from "../constants/ReservationChargePaymentChoice.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as COPY } from "../constants/ReservationChargeValidationCopy.constants";
import { resolveReservationChargeMethodRefusalErrors } from "../utils/resolveReservationChargeMethodRefusalErrors";

describe("resolveReservationChargeMethodRefusalErrors", () => {
  it.each([
    [
      COPY.OTHER_REQUIRED,
      CHOICE.OTHER,
      { otherPaymentMethod: COPY.OTHER_REQUIRED },
    ],
    [
      COPY.METHOD_TOO_LONG,
      CHOICE.CASH,
      { paymentChoice: COPY.METHOD_TOO_LONG },
    ],
    [
      COPY.METHOD_TOO_LONG,
      null,
      { paymentChoice: COPY.METHOD_TOO_LONG },
    ],
    [undefined, CHOICE.OTHER, {}],
  ])(
    "maps %s with choice %s",
    (message, choice, expected) => {
      expect(
        resolveReservationChargeMethodRefusalErrors(
          message,
          choice
        )
      ).toEqual(expected);
    }
  );
});
