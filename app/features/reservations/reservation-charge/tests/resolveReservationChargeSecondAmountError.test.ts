import { describe, expect, it } from "vitest";
import { RESERVATION_CHARGE_VALIDATION_COPY as COPY } from "../constants/ReservationChargeValidationCopy.constants";
import { resolveReservationChargeSecondAmountError } from "../utils/resolveReservationChargeSecondAmountError";
import { SECOND_AMOUNT_TEXT_CASES as CASES } from "./ReservationChargeSecondAmount.constants";
import {
  MIXED_CHARGE_VALUES,
  VALID_CHARGE_VALUES,
} from "./ReservationChargeValues.constants";

describe("resolveReservationChargeSecondAmountError", () => {
  it("returns undefined without a second amount", () => {
    expect(
      resolveReservationChargeSecondAmountError(
        VALID_CHARGE_VALUES
      )
    ).toBeUndefined();
  });

  it("returns undefined for a valid second amount", () => {
    expect(
      resolveReservationChargeSecondAmountError(
        MIXED_CHARGE_VALUES
      )
    ).toBeUndefined();
  });

  it("returns the error of an invalid second amount", () => {
    expect(
      resolveReservationChargeSecondAmountError({
        ...MIXED_CHARGE_VALUES,
        secondAmountText: CASES.EMPTY,
      })
    ).toBe(COPY.AMOUNT_REQUIRED);
  });
});
