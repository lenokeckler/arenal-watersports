import { describe, expect, it } from "vitest";
import { RESERVATION_REFUND_LIMITS } from "../constants/ReservationRefundLimits.constants";
import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as COPY } from "../constants/ReservationRefundValidationCopy.constants";
import { resolveReservationRefundReasonError } from "../utils/resolveReservationRefundReasonError";
import {
  NON_BREAKING_SPACE,
  OTHER_REFUND_VALUES,
  VALID_REFUND_VALUES,
} from "./ReservationRefundValues.constants";

const { REASON_MAX_LENGTH } = RESERVATION_REFUND_LIMITS;

describe("resolveReservationRefundReasonError", () => {
  it("asks to choose a reason when none is chosen", () => {
    expect(
      resolveReservationRefundReasonError({
        ...VALID_REFUND_VALUES,
        reason: null,
      })
    ).toEqual({ reason: COPY.REASON_REQUIRED });
  });

  it.each([
    RESERVATION_REFUND_REASON.CANCELLED_TRIP,
    RESERVATION_REFUND_REASON.CUT_SHORT_TRIP,
  ])("accepts the preset %s without text", (reason) => {
    expect(
      resolveReservationRefundReasonError({
        ...VALID_REFUND_VALUES,
        reason,
      })
    ).toEqual({});
  });

  it("ignores the free text of a preset reason", () => {
    expect(
      resolveReservationRefundReasonError({
        ...VALID_REFUND_VALUES,
        otherReasonText: "x".repeat(REASON_MAX_LENGTH + 1),
      })
    ).toEqual({});
  });

  it.each(["", "   ", `${NON_BREAKING_SPACE} \t`])(
    "requires text for the other reason when it is blank",
    (otherReasonText) => {
      expect(
        resolveReservationRefundReasonError({
          ...OTHER_REFUND_VALUES,
          otherReasonText,
        })
      ).toEqual({ otherReason: COPY.OTHER_REQUIRED });
    }
  );

  it("accepts the other reason with text", () => {
    expect(
      resolveReservationRefundReasonError(
        OTHER_REFUND_VALUES
      )
    ).toEqual({});
  });

  it("accepts text of exactly the maximum length", () => {
    expect(
      resolveReservationRefundReasonError({
        ...OTHER_REFUND_VALUES,
        otherReasonText: "x".repeat(REASON_MAX_LENGTH),
      })
    ).toEqual({});
  });

  it("refuses text one character above the maximum", () => {
    expect(
      resolveReservationRefundReasonError({
        ...OTHER_REFUND_VALUES,
        otherReasonText: "x".repeat(REASON_MAX_LENGTH + 1),
      })
    ).toEqual({ otherReason: COPY.REASON_TOO_LONG });
  });

  it("measures the trimmed text, not the padding", () => {
    expect(
      resolveReservationRefundReasonError({
        ...OTHER_REFUND_VALUES,
        otherReasonText: ` ${"x".repeat(REASON_MAX_LENGTH)} `,
      })
    ).toEqual({});
  });
});
