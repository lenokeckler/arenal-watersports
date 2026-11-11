import type { ReservationCancellationStatus } from "./ReservationCancellationStatus.type";

export type ReservationCancellationBlockedStatus = Exclude<
  ReservationCancellationStatus,
  "scheduled"
>;
