import type { ReservationChargeErrors } from "./ReservationChargeErrors.interface";
import type { ReservationChargeRecorded } from "./ReservationChargeRecorded.interface";

export type ReservationChargeActionResult =
  | {
      ok: true;
      recorded: ReservationChargeRecorded;
    }
  | {
      errors: ReservationChargeErrors;
      formError?: string;
      ok: false;
    };
