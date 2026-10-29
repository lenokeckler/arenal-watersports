import type { Database } from "@/app/types";
import type { ReservationCalendarDispatch } from "./ReservationCalendarDispatch.interface";
import type { ReservationCalendarEquipment } from "./ReservationCalendarEquipment.interface";

export interface ReservationCalendarEntry {
  customerName: string;
  dispatches: ReservationCalendarDispatch[];
  endsAt: string;
  equipment: ReservationCalendarEquipment[];
  id: string;
  startsAt: string;
  status: Database["public"]["Enums"]["reservation_status"];
}
