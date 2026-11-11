import { RESERVATION_SPLIT_ERROR } from "../constants/ReservationSplitError.constants";
import { RESERVATION_SPLIT_FEEDBACK_COPY } from "../constants/ReservationSplitFeedbackCopy.constants";
import type { ReservationSplitActionResult } from "../models/ReservationSplitActionResult.type";

export const mapReservationSplitError = (
  error: unknown,
  departureCount: number
): ReservationSplitActionResult => {
  if (!(error instanceof Error)) {
    throw error;
  }

  if (
    error.message.includes(
      RESERVATION_SPLIT_ERROR.INVALID_TIME_MESSAGE
    )
  ) {
    return {
      ok: false,
      errors: {
        departures: Array.from(
          { length: departureCount },
          () => ({
            time: RESERVATION_SPLIT_FEEDBACK_COPY.TIME_INVALID,
          })
        ),
      },
    };
  }

  const match =
    RESERVATION_SPLIT_ERROR.FORM_ERROR_LOOKUP.find(
      ({ message }) => error.message.includes(message)
    );

  if (!match) {
    throw error;
  }

  return {
    ok: false,
    errors: { departures: [] },
    formError: match.formError,
  };
};
