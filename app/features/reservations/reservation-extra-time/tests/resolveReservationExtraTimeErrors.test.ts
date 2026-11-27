import { describe, expect, it } from "vitest";
import {
  CHARGE_LIMITS,
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
  PAYMENT_CHOICE,
  STRING,
} from "@/app/constants";
import { RESERVATION_EXTRA_TIME_VALIDATION_COPY as COPY } from "../constants/ReservationExtraTimeValidationCopy.constants";
import { resolveReservationExtraTimeErrors } from "../utils/resolveReservationExtraTimeErrors";
import {
  EXTRA_TIME_CHARGED_INPUT,
  EXTRA_TIME_COURTESY_INPUT,
  EXTRA_TIME_OTHER_METHOD,
} from "./ReservationExtraTime.constants";

const TOO_LONG_METHOD = "x".repeat(
  CHARGE_LIMITS.PAYMENT_METHOD_MAX_LENGTH + 1
);

describe("resolveReservationExtraTimeErrors", () => {
  it("asks for the decision first", () => {
    expect(
      resolveReservationExtraTimeErrors({
        ...EXTRA_TIME_CHARGED_INPUT,
        amountText: STRING.Empty,
        outcome: null,
      })
    ).toEqual({ outcome: COPY.OUTCOME_REQUIRED });
  });

  it("asks nothing else for a courtesy", () => {
    expect(
      resolveReservationExtraTimeErrors(
        EXTRA_TIME_COURTESY_INPUT
      )
    ).toEqual({});
  });

  it("accepts a complete charge", () => {
    expect(
      resolveReservationExtraTimeErrors(
        EXTRA_TIME_CHARGED_INPUT
      )
    ).toEqual({});
  });

  it.each([
    ["is empty", STRING.Empty, COPY.AMOUNT_REQUIRED],
    [
      "is not a number",
      "abc",
      COPY.AMOUNT[MONEY_AMOUNT_ISSUE.FORMAT],
    ],
    [
      "is zero",
      "0",
      COPY.AMOUNT[MONEY_AMOUNT_ISSUE.NOT_POSITIVE],
    ],
    [
      "has three decimals",
      "10.555",
      COPY.AMOUNT_TOO_MANY_DECIMALS,
    ],
    [
      "is too large",
      "12345678901",
      COPY.AMOUNT[MONEY_AMOUNT_ISSUE.PRECISION],
    ],
  ])(
    "refuses a charge whose amount %s",
    (_, amountText, amount) => {
      expect(
        resolveReservationExtraTimeErrors({
          ...EXTRA_TIME_CHARGED_INPUT,
          amountText,
        })
      ).toEqual({ amount });
    }
  );

  it("uses the colon limits for a colon amount", () => {
    expect(
      resolveReservationExtraTimeErrors({
        ...EXTRA_TIME_CHARGED_INPUT,
        amountText: "12345678901",
        currency: CURRENCY_CODE.CRC,
      })
    ).toEqual({});
  });

  it.each([
    [
      "nothing is chosen",
      null,
      STRING.Empty,
      { paymentChoice: COPY.CHOICE_REQUIRED },
    ],
    [
      "Otro is empty",
      PAYMENT_CHOICE.OTHER,
      "   ",
      { otherPaymentMethod: COPY.OTHER_REQUIRED },
    ],
    [
      "Otro has a control character",
      PAYMENT_CHOICE.OTHER,
      "Banco\u0007",
      {
        otherPaymentMethod:
          COPY.METHOD_DISALLOWED_CHARACTERS,
      },
    ],
    [
      "Otro is too long",
      PAYMENT_CHOICE.OTHER,
      TOO_LONG_METHOD,
      { otherPaymentMethod: COPY.METHOD_TOO_LONG },
    ],
    [
      "Otro has text",
      PAYMENT_CHOICE.OTHER,
      EXTRA_TIME_OTHER_METHOD,
      {},
    ],
  ])(
    "checks the payment method when %s",
    (_, paymentChoice, otherPaymentMethod, expected) => {
      expect(
        resolveReservationExtraTimeErrors({
          ...EXTRA_TIME_CHARGED_INPUT,
          otherPaymentMethod,
          paymentChoice,
        })
      ).toEqual(expected);
    }
  );
});
