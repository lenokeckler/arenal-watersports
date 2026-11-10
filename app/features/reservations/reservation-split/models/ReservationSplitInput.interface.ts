import type { ReservationSplitDepartureInput } from "./ReservationSplitDepartureInput.interface";

export interface ReservationSplitInput {
  departures: ReservationSplitDepartureInput[];
  expectedUpdatedAt: string;
  reservationId: string;
}
