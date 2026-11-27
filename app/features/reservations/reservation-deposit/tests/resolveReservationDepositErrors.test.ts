import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { RESERVATION_DEPOSIT_VALIDATION_COPY as COPY } from "../constants/ReservationDepositValidationCopy.constants";
import { resolveReservationDepositErrors } from "../utils/resolveReservationDepositErrors";
import { RECEIVED_DEPOSIT_VALUES } from "./ReservationDepositValues.constants";

describe("resolveReservationDepositErrors", () => {
  it("has no errors for a valid received deposit", () => {
    expect(
      resolveReservationDepositErrors(
        RECEIVED_DEPOSIT_VALUES
      )
    ).toEqual({});
  });

  it("reports the amount of a received deposit", () => {
    expect(
      resolveReservationDepositErrors({
        ...RECEIVED_DEPOSIT_VALUES,
        amountText: STRING.Empty,
      })
    ).toEqual({ amount: COPY.AMOUNT_REQUIRED });
  });

  it("ignores the amount when there was no deposit", () => {
    expect(
      resolveReservationDepositErrors({
        ...RECEIVED_DEPOSIT_VALUES,
        amountText: "abc",
        hasDeposit: false,
      })
    ).toEqual({});
  });
});
