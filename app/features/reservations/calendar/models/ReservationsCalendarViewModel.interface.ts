import type { CalendarDayContent } from "@/app/components/calendar/models/CalendarDayContent.type";
import type { CalendarPeriodContent } from "@/app/components/calendar/models/CalendarPeriodContent.type";
import type { CalendarPeriodChangeHandler } from "@/app/components/calendar/models/CalendarPeriodChangeHandler.type";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import type { NullableRef } from "@/app/types";
import type { CalendarViewSelection } from "@/app/components/calendar/models/CalendarViewSelection.interface";

export interface ReservationsCalendarViewModel {
  dayContent: CalendarDayContent;
  hasRefreshError: boolean;
  isRefreshing: boolean;
  onPeriodChange: CalendarPeriodChangeHandler;
  onRetry: () => void;
  periodContent: CalendarPeriodContent;
  snapshot: NullableRef<ReservationCalendarSnapshot>;
  selection: CalendarViewSelection;
}
