import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import {
  RESERVATION_CHARGE_PAYMENT_CHOICE,
  RESERVATION_CHARGE_PAYMENT_CHOICE_LABEL,
  RESERVATION_CHARGE_PAYMENT_CHOICE_ORDER,
} from "../constants/ReservationChargePaymentChoice.constants";
import { resolveReservationChargePaymentMethod } from "../utils/resolveReservationChargePaymentMethod";
import {
  NON_BREAKING_SPACE,
  OTHER_METHOD_TEXT,
} from "./ReservationChargeValues.constants";

const LABELLED_CHOICES =
  RESERVATION_CHARGE_PAYMENT_CHOICE_ORDER.filter(
    (choice) =>
      choice !== RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER
  );

describe("resolveReservationChargePaymentMethod", () => {
  it.each(LABELLED_CHOICES)(
    "stores the label of the %s chip",
    (choice) => {
      expect(
        resolveReservationChargePaymentMethod({
          otherPaymentMethod: OTHER_METHOD_TEXT,
          paymentChoice: choice,
        })
      ).toBe(
        RESERVATION_CHARGE_PAYMENT_CHOICE_LABEL[choice]
      );
    }
  );

  it("stores the trimmed other text, never the word Otro", () => {
    expect(
      resolveReservationChargePaymentMethod({
        otherPaymentMethod: `${NON_BREAKING_SPACE} ${OTHER_METHOD_TEXT} ${NON_BREAKING_SPACE}`,
        paymentChoice:
          RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER,
      })
    ).toBe(OTHER_METHOD_TEXT);
  });

  it("returns an empty text with no choice", () => {
    expect(
      resolveReservationChargePaymentMethod({
        otherPaymentMethod: OTHER_METHOD_TEXT,
        paymentChoice: null,
      })
    ).toBe(STRING.Empty);
  });

  it("stores the four labels exactly", () => {
    expect(
      LABELLED_CHOICES.map((choice) =>
        resolveReservationChargePaymentMethod({
          otherPaymentMethod: STRING.Empty,
          paymentChoice: choice,
        })
      )
    ).toEqual(["Efectivo", "Tarjeta", "PayPal", "SINPE"]);
  });
});
