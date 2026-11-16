import { describe, expect, it } from "vitest";
import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_REASON_COPY } from "../constants/ReservationRefundReasonCopy.constants";
import { resolveReservationRefundReasonText } from "../utils/resolveReservationRefundReasonText";
import {
  NON_BREAKING_SPACE,
  OTHER_REASON_TEXT,
  OTHER_REFUND_VALUES,
  VALID_REFUND_VALUES,
} from "./ReservationRefundValues.constants";

describe("resolveReservationRefundReasonText", () => {
  it.each([
    RESERVATION_REFUND_REASON.CANCELLED_TRIP,
    RESERVATION_REFUND_REASON.CUT_SHORT_TRIP,
  ])("stores the label of the preset %s", (reason) => {
    expect(
      resolveReservationRefundReasonText({
        ...VALID_REFUND_VALUES,
        otherReasonText: OTHER_REASON_TEXT,
        reason,
      })
    ).toBe(RESERVATION_REFUND_REASON_COPY[reason]);
  });

  it("stores the trimmed free text of the other reason", () => {
    expect(
      resolveReservationRefundReasonText({
        ...OTHER_REFUND_VALUES,
        otherReasonText: `${NON_BREAKING_SPACE} ${OTHER_REASON_TEXT} \t`,
      })
    ).toBe(OTHER_REASON_TEXT);
  });

  it("is empty when no reason is chosen", () => {
    expect(
      resolveReservationRefundReasonText({
        ...VALID_REFUND_VALUES,
        reason: null,
      })
    ).toBe("");
  });
});
