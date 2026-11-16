import { describe, expect, it } from "vitest";
import { RESERVATION_REFUND_ERROR } from "../constants/ReservationRefundError.constants";
import { RESERVATION_REFUND_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationRefundFeedbackCopy.constants";
import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import { RESERVATION_REFUND_REFUSALS } from "../constants/ReservationRefundRefusals.constants";
import { mapReservationRefundError } from "../utils/mapReservationRefundError";
import {
  REFUND_NON_ERROR_THROWN,
  REFUND_POSTGRES_PREFIX,
  REFUND_SUPABASE_WRAP_PREFIX,
  REFUND_SUPABASE_WRAP_SUFFIX,
  REFUND_UNEXPECTED_ERROR,
} from "./ReservationRefundAction.constants";

const { MESSAGE } = RESERVATION_REFUND_ERROR;
const { CANCELLED_TRIP } = RESERVATION_REFUND_REASON;

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
      expect(result).not.toMatchObject({
        formError: FEEDBACK.GENERIC,
      });
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
        REFUND_NON_ERROR_THROWN,
        CANCELLED_TRIP
      )
    ).toThrow(REFUND_NON_ERROR_THROWN);
  });

  it("maps a refusal wrapped by the supabase error", () => {
    const wrapped = new Error(
      `${REFUND_SUPABASE_WRAP_PREFIX}${RESERVATION_REFUND_ERROR.OPERATION.RECORD}: ${MESSAGE.NOT_FOUND}${REFUND_SUPABASE_WRAP_SUFFIX}`
    );

    expect(
      mapReservationRefundError(wrapped, null)
    ).toMatchObject({
      ok: false,
      formError: FEEDBACK.NOT_FOUND,
    });
  });
});
