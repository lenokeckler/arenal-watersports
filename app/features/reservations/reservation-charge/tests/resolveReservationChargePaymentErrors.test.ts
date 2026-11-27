import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { RESERVATION_CHARGE_PAYMENT_CHOICE as CHOICE } from "../constants/ReservationChargePaymentChoice.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as COPY } from "../constants/ReservationChargeValidationCopy.constants";
import { resolveReservationChargePaymentErrors } from "../utils/resolveReservationChargePaymentErrors";
import { OTHER_METHOD_TEXT } from "./ReservationChargeValues.constants";

describe("resolveReservationChargePaymentErrors", () => {
  it.each([
    [
      "nothing is chosen",
      null,
      OTHER_METHOD_TEXT,
      { paymentChoice: COPY.CHOICE_REQUIRED },
    ],
    [
      "Otro is empty",
      CHOICE.OTHER,
      STRING.Empty,
      { otherPaymentMethod: COPY.OTHER_REQUIRED },
    ],
    ["Otro has text", CHOICE.OTHER, OTHER_METHOD_TEXT, {}],
    [
      "a labelled chip has no other text",
      CHOICE.PAYPAL,
      STRING.Empty,
      {},
    ],
  ])(
    "returns the right errors when %s",
    (_, paymentChoice, otherPaymentMethod, expected) => {
      expect(
        resolveReservationChargePaymentErrors({
          otherPaymentMethod,
          paymentChoice,
        })
      ).toEqual(expected);
    }
  );
});
