"use server";

import { createRentalReservation } from "../services/createRentalReservation";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { validateReservationFormInput } from "../utils/validateReservationFormInput";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";
import { isReservationFormInput } from "../utils/isReservationFormInput";

export const createReservationAction = async (
  input: unknown
): Promise<ReservationFormActionResult> => {
  if (!isReservationFormInput(input)) {
    return {
      ok: false,
      errors: {},
      formError: RESERVATION_FORM_UI_COPY.SUBMIT_ERROR,
    };
  }

  await getAuthorizedReservationFormClient();

  const validation = validateReservationFormInput(input);

  if (!validation.value) {
    return { ok: false, errors: validation.errors };
  }

  const reservationId = await createRentalReservation(
    validation.value
  );
  return { ok: true, reservationId };
};
