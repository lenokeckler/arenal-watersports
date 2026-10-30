import { SUPABASE_WORK_AREA } from "@/app/constants";
import type { CalendarPeriod } from "@/app/components/calendar/models/CalendarPeriod.interface";
import { addCalendarDays } from "@/app/components/calendar/utils/calendarDateArithmetic";
import type { WorkArea } from "@/app/types";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import { buildCalendarPeriod } from "@/app/components/calendar/utils";
import { readReservationCalendarRows } from "./readReservationCalendarRows";
import type { ReservationCalendarSnapshotRequest } from "./models/ReservationCalendarSnapshotRequest.interface";
import { buildReservationCalendarSnapshotWindow } from "./utils/buildReservationCalendarSnapshotWindow";
import { mapReservationCalendarQueryRow } from "./mapReservationCalendarQueryRow";
import { validateReservationCalendarSnapshotRequest } from "./utils/validateReservationCalendarSnapshotRequest";

export const readReservationCalendarSnapshotForArea =
  async (
    input: ReservationCalendarSnapshotRequest,
    workArea: WorkArea = SUPABASE_WORK_AREA.RESERVATIONS
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
      await readReservationCalendarRows(
        {
          endsAt: window.endsAt,
          startsAt: window.startsAt,
        },
        workArea
      );
    return {
      endDateExclusive: addCalendarDays(period.end, 1),
      entries: rows.map(mapReservationCalendarQueryRow),
      startDate: period.start,
      totalCount,
    };
  };
