import { RESERVATION_EXTRA_TIME_REFUSALS } from "../constants/ReservationExtraTimeRefusals.constants";
import type { ReservationExtraTimeActionResult } from "../models/ReservationExtraTimeActionResult.type";

export const mapReservationExtraTimeError = (
  error: unknown
): ReservationExtraTimeActionResult => {
  if (!(error instanceof Error)) {
    throw error;
  }

  const refusal = RESERVATION_EXTRA_TIME_REFUSALS.find(
    ({ message }) => error.message.includes(message)
  );

  if (!refusal) {
    throw error;
  }

  return {
    ok: false,
    errors: { ...refusal.errors },
    formError: refusal.formError,
  };
};
