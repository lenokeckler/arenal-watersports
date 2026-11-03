import type { ReservationCalendarBlock } from "./ReservationCalendarBlock.interface";

export interface ReservationCalendarBlockProps {
  block: ReservationCalendarBlock;
  reserveMobileFabSpace?: boolean;
  showEquipmentImage?: boolean;
  showGuides?: boolean;
}
