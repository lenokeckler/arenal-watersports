import type { ReservationCalendarGuide } from "./ReservationCalendarGuide.type";

export interface ReservationCalendarBlock {
  accessibleLabel: string;
  actualLabels: string[];
  customerName: string;
  equipmentLabel: string;
  guides: ReservationCalendarGuide[];
  id: string;
  scheduledLabel: string;
}
