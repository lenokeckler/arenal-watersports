import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as COPY } from "../constants/ReservationChargeValidationCopy.constants";
import { resolveReservationChargeAmountError } from "../utils/resolveReservationChargeAmountError";

const { CRC, USD } = CURRENCY_CODE;

describe("resolveReservationChargeAmountError", () => {
  it.each([
    ["empty", "", USD, COPY.AMOUNT_REQUIRED],
    ["blank", " \t ", USD, COPY.AMOUNT_REQUIRED],
    ["letters", "abc", USD, COPY.AMOUNT.format],
    ["a negative sign", "-1", USD, COPY.AMOUNT.format],
    [
      "a thousands separator",
      "1,234.50",
      USD,
      COPY.AMOUNT.format,
    ],
    ["a symbol", "$45", USD, COPY.AMOUNT.format],
    ["zero", "0", USD, COPY.AMOUNT.not_positive],
    [
      "zero with decimals",
      "0.00",
      CRC,
      COPY.AMOUNT.not_positive,
    ],
    [
      "three decimals",
      "1.234",
      USD,
      COPY.AMOUNT_TOO_MANY_DECIMALS,
    ],
    [
      "three decimals with a comma",
      "1,234",
      CRC,
      COPY.AMOUNT_TOO_MANY_DECIMALS,
    ],
    [
      "13 integer digits in colones",
      "1".repeat(13),
      CRC,
      COPY.AMOUNT.precision,
    ],
    [
      "11 integer digits in dollars",
      "1".repeat(11),
      USD,
      COPY.AMOUNT.precision,
    ],
  ])("refuses %s", (_, amountText, currency, expected) => {
    expect(
      resolveReservationChargeAmountError(
        amountText,
        currency
      )
    ).toBe(expected);
  });

  it.each([
    ["a dot decimal", "45.50", USD],
    ["a comma decimal", "45,50", USD],
    ["a padded amount", " 25000 ", CRC],
    ["12 integer digits in colones", "9".repeat(12), CRC],
    ["10 integer digits in dollars", "9".repeat(10), USD],
    ["the smallest cent", "0.01", USD],
  ])("accepts %s", (_, amountText, currency) => {
    expect(
      resolveReservationChargeAmountError(
        amountText,
        currency
      )
    ).toBeUndefined();
  });
});
