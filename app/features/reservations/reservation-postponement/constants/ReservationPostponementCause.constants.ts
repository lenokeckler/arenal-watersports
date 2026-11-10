import type { ReservationPostponementCause } from "../models/ReservationPostponementCause.type";

export const RESERVATION_POSTPONEMENT_CAUSE = {
  HEAVY_RAIN: "heavy_rain",
  OTHER: "other",
  STORM: "storm",
} as const satisfies Record<
  string,
  ReservationPostponementCause
>;
