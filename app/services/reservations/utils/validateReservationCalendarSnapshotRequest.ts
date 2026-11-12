import {
  CALENDAR_VIEW,
  RESERVATION_CALENDAR_QUERY_ERROR,
} from "@/app/constants";
import { toCalendarUtcDate } from "@/app/components/calendar/utils/calendarDateArithmetic";
import type { ReservationCalendarSnapshotRequest } from "../models/ReservationCalendarSnapshotRequest.interface";
import { RESERVATION_CALENDAR_SNAPSHOT_TIME as time } from "../constants/ReservationCalendarSnapshot.constants";

export const validateReservationCalendarSnapshotRequest = (
  request: ReservationCalendarSnapshotRequest
): ReservationCalendarSnapshotRequest => {
  if (!request || typeof request !== "object") {
    throw new TypeError(
      RESERVATION_CALENDAR_QUERY_ERROR.INVALID_PERIOD
    );
  }
  if (
    !Object.values(CALENDAR_VIEW).includes(request.view)
  ) {
    throw new TypeError(
      RESERVATION_CALENDAR_QUERY_ERROR.INVALID_VIEW
    );
  }
  toCalendarUtcDate(request.anchor);
  if (
    request.anchor.year < time.SUPPORTED_YEAR_MIN ||
    request.anchor.year > time.SUPPORTED_YEAR_MAX
  ) {
    throw new RangeError(
      RESERVATION_CALENDAR_QUERY_ERROR.INVALID_PERIOD
    );
  }
  return request;
};
