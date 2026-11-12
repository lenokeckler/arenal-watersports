import { PREDEFINED_COMBO_RESERVATION_COPY } from "../constants/PredefinedComboReservation.constants";
import type { PredefinedComboReservationActionResult } from "../models/PredefinedComboReservationActionResult.type";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";

export const mapPredefinedComboReservationResult = (
  result: PredefinedComboReservationActionResult
): ReservationFormActionResult => {
  if (result.ok) {
    return result;
  }

  const { comboId, ...errors } = result.errors;
  return {
    errors,
    formError:
      result.formError ??
      (comboId
        ? PREDEFINED_COMBO_RESERVATION_COPY.COMBO_ID
        : undefined),
    ok: false,
  };
};
