import { describe, expect, it } from "vitest";
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
