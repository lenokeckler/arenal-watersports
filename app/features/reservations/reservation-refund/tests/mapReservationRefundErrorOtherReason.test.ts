import { describe, expect, it } from "vitest";
import { RESERVATION_REFUND_ERROR } from "../constants/ReservationRefundError.constants";
import { RESERVATION_REFUND_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationRefundFeedbackCopy.constants";
import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_OTHER_REASON_REFUSALS } from "../constants/ReservationRefundRefusals.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as VALIDATION } from "../constants/ReservationRefundValidationCopy.constants";
import { mapReservationRefundError } from "../utils/mapReservationRefundError";
import { REFUND_REASON_MESSAGES } from "./ReservationRefundAction.constants";

const { MESSAGE } = RESERVATION_REFUND_ERROR;
const { CANCELLED_TRIP, OTHER } = RESERVATION_REFUND_REASON;

describe("mapReservationRefundError for the other reason", () => {
  it.each(REFUND_REASON_MESSAGES)(
    "puts %s under the free text when the reason is other",
    (message) => {
      const result = mapReservationRefundError(
        new Error(message),
        OTHER
      );

      expect(result).toMatchObject({ ok: false });
      expect(result).toHaveProperty(
        "errors.otherReason",
        expect.any(String)
      );
      expect(result).not.toHaveProperty("errors.reason");
    }
  );

  it.each(REFUND_REASON_MESSAGES)(
    "keeps %s under the reason when a preset is chosen",
    (message) => {
      const result = mapReservationRefundError(
        new Error(message),
        CANCELLED_TRIP
      );

      expect(result).toHaveProperty(
        "errors.reason",
        expect.any(String)
      );
      expect(result).not.toHaveProperty(
        "errors.otherReason"
      );
    }
  );

  it("asks for the text, not for a choice, when the other text is required", () => {
    expect(
      mapReservationRefundError(
        new Error(MESSAGE.REASON_REQUIRED),
        OTHER
      )
    ).toEqual({
      ok: false,
      errors: { otherReason: VALIDATION.OTHER_REQUIRED },
      formError: undefined,
    });
  });

  it("defines a free text row for each reason refusal", () => {
    expect(
      RESERVATION_REFUND_OTHER_REASON_REFUSALS.map(
        ({ message }) => message
      ).toSorted()
    ).toEqual(REFUND_REASON_MESSAGES.toSorted());
  });

  it("leaves the other refusals untouched when the reason is other", () => {
    expect(
      mapReservationRefundError(
        new Error(MESSAGE.EXCEEDS_NET),
        OTHER
      )
    ).toEqual({
      ok: false,
      errors: {},
      formError: FEEDBACK.ABOVE_AVAILABLE,
    });
  });
});
