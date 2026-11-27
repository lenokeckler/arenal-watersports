import { RESERVATION_EXTRA_TIME_OUTCOME_ORDER } from "../constants/ReservationExtraTimeOutcome.constants";
import type { ReservationExtraTimeOutcome } from "../models/ReservationExtraTimeOutcome.type";

export const isReservationExtraTimeOutcome = (
  value: unknown
): value is ReservationExtraTimeOutcome =>
  RESERVATION_EXTRA_TIME_OUTCOME_ORDER.some(
    (outcome) => outcome === value
  );
