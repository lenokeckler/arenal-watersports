import type { Database, NullableRef } from "@/app/types";
import type { ReservationCalendarCategorySource } from "./ReservationCalendarCategorySource.type";

export interface ReservationCalendarUnitSource extends Pick<
  Database["public"]["Tables"]["equipment_units"]["Row"],
  "code"
> {
  category: NullableRef<ReservationCalendarCategorySource>;
}
