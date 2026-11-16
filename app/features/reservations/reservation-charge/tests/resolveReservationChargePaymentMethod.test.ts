import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import {
  RESERVATION_CHARGE_PAYMENT_CHOICE as CHOICE,
  RESERVATION_CHARGE_PAYMENT_CHOICE_LABEL,
} from "../constants/ReservationChargePaymentChoice.constants";
import { resolveReservationChargePaymentMethod } from "../utils/resolveReservationChargePaymentMethod";
import {
  NON_BREAKING_SPACE,
  OTHER_METHOD_TEXT,
} from "./ReservationChargeValues.constants";

describe("resolveReservationChargePaymentMethod", () => {
  it.each([
    [CHOICE.CASH, "Efectivo"],
    [CHOICE.CARD, "Tarjeta"],
    [CHOICE.PAYPAL, "PayPal"],
    [CHOICE.SINPE, "SINPE"],
  ])(
    "stores the exact label of the %s chip",
    (choice, label) => {
      expect(
        RESERVATION_CHARGE_PAYMENT_CHOICE_LABEL[choice]
      ).toBe(label);
      expect(
        resolveReservationChargePaymentMethod({
          otherPaymentMethod: OTHER_METHOD_TEXT,
          paymentChoice: choice,
        })
      ).toBe(label);
    }
  );

  it.each([
    [
      "stores the trimmed other text, never the word Otro",
      CHOICE.OTHER,
      `${NON_BREAKING_SPACE} ${OTHER_METHOD_TEXT} ${NON_BREAKING_SPACE}`,
      OTHER_METHOD_TEXT,
    ],
    [
      "returns an empty text with no choice",
      null,
      OTHER_METHOD_TEXT,
      STRING.Empty,
    ],
  ])(
    "%s",
    (_, paymentChoice, otherPaymentMethod, expected) => {
      expect(
        resolveReservationChargePaymentMethod({
          otherPaymentMethod,
          paymentChoice,
        })
      ).toBe(expected);
    }
  );
});
