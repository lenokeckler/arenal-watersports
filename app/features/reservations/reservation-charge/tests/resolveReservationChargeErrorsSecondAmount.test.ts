import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as COPY } from "../constants/ReservationChargeValidationCopy.constants";
import { resolveReservationChargeErrors } from "../utils/resolveReservationChargeErrors";
import {
  EXPECTED_ERROR_KEYS,
  SECOND_AMOUNT_TEXT_CASES as CASES,
  WHITESPACE_ONLY_SECOND_AMOUNT,
} from "./ReservationChargeSecondAmount.constants";
import {
  MIXED_CHARGE_VALUES,
  VALID_CHARGE_VALUES,
} from "./ReservationChargeValues.constants";

const withSecond = (secondAmountText: string) => ({
  ...MIXED_CHARGE_VALUES,
  secondAmountText,
});

describe("resolveReservationChargeErrors second amount", () => {
  it("returns no keys for a valid second amount", () => {
    expect(
      resolveReservationChargeErrors(MIXED_CHARGE_VALUES)
    ).toEqual({});
  });

  it("does not validate a second amount in single mode", () => {
    expect(
      resolveReservationChargeErrors(VALID_CHARGE_VALUES)
    ).toEqual({});
  });

  it.each([
    ["empty", CASES.EMPTY, COPY.AMOUNT_REQUIRED],
    ["not a number", CASES.FORMAT, COPY.AMOUNT.format],
    [
      "not positive",
      CASES.NOT_POSITIVE,
      COPY.AMOUNT.not_positive,
    ],
    [
      "with too many decimals",
      CASES.TOO_MANY_DECIMALS,
      COPY.AMOUNT_TOO_MANY_DECIMALS,
    ],
  ])(
    "reports a second amount that is %s",
    (_, text, message) => {
      expect(
        resolveReservationChargeErrors(withSecond(text))
      ).toEqual({ secondAmount: message });
    }
  );

  it("reports a whitespace-only second amount as required", () => {
    expect(
      resolveReservationChargeErrors(
        withSecond(WHITESPACE_ONLY_SECOND_AMOUNT)
      )
    ).toEqual({ secondAmount: COPY.AMOUNT_REQUIRED });
  });

  it("applies the CRC ceiling when the first currency is USD", () => {
    expect(
      resolveReservationChargeErrors(
        withSecond(CASES.CRC_TOO_LARGE)
      )
    ).toEqual({ secondAmount: COPY.AMOUNT.precision });
  });

  it("applies the USD ceiling when the first currency is CRC", () => {
    expect(
      resolveReservationChargeErrors({
        ...withSecond(CASES.USD_TOO_LARGE),
        currency: CURRENCY_CODE.CRC,
      })
    ).toEqual({ secondAmount: COPY.AMOUNT.precision });
  });

  it("puts no cap on a large valid amount", () => {
    expect(
      resolveReservationChargeErrors({
        ...withSecond(CASES.LARGE_VALID),
        currency: CURRENCY_CODE.CRC,
      })
    ).toEqual({});
  });

  it("orders the keys amount, second amount, payment method", () => {
    const errors = resolveReservationChargeErrors({
      ...MIXED_CHARGE_VALUES,
      amountText: CASES.EMPTY,
      paymentChoice: null,
      secondAmountText: CASES.EMPTY,
    });

    expect(Object.keys(errors)).toEqual(
      EXPECTED_ERROR_KEYS
    );
  });
});
