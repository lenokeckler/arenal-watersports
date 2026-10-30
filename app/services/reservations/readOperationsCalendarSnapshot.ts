import type { CalendarPeriod } from "@/app/components/calendar/models/CalendarPeriod.interface";
import { addCalendarDays } from "@/app/components/calendar/utils/calendarDateArithmetic";
import { buildCalendarPeriod } from "@/app/components/calendar/utils";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { ReservationCalendarSnapshotRequest } from "./models/ReservationCalendarSnapshotRequest.interface";
import { readOperationsCalendarRows } from "./readOperationsCalendarRows";
import { buildReservationCalendarSnapshotWindow } from "./utils/buildReservationCalendarSnapshotWindow";
import { mapReservationCalendarQueryRow } from "./mapReservationCalendarQueryRow";
import { validateReservationCalendarSnapshotRequest } from "./utils/validateReservationCalendarSnapshotRequest";

export const readOperationsCalendarSnapshot = async (
  input: ReservationCalendarSnapshotRequest
): Promise<ReservationCalendarSnapshot> => {
  const request =
    validateReservationCalendarSnapshotRequest(input);
  const period: CalendarPeriod = buildCalendarPeriod(
    request.anchor,
    request.view
  );
  const window =
    buildReservationCalendarSnapshotWindow(period);
  const { rows, totalCount } =
    await readOperationsCalendarRows(window);
  return {
    endDateExclusive: addCalendarDays(period.end, 1),
    entries: rows.map(mapReservationCalendarQueryRow),
    startDate: period.start,
    totalCount,
  };
};
