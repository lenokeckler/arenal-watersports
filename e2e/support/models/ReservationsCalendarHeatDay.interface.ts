import type { CalendarDate } from "@/app/types";
import type { CalendarHeatLevel } from "@/app/components/calendar/constants/CalendarHeatLevel.constants";

export interface ReservationsCalendarHeatDay {
  count: number;
  customerNames: readonly string[];
  date: CalendarDate;
  heatLevel: CalendarHeatLevel;
}
