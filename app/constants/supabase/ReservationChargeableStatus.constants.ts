import type { Database } from "@/app/types";
import { RESERVATION_STATUS } from "./ReservationStatus.constants";

export const RESERVATION_CHARGEABLE_STATUS = {
  CLOSED: RESERVATION_STATUS.CLOSED,
  DISPATCHED: RESERVATION_STATUS.DISPATCHED,
  SCHEDULED: RESERVATION_STATUS.SCHEDULED,
} as const satisfies Record<
  string,
  Database["public"]["Enums"]["reservation_status"]
>;

export type ReservationChargeableStatus =
  (typeof RESERVATION_CHARGEABLE_STATUS)[keyof typeof RESERVATION_CHARGEABLE_STATUS];
