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
    ["a trailing dot", "45.", USD, COPY.AMOUNT.format],
    ["a leading dot", ".5", USD, COPY.AMOUNT.format],
    ["an exponent", "1e5", USD, COPY.AMOUNT.format],
    ["full-width digits", "４５", USD, COPY.AMOUNT.format],
    [
      "a European thousands separator",
      "1.234,56",
      CRC,
      COPY.AMOUNT.format,
    ],
    [
      "the dollar ceiling",
      "10000000000",
      USD,
      COPY.AMOUNT.precision,
    ],
    [
      "the colones ceiling",
      "1000000000000",
      CRC,
      COPY.AMOUNT.precision,
    ],
    [
      "zeros with leading zeros",
      "000",
      USD,
      COPY.AMOUNT.not_positive,
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
    ["the smallest comma cent", "0,01", USD],
    ["leading zeros", "0045", USD],
    [
      "leading zeros beyond the digit limit",
      `000${"9".repeat(10)}`,
      USD,
    ],
    ["the largest dollar amount", "9999999999.99", USD],
    ["the largest colones amount", "999999999999.99", CRC],
  ])("accepts %s", (_, amountText, currency) => {
    expect(
      resolveReservationChargeAmountError(
        amountText,
        currency
      )
    ).toBeUndefined();
  });
});
