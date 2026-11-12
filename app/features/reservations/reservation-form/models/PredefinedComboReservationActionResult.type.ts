import type { PredefinedComboReservationValidation } from "./PredefinedComboReservationValidation.interface";

export type PredefinedComboReservationActionResult =
  | { ok: true; reservationId: string }
  | {
      ok: false;
      errors: PredefinedComboReservationValidation["errors"];
      formError?: string;
    };
