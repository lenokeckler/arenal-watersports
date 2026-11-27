import { RESERVATION_DEPOSIT_REFUSALS } from "../constants/ReservationDepositRefusals.constants";
import type { ReservationDepositActionResult } from "../models/ReservationDepositActionResult.type";

export const mapReservationDepositError = (
  error: unknown
): ReservationDepositActionResult => {
  if (!(error instanceof Error)) {
    throw error;
  }

  const refusal = RESERVATION_DEPOSIT_REFUSALS.find(
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
