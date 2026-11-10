import type { RESERVATION_POSTPONEMENT_BLOCK } from "../constants/ReservationPostponementBlock.constants";

export type ReservationPostponementBlock =
  (typeof RESERVATION_POSTPONEMENT_BLOCK)[keyof typeof RESERVATION_POSTPONEMENT_BLOCK];
