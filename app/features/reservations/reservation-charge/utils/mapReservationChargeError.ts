import { RESERVATION_CHARGE_REFUSALS } from "../constants/ReservationChargeRefusals.constants";
import type { ReservationChargeActionResult } from "../models/ReservationChargeActionResult.type";

export const mapReservationChargeError = (
  error: unknown
): ReservationChargeActionResult => {
  if (!(error instanceof Error)) {
    throw error;
  }

  const refusal = RESERVATION_CHARGE_REFUSALS.find(
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
