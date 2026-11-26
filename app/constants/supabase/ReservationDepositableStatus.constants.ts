import type { Database } from "@/app/types";
import { RESERVATION_STATUS } from "./ReservationStatus.constants";

export const RESERVATION_DEPOSITABLE_STATUS = {
  DISPATCHED: RESERVATION_STATUS.DISPATCHED,
  SCHEDULED: RESERVATION_STATUS.SCHEDULED,
} as const satisfies Record<
  string,
  Database["public"]["Enums"]["reservation_status"]
>;

export type ReservationDepositableStatus =
  (typeof RESERVATION_DEPOSITABLE_STATUS)[keyof typeof RESERVATION_DEPOSITABLE_STATUS];
