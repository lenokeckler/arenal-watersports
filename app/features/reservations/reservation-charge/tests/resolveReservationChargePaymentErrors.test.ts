import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { RESERVATION_CHARGE_PAYMENT_CHOICE } from "../constants/ReservationChargePaymentChoice.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as COPY } from "../constants/ReservationChargeValidationCopy.constants";
import { resolveReservationChargePaymentErrors } from "../utils/resolveReservationChargePaymentErrors";
import { OTHER_METHOD_TEXT } from "./ReservationChargeValues.constants";

describe("resolveReservationChargePaymentErrors", () => {
  it("puts the group error when nothing is chosen", () => {
    expect(
      resolveReservationChargePaymentErrors({
        otherPaymentMethod: OTHER_METHOD_TEXT,
        paymentChoice: null,
      })
    ).toEqual({ paymentChoice: COPY.CHOICE_REQUIRED });
  });

  it("puts the error on the other field when Otro is empty", () => {
    expect(
      resolveReservationChargePaymentErrors({
        otherPaymentMethod: STRING.Empty,
        paymentChoice:
          RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER,
      })
    ).toEqual({ otherPaymentMethod: COPY.OTHER_REQUIRED });
  });

  it("accepts Otro with text", () => {
    expect(
      resolveReservationChargePaymentErrors({
        otherPaymentMethod: OTHER_METHOD_TEXT,
        paymentChoice:
          RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER,
      })
    ).toEqual({});
  });

  it("accepts a labelled chip with no other text", () => {
    expect(
      resolveReservationChargePaymentErrors({
        otherPaymentMethod: STRING.Empty,
        paymentChoice:
          RESERVATION_CHARGE_PAYMENT_CHOICE.PAYPAL,
      })
    ).toEqual({});
  });
});
