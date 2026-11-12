import type { ReservationCalendarBlock } from "@/app/components/reservation-calendar/models/ReservationCalendarBlock.interface";
import type { ReservationCalendarBlockActionLink } from "./ReservationCalendarBlockActionLink.interface";

export interface ReservationCalendarBlockActionsProps {
  block: ReservationCalendarBlock;
  links: readonly ReservationCalendarBlockActionLink[];
}
