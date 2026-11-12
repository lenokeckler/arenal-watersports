import type { NullableRef } from "@/app/types";
import type { ReservationCalendarGuideSource } from "./ReservationCalendarGuideSource.interface";

export interface ReservationCalendarGuideAssignmentSource {
  worker_id: string;
  workers: NullableRef<ReservationCalendarGuideSource>;
}
