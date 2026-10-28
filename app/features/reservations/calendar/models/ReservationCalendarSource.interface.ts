import type {
  Database,
  NullableUndefined,
} from "@/app/types";
import type { ReservationCalendarDispatchSource } from "./ReservationCalendarDispatchSource.interface";
import type { ReservationCalendarItemSource } from "./ReservationCalendarItemSource.interface";
import type { ReservationCalendarGuideAssignmentSource } from "./ReservationCalendarGuideAssignmentSource.interface";

export interface ReservationCalendarSource extends Pick<
  Database["public"]["Tables"]["reservations"]["Row"],
  | "customer_name"
  | "ends_at"
  | "id"
  | "starts_at"
  | "status"
> {
  reservation_dispatches: ReservationCalendarDispatchSource[];
  reservation_items: ReservationCalendarItemSource[];
  reservation_guides?: NullableUndefined<
    ReservationCalendarGuideAssignmentSource[]
  >;
}
