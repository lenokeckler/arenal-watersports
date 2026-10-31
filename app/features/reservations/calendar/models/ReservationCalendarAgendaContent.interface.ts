import type { ReservationCalendarContent } from "@/app/components/reservation-calendar/models/ReservationCalendarContent.interface";

export interface ReservationCalendarAgendaContent {
  content: ReservationCalendarContent;
  messages: string[];
}
