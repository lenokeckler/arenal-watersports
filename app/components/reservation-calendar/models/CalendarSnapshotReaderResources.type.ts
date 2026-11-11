import type { NullableRef } from "@/app/types";
import type { ReservationCalendarSnapshot } from "./ReservationCalendarSnapshot.interface";
import type { CalendarSnapshotExecution } from "./CalendarSnapshotExecution.interface";

export type CalendarSnapshotReaderResources<
  Snapshot extends NullableRef<ReservationCalendarSnapshot>,
> = Omit<
  CalendarSnapshotExecution<Snapshot>,
  "request" | "readSnapshot"
>;
