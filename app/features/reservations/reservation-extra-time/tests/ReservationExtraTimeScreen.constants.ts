import { RESERVATION_STATUS } from "@/app/constants";
import { RESERVATION_EXTRA_TIME_OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import type { ReservationExtraTime } from "../models/ReservationExtraTime.interface";
import { mapReservationExtraTime } from "../utils/mapReservationExtraTime";
import {
  EXTRA_TIME_EXTENDED_ROW,
  EXTRA_TIME_OVERDUE_ROW,
  EXTRA_TIME_RESERVATION_ROW,
  EXTRA_TIME_TOTAL_MINUTES,
} from "./ReservationExtraTime.constants";

export const EXTRA_TIME_SCREEN: ReservationExtraTime =
  mapReservationExtraTime(
    EXTRA_TIME_RESERVATION_ROW,
    [EXTRA_TIME_OVERDUE_ROW, EXTRA_TIME_EXTENDED_ROW],
    null
  );

export const EXTRA_TIME_STILL_OUT: ReservationExtraTime = {
  ...EXTRA_TIME_SCREEN,
  status: RESERVATION_STATUS.DISPATCHED,
};

export const EXTRA_TIME_RESOLVED: ReservationExtraTime = {
  ...EXTRA_TIME_SCREEN,
  resolution: {
    extraMinutes: EXTRA_TIME_TOTAL_MINUTES,
    outcome: RESERVATION_EXTRA_TIME_OUTCOME.CHARGED,
  },
};

export const EXTRA_TIME_NOT_FOUND = "NEXT_NOT_FOUND";

export const EXTRA_TIME_ACCESS_REDIRECT = new Error(
  "NEXT_REDIRECT"
);

export const EXTRA_TIME_SCREEN_TEXT = {
  ARRIVED_OVERDUE: "10:35",
  PLANNED_RETURN: "10:00",
  TOTAL: "1 h 5 min",
} as const;
