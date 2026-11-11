import type { CalendarDate } from "@/app/types";
import type { ReservationCalendarBlock } from "./ReservationCalendarBlock.interface";

export interface ReservationCalendarDayGroup {
  blocks: ReservationCalendarBlock[];
  date: CalendarDate;
  dateLabel: string;
}
