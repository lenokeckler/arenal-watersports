import { describe, expect, it } from "vitest";
import { RESERVATION_REFUND_ERROR } from "../constants/ReservationRefundError.constants";
import { RESERVATION_REFUND_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationRefundFeedbackCopy.constants";
import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import {
  RESERVATION_REFUND_OTHER_REASON_REFUSALS,
  RESERVATION_REFUND_REFUSALS,
} from "../constants/ReservationRefundRefusals.constants";
import { RESERVATION_REFUND_VALIDATION_COPY as VALIDATION } from "../constants/ReservationRefundValidationCopy.constants";
import { mapReservationRefundError } from "../utils/mapReservationRefundError";
import {
  REFUND_CONNECTION_HINT,
  REFUND_POSTGRES_PREFIX,
  REFUND_UNEXPECTED_ERROR,
} from "./ReservationRefundAction.constants";

const { MESSAGE } = RESERVATION_REFUND_ERROR;
const { CANCELLED_TRIP, OTHER } = RESERVATION_REFUND_REASON;

const REASON_MESSAGES = [
  MESSAGE.REASON_INVALID,
  MESSAGE.REASON_REQUIRED,
  MESSAGE.REASON_TOO_LONG,
];

describe("mapReservationRefundError", () => {
  it.each(RESERVATION_REFUND_REFUSALS)(
    "maps the refusal $message",
    ({ errors, formError, message }) => {
      expect(
        mapReservationRefundError(
          new Error(`${REFUND_POSTGRES_PREFIX}${message}`),
          CANCELLED_TRIP
        )
      ).toEqual({
        ok: false,
        errors: { ...errors },
        formError,
      });
    }
  );

  it("has a refusal row for every message the database can raise", () => {
    const mapped = RESERVATION_REFUND_REFUSALS.map(
      ({ message }) => message
    );

    Object.values(MESSAGE).forEach((message) => {
      expect(mapped).toContain(message);
    });
    expect(mapped.toSorted()).toEqual(
      Object.values(MESSAGE).toSorted()
    );
  });

  it.each(REASON_MESSAGES)(
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

  it.each(REASON_MESSAGES)(
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
    ).toEqual(REASON_MESSAGES.toSorted());
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

  it.each([
    MESSAGE.AUTHENTICATION_REQUIRED,
    MESSAGE.PAYLOAD_NOT_OBJECT,
    MESSAGE.PAYLOAD_INVALID,
  ])(
    "does not mention the connection for %s",
    (message) => {
      const result = mapReservationRefundError(
        new Error(message),
        CANCELLED_TRIP
      );

      expect(result).toMatchObject({
        formError: FEEDBACK.REQUEST_REJECTED,
      });
      expect(FEEDBACK.REQUEST_REJECTED).not.toContain(
        REFUND_CONNECTION_HINT
      );
    }
  );

  it("rethrows an unknown failure", () => {
    expect(() =>
      mapReservationRefundError(
        REFUND_UNEXPECTED_ERROR,
        CANCELLED_TRIP
      )
    ).toThrow(REFUND_UNEXPECTED_ERROR);
  });

  it("rethrows what is not an error", () => {
    expect(() =>
      mapReservationRefundError(
        REFUND_POSTGRES_PREFIX,
        CANCELLED_TRIP
      )
    ).toThrow();
  });

  it("maps a refusal wrapped by the supabase error", () => {
    const wrapped = new Error(
      `Supabase query failed: record reservation refund: ${MESSAGE.NOT_FOUND} (P0001)`
    );

    expect(
      mapReservationRefundError(wrapped, null)
    ).toMatchObject({
      ok: false,
      formError: FEEDBACK.NOT_FOUND,
    });
  });
});
