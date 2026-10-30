import type { CalendarPeriod } from "@/app/components/calendar/models";
import type { ReservationCalendarPeriodSelectionHandlerDependencies } from "./ReservationCalendarPeriodSelectionHandlerDependencies.interface";

export interface ReservationCalendarPeriodChangeInput extends ReservationCalendarPeriodSelectionHandlerDependencies {
  period: CalendarPeriod;
}
