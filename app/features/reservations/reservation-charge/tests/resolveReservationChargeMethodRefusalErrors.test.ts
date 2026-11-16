import { describe, expect, it } from "vitest";
import { RESERVATION_CHARGE_PAYMENT_CHOICE } from "../constants/ReservationChargePaymentChoice.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as COPY } from "../constants/ReservationChargeValidationCopy.constants";
import { resolveReservationChargeMethodRefusalErrors } from "../utils/resolveReservationChargeMethodRefusalErrors";

describe("resolveReservationChargeMethodRefusalErrors", () => {
  it("lands on the other field when Otro is chosen", () => {
    expect(
      resolveReservationChargeMethodRefusalErrors(
        COPY.OTHER_REQUIRED,
        RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER
      )
    ).toEqual({ otherPaymentMethod: COPY.OTHER_REQUIRED });
  });

  it.each([RESERVATION_CHARGE_PAYMENT_CHOICE.CASH, null])(
    "lands on the group when the choice is %s",
    (choice) => {
      expect(
        resolveReservationChargeMethodRefusalErrors(
          COPY.METHOD_TOO_LONG,
          choice
        )
      ).toEqual({ paymentChoice: COPY.METHOD_TOO_LONG });
    }
  );

  it("adds nothing when the refusal is not about the method", () => {
    expect(
      resolveReservationChargeMethodRefusalErrors(
        undefined,
        RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER
      )
    ).toEqual({});
  });
});
