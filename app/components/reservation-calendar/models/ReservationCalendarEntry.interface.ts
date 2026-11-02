import type { Database } from "@/app/types";
import type { ReservationCalendarDispatch } from "./ReservationCalendarDispatch.interface";
import type { ReservationCalendarEquipment } from "./ReservationCalendarEquipment.interface";
import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarGuide } from "./ReservationCalendarGuide.type";

export interface ReservationCalendarEntry {
  customerName: string;
  dispatches: ReservationCalendarDispatch[];
  endsAt: string;
  equipment: ReservationCalendarEquipment[];
  guides: NullableUndefined<ReservationCalendarGuide[]>;
  id: string;
  startsAt: string;
  status: Database["public"]["Enums"]["reservation_status"];
}
