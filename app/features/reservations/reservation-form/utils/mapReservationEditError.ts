import { RESERVATION_EDIT_ERROR_RULES } from "../constants/ReservationEditErrorRules.constants";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";

export const mapReservationEditError = (
  error: unknown
): ReservationFormActionResult => {
  const message =
    error instanceof Error ? error.message : null;
  const rule = RESERVATION_EDIT_ERROR_RULES.find(
    (candidate) => message?.includes(candidate.message)
  );
  if (!rule) {
    throw error;
  }
  return rule.result;
};
