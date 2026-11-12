import type { E2eReservationHistorySeed } from "./E2eReservationHistorySeed.interface";

export interface E2eReservationHistoryDetails extends Pick<
  E2eReservationHistorySeed,
  "cancellationReason" | "startsAt" | "type" | "unitCode"
> {
  label?: string;
  status?: E2eReservationHistorySeed["status"];
}
