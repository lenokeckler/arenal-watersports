import type { CustomComboReservationActionResult } from "../models/CustomComboReservationActionResult.type";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";

export const mapCustomComboReservationResult = (
  result: CustomComboReservationActionResult
): ReservationFormActionResult =>
  result.ok
    ? result
    : {
        errors: result.errors,
        formError: result.formError,
        ok: false,
      };
