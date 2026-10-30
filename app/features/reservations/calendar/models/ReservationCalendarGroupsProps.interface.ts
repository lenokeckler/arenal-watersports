import type { CalendarPeriod } from "@/app/components/calendar/models";
import type { ReservationCalendarContent } from "@/app/components/reservation-calendar/models/ReservationCalendarContent.interface";

export interface ReservationCalendarGroupsProps {
  content: ReservationCalendarContent;
  messages: string[];
  period: CalendarPeriod;
}
