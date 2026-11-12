import type { ReservationPostponementErrors } from "./ReservationPostponementErrors.interface";

export type ReservationPostponementActionResult =
  | {
      ok: true;
      reservationId: string;
    }
  | {
      errors: ReservationPostponementErrors;
      formError?: string;
      ok: false;
    };
