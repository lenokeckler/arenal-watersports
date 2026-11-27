import type { ReservationExtraTimeOutcome } from "../models/ReservationExtraTimeOutcome.type";

export const RESERVATION_EXTRA_TIME_OUTCOME = {
  CHARGED: "charged",
  COURTESY: "courtesy",
} as const;

export const RESERVATION_EXTRA_TIME_OUTCOME_ORDER: readonly ReservationExtraTimeOutcome[] =
  [
    RESERVATION_EXTRA_TIME_OUTCOME.CHARGED,
    RESERVATION_EXTRA_TIME_OUTCOME.COURTESY,
  ];
