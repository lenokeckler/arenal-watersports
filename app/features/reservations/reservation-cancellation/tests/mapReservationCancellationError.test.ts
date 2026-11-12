import { describe, expect, it } from "vitest";
import { RESERVATION_CANCELLATION_ERROR } from "../constants/ReservationCancellationError.constants";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as COPY } from "../constants/ReservationCancellationFeedbackCopy.constants";
import { RESERVATION_CANCELLATION_REFUSALS } from "../constants/ReservationCancellationRefusals.constants";
import { mapReservationCancellationError } from "../utils/mapReservationCancellationError";
import { CANCELLATION_UNEXPECTED_ERROR } from "./ReservationCancellation.constants";

const POSTGRES_PREFIX = "P0001: ";

describe("mapReservationCancellationError", () => {
  it.each(RESERVATION_CANCELLATION_REFUSALS)(
    "maps the refusal $message",
    ({ errors, formError, message }) => {
      expect(
        mapReservationCancellationError(
          new Error(`${POSTGRES_PREFIX}${message}`)
        )
      ).toEqual({
        ok: false,
        errors: { ...errors },
        formError,
      });
    }
  );

  it("asks for the cause on the cause field", () => {
    expect(
      mapReservationCancellationError(
        new Error(
          `${POSTGRES_PREFIX}${RESERVATION_CANCELLATION_ERROR.MESSAGE.CAUSE_REQUIRED}`
        )
      )
    ).toEqual({
      ok: false,
      errors: { cause: COPY.CAUSE_REQUIRED },
      formError: undefined,
    });
  });

  it("rethrows an unknown failure", () => {
    expect(() =>
      mapReservationCancellationError(
        CANCELLATION_UNEXPECTED_ERROR
      )
    ).toThrow(CANCELLATION_UNEXPECTED_ERROR);
  });

  it("rethrows what is not an error", () => {
    expect(() =>
      mapReservationCancellationError(POSTGRES_PREFIX)
    ).toThrow();
  });
});
