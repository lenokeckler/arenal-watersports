import { RESERVATION_POSTPONEMENT_CAUSE_OPTIONS } from "../constants/ReservationPostponementCauseOptions.constants";
import type { ReservationPostponementCause } from "../models/ReservationPostponementCause.type";

export const listReservationPostponementCauses = (
  isDispatched: boolean
): readonly ReservationPostponementCause[] =>
  isDispatched
    ? RESERVATION_POSTPONEMENT_CAUSE_OPTIONS.DISPATCHED
    : RESERVATION_POSTPONEMENT_CAUSE_OPTIONS.SCHEDULED;
