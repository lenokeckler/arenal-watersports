import type { NullableRef } from "@/app/types";
import type { ReservationCalendarDayGroup } from "./ReservationCalendarDayGroup.interface";

export interface ReservationCalendarContent {
  coversPeriod: boolean;
  groups: ReservationCalendarDayGroup[];
  hasAllResults: boolean;
  hasSnapshot: boolean;
  loadedCount: number;
  totalCount: NullableRef<number>;
}
