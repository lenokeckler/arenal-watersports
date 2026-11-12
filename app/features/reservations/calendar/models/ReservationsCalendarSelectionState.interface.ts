import type { CalendarDate } from "@/app/types";

export interface ReservationsCalendarSelectionState {
  selectedDay?: CalendarDate;
  selectedMonth?: CalendarDate;
  selectDay: (date: CalendarDate) => void;
  selectMonth: (date: CalendarDate) => void;
}
