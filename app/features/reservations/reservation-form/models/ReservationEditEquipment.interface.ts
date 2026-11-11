import type { ReservationCalendarEquipment } from "@/app/components/reservation-calendar/models/ReservationCalendarEquipment.interface";
import type { NullableRef } from "@/app/types";

export interface ReservationEditEquipment extends ReservationCalendarEquipment {
  unitId: NullableRef<string>;
}
