import type { ReservationFormValidation } from "./ReservationFormValidation.interface";

export type ReservationFormActionResult =
  | { ok: true; reservationId: string }
  | {
      ok: false;
      errors: ReservationFormValidation["errors"];
      formError?: string;
    };
