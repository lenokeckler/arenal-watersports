import type { useCalendarSnapshotRequest } from "../hooks/useCalendarSnapshotRequest";
import type { NullableRef } from "@/app/types";
import type { ReservationCalendarSnapshot } from "./ReservationCalendarSnapshot.interface";

export type CalendarSnapshotPeriodOptions<
  Snapshot extends NullableRef<ReservationCalendarSnapshot>,
> = ReturnType<typeof useCalendarSnapshotRequest<Snapshot>>;
