import type { ReservationCalendarSnapshotRequest } from "@/app/services/reservations/models/ReservationCalendarSnapshotRequest.interface";
import type { ReservationCalendarSnapshot } from "./ReservationCalendarSnapshot.interface";

export type CalendarSnapshotReader = (
  request: ReservationCalendarSnapshotRequest
) => Promise<ReservationCalendarSnapshot>;
