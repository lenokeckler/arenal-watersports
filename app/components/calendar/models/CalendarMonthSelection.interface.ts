import type { CalendarDate } from "@/app/types";

export interface CalendarMonthSelection {
  onSelect: (date: CalendarDate) => void;
  selectedDate?: CalendarDate;
}
