import { describe, expect, it } from "vitest";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY as COPY } from "../constants/ReservationCancellationFeedbackCopy.constants";
import { resolveReservationCancellationCauseError } from "../utils/resolveReservationCancellationCauseError";
import { CANCELLATION_CAUSE } from "./ReservationCancellation.constants";

describe("resolveReservationCancellationCauseError", () => {
  it.each(["", "storm", "WEATHER"])(
    "asks for a valid cause when one is required and got %j",
    (cause) => {
      expect(
        resolveReservationCancellationCauseError(
          cause,
          true
        )
      ).toBe(COPY.CAUSE_REQUIRED);
    }
  );

  it.each(["weather", "trip_problem"])(
    "accepts the %s cause",
    (cause) => {
      expect(
        resolveReservationCancellationCauseError(
          cause,
          true
        )
      ).toBeUndefined();
    }
  );

  it("never asks for a cause when none is required", () => {
    expect(
      resolveReservationCancellationCauseError("", false)
    ).toBeUndefined();
    expect(
      resolveReservationCancellationCauseError(
        CANCELLATION_CAUSE,
        false
      )
    ).toBeUndefined();
  });
});
