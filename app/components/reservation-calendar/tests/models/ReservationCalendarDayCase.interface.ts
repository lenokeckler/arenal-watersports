import type { NullableUndefined } from "@/app/types";
import type { ReservationCalendarSnapshot } from "../../models/ReservationCalendarSnapshot.interface";

export interface ReservationCalendarDayCase {
  message: string;
  name: string;
  snapshot: NullableUndefined<ReservationCalendarSnapshot>;
}
