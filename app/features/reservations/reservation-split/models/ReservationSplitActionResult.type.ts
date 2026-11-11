import type { ReservationSplitCreatedDeparture } from "./ReservationSplitCreatedDeparture.interface";
import type { ReservationSplitErrors } from "./ReservationSplitErrors.interface";

export type ReservationSplitActionResult =
  | {
      departures: ReservationSplitCreatedDeparture[];
      ok: true;
    }
  | {
      errors: ReservationSplitErrors;
      formError?: string;
      ok: false;
    };
