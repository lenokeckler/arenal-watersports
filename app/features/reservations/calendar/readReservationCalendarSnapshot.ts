import { PAGINATION } from "@/app/constants";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import { buildCalendarPeriod } from "@/app/components/calendar/utils";
import { addCalendarDays } from "@/app/components/calendar/utils/calendarDateArithmetic";
import { readReservationCalendarRows } from "@/app/services/reservations/readReservationCalendarRows";
import type { ReservationCalendarPeriodRequest } from "./models/ReservationCalendarPeriodRequest.interface";
import { buildReservationCalendarWindow } from "./utils/buildReservationCalendarWindow";
import { mapReservationCalendarEntry } from "./utils/mapReservationCalendarEntry";
import { validateReservationCalendarPeriodRequest } from "./utils/validateReservationCalendarPeriodRequest";

export const readReservationCalendarSnapshot = async (
  input: ReservationCalendarPeriodRequest
): Promise<ReservationCalendarSnapshot> => {
  const request =
    validateReservationCalendarPeriodRequest(input);
  const period = buildCalendarPeriod(
    request.anchor,
    request.view
  );
  const window = buildReservationCalendarWindow(
    period,
    PAGINATION.DEFAULT_PAGE
  );
  const { rows, totalCount } =
    await readReservationCalendarRows({
      endsAt: window.endsAt,
      startsAt: window.startsAt,
    });
  return {
    endDateExclusive: addCalendarDays(period.end, 1),
    entries: rows.map(mapReservationCalendarEntry),
    startDate: period.start,
    totalCount,
  };
};
