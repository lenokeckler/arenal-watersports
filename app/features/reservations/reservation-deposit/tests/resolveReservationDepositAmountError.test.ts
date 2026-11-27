import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { RESERVATION_DEPOSIT_LIMITS } from "../constants/ReservationDepositLimits.constants";
import { RESERVATION_DEPOSIT_VALIDATION_COPY as COPY } from "../constants/ReservationDepositValidationCopy.constants";
import { resolveReservationDepositAmountError } from "../utils/resolveReservationDepositAmountError";

const { CRC, USD } = CURRENCY_CODE;
const { AMOUNT } = RESERVATION_DEPOSIT_LIMITS;

describe("resolveReservationDepositAmountError", () => {
  it.each([
    ["empty", "", USD, COPY.AMOUNT_REQUIRED],
    ["blank", " \t ", USD, COPY.AMOUNT_REQUIRED],
    ["letters", "abc", USD, COPY.AMOUNT.format],
    ["a negative sign", "-1", USD, COPY.AMOUNT.format],
    ["a symbol", "$200", USD, COPY.AMOUNT.format],
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
      resolveReservationDepositAmountError(
        amountText,
        currency
      )
    ).toBe(expected);
  });

  it.each([
    ["the proposal in dollars", "200", USD],
    ["a dot decimal", "45.50", USD],
    ["a comma decimal", "45,50", USD],
    ["a padded amount", " 100000 ", CRC],
    ["the smallest cent", "0.01", USD],
    [
      "the largest colones amount",
      "9".repeat(AMOUNT[CRC].maxIntegerDigits),
      CRC,
    ],
  ])("accepts %s", (_, amountText, currency) => {
    expect(
      resolveReservationDepositAmountError(
        amountText,
        currency
      )
    ).toBeUndefined();
  });
});
