import type { ReservationExtraTimeErrors } from "./ReservationExtraTimeErrors.interface";
import type { ReservationExtraTimeRecorded } from "./ReservationExtraTimeRecorded.interface";

export type ReservationExtraTimeActionResult =
  | {
      ok: true;
      recorded: ReservationExtraTimeRecorded;
    }
  | {
      errors: ReservationExtraTimeErrors;
      formError?: string;
      ok: false;
    };
