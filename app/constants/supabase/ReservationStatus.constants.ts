import type { Database } from "@/app/types";

export const RESERVATION_STATUS = {
  CANCELLED: "cancelled",
  CLOSED: "closed",
  DISPATCHED: "dispatched",
  SCHEDULED: "scheduled",
} as const satisfies Record<
  string,
  Database["public"]["Enums"]["reservation_status"]
>;

export type ReservationStatus =
  (typeof RESERVATION_STATUS)[keyof typeof RESERVATION_STATUS];
