import type { ReservationCalendarBlock } from "./ReservationCalendarBlock.interface";

export interface ReservationCalendarDayContentProps {
  blocks: ReservationCalendarBlock[];
  messages: string[];
  showGuides: boolean;
}
