import type { CustomComboReservationValidation } from "./CustomComboReservationValidation.interface";

export type CustomComboReservationActionResult =
  | { ok: true; reservationId: string }
  | {
      ok: false;
      errors: CustomComboReservationValidation["errors"];
      formError?: string;
    };
