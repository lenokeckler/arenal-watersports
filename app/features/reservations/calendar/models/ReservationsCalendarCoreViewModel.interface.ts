import type { CalendarDayContent } from "@/app/components/calendar/models/CalendarDayContent.type";
import type { ReservationCalendarSnapshotState } from "./ReservationCalendarSnapshotState.interface";
import type { ReservationsCalendarSelection } from "./ReservationsCalendarSelection.interface";

export interface ReservationsCalendarCoreViewModel {
  calendarSelection: ReservationsCalendarSelection;
  dayContent: CalendarDayContent;
  snapshotState: ReservationCalendarSnapshotState;
}
