import { describe, expect, it } from "vitest";
import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import { isReservationRefundInput } from "../utils/isReservationRefundInput";
import { MALFORMED_RESERVATION_ID } from "./ReservationRefund.constants";
import {
  OTHER_REFUND_VALUES,
  VALID_REFUND_INPUT,
} from "./ReservationRefundValues.constants";

describe("isReservationRefundInput", () => {
  it("accepts a well formed input", () => {
    expect(
      isReservationRefundInput(VALID_REFUND_INPUT)
    ).toBe(true);
  });

  it("accepts every reason and no reason chosen", () => {
    expect(
      Object.values(RESERVATION_REFUND_REASON).every(
        (reason) =>
          isReservationRefundInput({
            ...VALID_REFUND_INPUT,
            reason,
          })
      )
    ).toBe(true);
    expect(
      isReservationRefundInput({
        ...VALID_REFUND_INPUT,
        reason: null,
      })
    ).toBe(true);
  });

  it("accepts the other reason with its text", () => {
    expect(
      isReservationRefundInput({
        ...OTHER_REFUND_VALUES,
        reservationId: VALID_REFUND_INPUT.reservationId,
      })
    ).toBe(true);
  });

  it.each([
    ["null", null],
    ["a string", "refund"],
    [
      "a malformed id",
      {
        ...VALID_REFUND_INPUT,
        reservationId: MALFORMED_RESERVATION_ID,
      },
    ],
    [
      "a numeric amount",
      { ...VALID_REFUND_INPUT, amountText: 20 },
    ],
    [
      "an unknown currency",
      { ...VALID_REFUND_INPUT, currency: "EUR" },
    ],
    [
      "an unknown reason",
      { ...VALID_REFUND_INPUT, reason: "weather" },
    ],
    [
      "an undefined reason",
      { ...VALID_REFUND_INPUT, reason: undefined },
    ],
    [
      "a numeric other text",
      { ...VALID_REFUND_INPUT, otherReasonText: 7 },
    ],
  ])("refuses %s", (_, input) => {
    expect(isReservationRefundInput(input)).toBe(false);
  });

  it.each([
    "reservationId",
    "amountText",
    "currency",
    "reason",
    "otherReasonText",
  ])("refuses an input without the %s key", (key) => {
    const withoutKey: Record<string, unknown> = {
      ...VALID_REFUND_INPUT,
    };
    delete withoutKey[key];

    expect(isReservationRefundInput(withoutKey)).toBe(
      false
    );
  });
});
