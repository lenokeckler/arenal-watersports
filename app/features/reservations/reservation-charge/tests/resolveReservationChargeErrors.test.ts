import { describe, expect, it } from "vitest";
import { RESERVATION_CHARGE_VALIDATION_COPY as COPY } from "../constants/ReservationChargeValidationCopy.constants";
import { resolveReservationChargeErrors } from "../utils/resolveReservationChargeErrors";
import { VALID_CHARGE_VALUES } from "./ReservationChargeValues.constants";

describe("resolveReservationChargeErrors", () => {
  it("returns no keys for valid values", () => {
    expect(
      resolveReservationChargeErrors(VALID_CHARGE_VALUES)
    ).toEqual({});
  });

  it("reports only the amount when only it fails", () => {
    expect(
      resolveReservationChargeErrors({
        ...VALID_CHARGE_VALUES,
        amountText: "0",
      })
    ).toEqual({ amount: COPY.AMOUNT.not_positive });
  });

  it("reports only the payment method when only it fails", () => {
    expect(
      resolveReservationChargeErrors({
        ...VALID_CHARGE_VALUES,
        paymentMethod: " ",
      })
    ).toEqual({ paymentMethod: COPY.METHOD_REQUIRED });
  });

  it("reports both fields, amount first", () => {
    const errors = resolveReservationChargeErrors({
      ...VALID_CHARGE_VALUES,
      amountText: "",
      paymentMethod: "",
    });

    expect(Object.keys(errors)).toEqual([
      "amount",
      "paymentMethod",
    ]);
    expect(errors).toEqual({
      amount: COPY.AMOUNT_REQUIRED,
      paymentMethod: COPY.METHOD_REQUIRED,
    });
  });
});
