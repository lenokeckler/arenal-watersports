import type { ReservationPostponementCause } from "../models/ReservationPostponementCause.type";
import { RESERVATION_POSTPONEMENT_CAUSE } from "./ReservationPostponementCause.constants";

export const RESERVATION_POSTPONEMENT_CAUSE_OPTIONS = {
  DISPATCHED: [
    RESERVATION_POSTPONEMENT_CAUSE.HEAVY_RAIN,
    RESERVATION_POSTPONEMENT_CAUSE.STORM,
  ],
  SCHEDULED: [
    RESERVATION_POSTPONEMENT_CAUSE.HEAVY_RAIN,
    RESERVATION_POSTPONEMENT_CAUSE.STORM,
    RESERVATION_POSTPONEMENT_CAUSE.OTHER,
  ],
} as const satisfies Record<
  string,
  readonly ReservationPostponementCause[]
>;
