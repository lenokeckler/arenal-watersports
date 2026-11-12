import {
  CALENDAR_VIEW,
  RESERVATION_CALENDAR_QUERY_ERROR,
} from "@/app/constants";
import type { CalendarView } from "@/app/types";
import type { ReservationCalendarPeriodRequest } from "../models/ReservationCalendarPeriodRequest.interface";
import { toCalendarUtcDate } from "@/app/components/calendar/utils/calendarDateArithmetic";
import { RESERVATION_CALENDAR_TIME } from "../constants/ReservationCalendarTime.constants";

const isReservationCalendarView = (
  view: unknown
): view is CalendarView =>
  Object.values(CALENDAR_VIEW).some(
    (allowedView) => allowedView === view
  );

export const validateReservationCalendarPeriodRequest = (
  request: ReservationCalendarPeriodRequest
): ReservationCalendarPeriodRequest => {
  if (!request || typeof request !== "object") {
    throw new TypeError(
      RESERVATION_CALENDAR_QUERY_ERROR.INVALID_PERIOD
    );
  }
  if (!isReservationCalendarView(request.view)) {
    throw new TypeError(
      RESERVATION_CALENDAR_QUERY_ERROR.INVALID_VIEW
    );
  }
  toCalendarUtcDate(request.anchor);
  if (
    request.anchor.year <
      RESERVATION_CALENDAR_TIME.SUPPORTED_YEAR_MIN ||
    request.anchor.year >
      RESERVATION_CALENDAR_TIME.SUPPORTED_YEAR_MAX
  ) {
    throw new RangeError(
      RESERVATION_CALENDAR_QUERY_ERROR.INVALID_PERIOD
    );
  }
  return request;
};
