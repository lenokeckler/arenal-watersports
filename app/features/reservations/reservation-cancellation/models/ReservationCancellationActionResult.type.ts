import type { ReservationCancellationErrors } from "./ReservationCancellationErrors.interface";

export type ReservationCancellationActionResult =
  | {
      ok: true;
      reservationId: string;
    }
  | {
      errors: ReservationCancellationErrors;
      formError?: string;
      ok: false;
    };
