"use server";

import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { CustomComboReservationActionResult } from "../models/CustomComboReservationActionResult.type";
import { createCustomComboReservation } from "../services/createCustomComboReservation";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { isCustomComboReservationInput } from "../utils/isCustomComboReservationInput";
import { validateCustomComboReservationInput } from "../utils/validateCustomComboReservationInput";

export const createCustomComboReservationAction = async (
  input: unknown
): Promise<CustomComboReservationActionResult> => {
  if (!isCustomComboReservationInput(input)) {
    return {
      ok: false,
      errors: {},
      formError: RESERVATION_FORM_UI_COPY.SUBMIT_ERROR,
    };
  }

  await getAuthorizedReservationFormClient();

  const validation =
    validateCustomComboReservationInput(input);

  if (!validation.value) {
    return { ok: false, errors: validation.errors };
  }

  const reservationId = await createCustomComboReservation(
    validation.value
  );

  return { ok: true, reservationId };
};
