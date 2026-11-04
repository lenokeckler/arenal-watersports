import type { ReservationCalendarBlock } from "./ReservationCalendarBlock.interface";

export interface ReservationCalendarDayContentProps {
  blocks: ReservationCalendarBlock[];
  enableDetailLinks?: boolean;
  messages: string[];
  reserveMobileFabSpace?: boolean;
  showEquipmentImage: boolean;
  showGuides: boolean;
}
