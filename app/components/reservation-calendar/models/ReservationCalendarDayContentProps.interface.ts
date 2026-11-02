import type { ReservationCalendarBlock } from "./ReservationCalendarBlock.interface";

export interface ReservationCalendarDayContentProps {
  blocks: ReservationCalendarBlock[];
  messages: string[];
  reserveMobileFabSpace?: boolean;
  showEquipmentImage: boolean;
  showGuides: boolean;
}
