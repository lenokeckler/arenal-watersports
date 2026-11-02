import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarEntry } from "./ReservationCalendarEntry.interface";
import type { ReservationCalendarGuide } from "./ReservationCalendarGuide.type";

export interface ReservationCalendarBlock {
  accessibleLabel: string;
  actualLabels: string[];
  customerName: string;
  equipmentLabel: string;
  equipmentCategoryName?: string;
  guides: NullableUndefined<ReservationCalendarGuide[]>;
  id: string;
  scheduledLabel: string;
  status: ReservationCalendarEntry["status"];
}
