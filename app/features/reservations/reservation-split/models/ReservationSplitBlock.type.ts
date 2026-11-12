import type { RESERVATION_SPLIT_BLOCK } from "../constants/ReservationSplitBlock.constants";

export type ReservationSplitBlock =
  (typeof RESERVATION_SPLIT_BLOCK)[keyof typeof RESERVATION_SPLIT_BLOCK];
