import type { CalendarHeatLevel } from "@/app/components/calendar/constants/CalendarHeatLevel.constants";
import type { CalendarDate } from "@/app/types";

export interface ReservationCalendarHeatMap {
  getDayHeatLevel: (
    date: CalendarDate
  ) => CalendarHeatLevel;
}
