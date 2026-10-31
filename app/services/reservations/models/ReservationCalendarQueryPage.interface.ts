import type { NullableRef } from "@/app/types";
import type { ReservationCalendarQueryRow } from "./ReservationCalendarQueryRow.type";

export interface ReservationCalendarQueryPage {
  count: NullableRef<number>;
  rows: NullableRef<readonly ReservationCalendarQueryRow[]>;
}
