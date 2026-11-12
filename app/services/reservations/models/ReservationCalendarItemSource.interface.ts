import type { Database, NullableRef } from "@/app/types";
import type { ReservationCalendarCategorySource } from "./ReservationCalendarCategorySource.type";
import type { ReservationCalendarUnitSource } from "./ReservationCalendarUnitSource.interface";

export interface ReservationCalendarItemSource extends Pick<
  Database["public"]["Tables"]["reservation_items"]["Row"],
  "category_id" | "extra_id" | "quantity" | "unit_id"
> {
  category: NullableRef<ReservationCalendarCategorySource>;
  unit: NullableRef<ReservationCalendarUnitSource>;
}
