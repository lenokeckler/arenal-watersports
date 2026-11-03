import type { CalendarDate } from "@/app/types";
import type { ReservationCalendarEntry } from "./ReservationCalendarEntry.interface";

export interface ReservationCalendarSnapshot {
  endDateExclusive: CalendarDate;
  entries: readonly ReservationCalendarEntry[];
  startDate: CalendarDate;
  totalCount: number;
}
