import type { RefObject } from "react";
import type { NullableRef } from "@/app/types";
import type { CalendarPeriod } from "@/app/components/calendar/models";
import type { ReservationCalendarSnapshotRequest } from "@/app/services/reservations/models/ReservationCalendarSnapshotRequest.interface";
import type { ReservationCalendarSnapshot } from "./ReservationCalendarSnapshot.interface";
import type { CalendarSnapshotPeriodOptions } from "./CalendarSnapshotPeriodOptions.interface";

export interface CalendarSnapshotPeriodSelection<
  Snapshot extends NullableRef<ReservationCalendarSnapshot>,
> {
  resources: CalendarSnapshotPeriodOptions<Snapshot>;
  currentRequest: RefObject<
    NullableRef<ReservationCalendarSnapshotRequest>
  >;
  period: CalendarPeriod;
}
