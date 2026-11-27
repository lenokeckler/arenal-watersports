import { describe, expect, it } from "vitest";
import { RESERVATION_REFUND_VALIDATION_COPY as COPY } from "../constants/ReservationRefundValidationCopy.constants";
import { resolveReservationRefundErrors } from "../utils/resolveReservationRefundErrors";
import {
  AVAILABLE_USD,
  OTHER_REFUND_VALUES,
  VALID_REFUND_VALUES,
} from "./ReservationRefundValues.constants";

describe("resolveReservationRefundErrors", () => {
  it("returns no keys for valid values", () => {
    expect(
      resolveReservationRefundErrors(VALID_REFUND_VALUES)
    ).toEqual({});
  });

  it("does not compare with what is available when no limit is given", () => {
    expect(
      resolveReservationRefundErrors({
        ...VALID_REFUND_VALUES,
        amountText: "999999",
      })
    ).toEqual({});
  });

  it("compares with what is available when a limit is given", () => {
    expect(
      Object.keys(
        resolveReservationRefundErrors(
          { ...VALID_REFUND_VALUES, amountText: "30.01" },
          AVAILABLE_USD
        )
      )
    ).toEqual(["amount"]);
  });

  it("reports only the reason when only it fails", () => {
    expect(
      resolveReservationRefundErrors({
        ...VALID_REFUND_VALUES,
        reason: null,
      })
    ).toEqual({ reason: COPY.REASON_REQUIRED });
  });

  it("reports the other reason text under its own key", () => {
    expect(
      resolveReservationRefundErrors({
        ...OTHER_REFUND_VALUES,
        otherReasonText: " ",
      })
    ).toEqual({ otherReason: COPY.OTHER_REQUIRED });
  });

  it("reports the amount and the reason together, amount first", () => {
    const errors = resolveReservationRefundErrors({
      ...VALID_REFUND_VALUES,
      amountText: "",
      reason: null,
    });

    expect(Object.keys(errors)).toEqual([
      "amount",
      "reason",
    ]);
    expect(errors).toEqual({
      amount: COPY.AMOUNT_REQUIRED,
      reason: COPY.REASON_REQUIRED,
    });
  });
});
