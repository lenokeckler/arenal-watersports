import type { ReservationSplitDepartureErrors } from "./ReservationSplitDepartureErrors.interface";

export interface ReservationSplitErrors {
  departures: ReservationSplitDepartureErrors[];
  original?: string;
}
