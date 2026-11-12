import { describe, expect, it } from "vitest";
import { RESERVATION_SPLIT_ERROR } from "../constants/ReservationSplitError.constants";
import { RESERVATION_SPLIT_FEEDBACK_COPY } from "../constants/ReservationSplitFeedbackCopy.constants";
import { mapReservationSplitError } from "../utils/mapReservationSplitError";
import {
  FORM_ERROR_CASES,
  TWO_DEPARTURES,
  UNMAPPED_MESSAGE,
  WRAPPED_PREFIX,
} from "./mapReservationSplitError.constants";

describe("mapReservationSplitError", () => {
  it.each(FORM_ERROR_CASES)(
    "maps the refusal %s to a form error",
    (message, formError) => {
      expect(
        mapReservationSplitError(
          new Error(`${WRAPPED_PREFIX}${message}`),
          TWO_DEPARTURES
        )
      ).toEqual({
        ok: false,
        errors: { departures: [] },
        formError,
      });
    }
  );

  it("maps an invalid time to a time error on every departure", () => {
    const timeError = {
      time: RESERVATION_SPLIT_FEEDBACK_COPY.TIME_INVALID,
    };

    expect(
      mapReservationSplitError(
        new Error(
          RESERVATION_SPLIT_ERROR.INVALID_TIME_MESSAGE
        ),
        TWO_DEPARTURES
      )
    ).toEqual({
      ok: false,
      errors: { departures: [timeError, timeError] },
    });
  });

  it("rethrows an error with no mapping", () => {
    const error = new Error(UNMAPPED_MESSAGE);

    expect(() =>
      mapReservationSplitError(error, TWO_DEPARTURES)
    ).toThrow(error);
  });

  it("rethrows a value that is not an error", () => {
    expect(() =>
      mapReservationSplitError(
        UNMAPPED_MESSAGE,
        TWO_DEPARTURES
      )
    ).toThrow(UNMAPPED_MESSAGE);
  });
});
