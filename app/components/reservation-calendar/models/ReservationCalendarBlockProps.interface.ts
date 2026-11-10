import type { ReactNode } from "react";
import type { ReservationCalendarBlock } from "./ReservationCalendarBlock.interface";

export interface ReservationCalendarBlockProps {
  actions?: ReactNode;
  block: ReservationCalendarBlock;
  reserveMobileFabSpace?: boolean;
  showEquipmentImage?: boolean;
  showGuides?: boolean;
}
