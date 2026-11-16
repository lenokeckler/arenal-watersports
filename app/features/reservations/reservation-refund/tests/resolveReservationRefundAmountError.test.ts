import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { RESERVATION_REFUND_LIMITS } from "../constants/ReservationRefundLimits.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as COPY } from "../constants/ReservationRefundValidationCopy.constants";
import { resolveReservationRefundAmountError } from "../utils/resolveReservationRefundAmountError";
import {
  AVAILABLE_CRC,
  AVAILABLE_USD,
} from "./ReservationRefundValues.constants";

const { CRC, USD } = CURRENCY_CODE;
const { AMOUNT } = RESERVATION_REFUND_LIMITS;

describe("resolveReservationRefundAmountError", () => {
  it.each([
    ["empty", "", USD, COPY.AMOUNT_REQUIRED],
    ["blank", " \t ", USD, COPY.AMOUNT_REQUIRED],
    ["letters", "abc", USD, COPY.AMOUNT.format],
    ["a negative sign", "-1", USD, COPY.AMOUNT.format],
    ["a symbol", "$45", USD, COPY.AMOUNT.format],
    ["zero", "0", USD, COPY.AMOUNT.not_positive],
    [
      "three decimals",
      "1.234",
      USD,
      COPY.AMOUNT_TOO_MANY_DECIMALS,
    ],
    [
      "too many integer digits in colones",
      "1".repeat(AMOUNT[CRC].maxIntegerDigits + 1),
      CRC,
      COPY.AMOUNT.precision,
    ],
    [
      "too many integer digits in dollars",
      "1".repeat(AMOUNT[USD].maxIntegerDigits + 1),
      USD,
      COPY.AMOUNT.precision,
    ],
  ])("refuses %s", (_, amountText, currency, expected) => {
    expect(
      resolveReservationRefundAmountError(
        amountText,
        currency
      )
    ).toBe(expected);
  });

  it.each([
    ["a dot decimal", "45.50", USD],
    ["a comma decimal", "45,50", USD],
    ["a padded amount", " 25000 ", CRC],
    ["the smallest cent", "0.01", USD],
  ])(
    "accepts %s without a limit",
    (_, amountText, currency) => {
      expect(
        resolveReservationRefundAmountError(
          amountText,
          currency
        )
      ).toBeUndefined();
    }
  );

  it("refuses an amount above what is available, naming the maximum", () => {
    expect(
      resolveReservationRefundAmountError(
        "30.01",
        USD,
        AVAILABLE_USD
      )
    ).toBe(
      COPY.AMOUNT_ABOVE_AVAILABLE(
        formatMoney({
          amount: AVAILABLE_USD,
          currency: USD,
        })
      )
    );
  });

  it("compares in minor units so a comma decimal above the maximum is refused", () => {
    expect(
      resolveReservationRefundAmountError(
        "15000,01",
        CRC,
        AVAILABLE_CRC
      )
    ).toBe(
      COPY.AMOUNT_ABOVE_AVAILABLE(
        formatMoney({
          amount: AVAILABLE_CRC,
          currency: CRC,
        })
      )
    );
  });

  it.each([
    ["the exact maximum", "30", USD, AVAILABLE_USD],
    ["the maximum with cents", "30.00", USD, AVAILABLE_USD],
    ["one cent below", "29.99", USD, AVAILABLE_USD],
    ["a fractional maximum", "0.3", USD, 0.1 + 0.2],
    ["the colones maximum", "15000", CRC, AVAILABLE_CRC],
  ])("accepts %s", (_, amountText, currency, available) => {
    expect(
      resolveReservationRefundAmountError(
        amountText,
        currency,
        available
      )
    ).toBeUndefined();
  });

  it("reports a format problem before comparing with what is available", () => {
    expect(
      resolveReservationRefundAmountError(
        "abc",
        USD,
        AVAILABLE_USD
      )
    ).toBe(COPY.AMOUNT.format);
  });
});
