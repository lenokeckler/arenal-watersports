import { RESERVATION_CANCELLATION_REFUSALS } from "../constants/ReservationCancellationRefusals.constants";
import type { ReservationCancellationActionResult } from "../models/ReservationCancellationActionResult.type";

export const mapReservationCancellationError = (
  error: unknown
): ReservationCancellationActionResult => {
  if (!(error instanceof Error)) {
    throw error;
  }

  const refusal = RESERVATION_CANCELLATION_REFUSALS.find(
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
