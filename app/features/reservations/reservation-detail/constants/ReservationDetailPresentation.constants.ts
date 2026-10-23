import type { Database } from "@/app/types";
import { RESERVATION_DETAIL_COPY } from "./ReservationDetailCopy.constants";

export const RESERVATION_DETAIL_STATUS_COPY: Record<
  Database["public"]["Enums"]["reservation_status"],
  string
> = {
  cancelled: RESERVATION_DETAIL_COPY.CANCELLED,
  closed: RESERVATION_DETAIL_COPY.CLOSED,
  dispatched: RESERVATION_DETAIL_COPY.DISPATCHED,
  scheduled: RESERVATION_DETAIL_COPY.SCHEDULED,
};

export const RESERVATION_DETAIL_TYPE_COPY: Record<
  Database["public"]["Enums"]["reservation_type"],
  string
> = {
  combo: RESERVATION_DETAIL_COPY.COMBO,
  rental: RESERVATION_DETAIL_COPY.RENTAL,
  tour: RESERVATION_DETAIL_COPY.TOUR,
};

export const RESERVATION_DETAIL_TIME = {
  HOUR_MINUTES: 60,
  ZERO_REMAINDER: 0,
} as const;
