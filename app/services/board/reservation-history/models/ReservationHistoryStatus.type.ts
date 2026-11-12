import type { RESERVATION_HISTORY_STATUS } from "@/app/constants";

export type ReservationHistoryStatus =
  (typeof RESERVATION_HISTORY_STATUS)[keyof typeof RESERVATION_HISTORY_STATUS];
