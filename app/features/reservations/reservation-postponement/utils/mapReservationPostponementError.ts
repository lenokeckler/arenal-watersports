import { STRING } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY } from "../constants/ReservationPostponementFeedbackCopy.constants";
import { RESERVATION_POSTPONEMENT_REFUSALS } from "../constants/ReservationPostponementRefusals.constants";
import type { ReservationPostponementActionResult } from "../models/ReservationPostponementActionResult.type";
import { resolveReservationPostponementErrorDetail } from "./resolveReservationPostponementErrorDetail";

export const mapReservationPostponementError = (
  error: unknown
): ReservationPostponementActionResult => {
  if (!(error instanceof Error)) {
    throw error;
  }

  const refusal = RESERVATION_POSTPONEMENT_REFUSALS.find(
    ({ message }) => error.message.includes(message)
  );

  if (!refusal) {
    throw error;
  }

  if (refusal.reading) {
    const itemId =
      resolveReservationPostponementErrorDetail(error);

    return itemId === STRING.Empty
      ? {
          ok: false,
          errors: { readings: {} },
          formError:
            RESERVATION_POSTPONEMENT_FEEDBACK_COPY.READINGS_REQUIRED,
        }
      : {
          ok: false,
          errors: {
            readings: { [itemId]: refusal.reading },
          },
        };
  }

  return {
    ok: false,
    errors: { ...refusal.errors, readings: {} },
    formError: refusal.formError,
  };
};
