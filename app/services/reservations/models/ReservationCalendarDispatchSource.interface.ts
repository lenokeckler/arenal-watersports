import type { Database, NullableRef } from "@/app/types";
import type { ReservationCalendarCategorySource } from "./ReservationCalendarCategorySource.type";

export interface ReservationCalendarDispatchSource extends Pick<
  Database["public"]["Tables"]["reservation_dispatches"]["Row"],
  | "category_id"
  | "closed_at"
  | "dispatched_at"
  | "ends_at"
  | "id"
> {
  category: NullableRef<ReservationCalendarCategorySource>;
}
