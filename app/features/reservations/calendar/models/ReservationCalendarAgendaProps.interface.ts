import type { ReservationCalendarAgendaContent } from "./ReservationCalendarAgendaContent.interface";

export interface ReservationCalendarAgendaProps {
  agenda: ReservationCalendarAgendaContent;
  label: string;
  showGroups: boolean;
}
