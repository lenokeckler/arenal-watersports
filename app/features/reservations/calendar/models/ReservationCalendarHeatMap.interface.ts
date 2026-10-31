import type { CalendarHeatLevel } from "@/app/components/calendar/constants/CalendarHeatLevel.constants";
import type { CalendarDate } from "@/app/types";
import type { NullableUndefined } from "@/app/types";

export interface ReservationCalendarHeatMap {
  getDayReservationCount: (
    date: CalendarDate
  ) => NullableUndefined<number>;
  getDayHeatLevel: (
    date: CalendarDate
  ) => CalendarHeatLevel;
}
