import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import {
  RESERVATION_REFUND_REFUSALS,
  RESERVATION_REFUND_REFUSALS_FOR_OTHER_REASON,
} from "../constants/ReservationRefundRefusals.constants";
import type { ReservationRefundActionResult } from "../models/ReservationRefundActionResult.type";
import type { ReservationRefundValues } from "../models/ReservationRefundValues.interface";

export const mapReservationRefundError = (
  error: unknown,
  reason: ReservationRefundValues["reason"]
): ReservationRefundActionResult => {
  if (!(error instanceof Error)) {
    throw error;
  }

  const refusals =
    reason === RESERVATION_REFUND_REASON.OTHER
      ? RESERVATION_REFUND_REFUSALS_FOR_OTHER_REASON
      : RESERVATION_REFUND_REFUSALS;

  const refusal = refusals.find(({ message }) =>
    error.message.includes(message)
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
