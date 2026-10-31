"use server";

import { createRentalReservation } from "../services/createRentalReservation";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { validateReservationFormInput } from "../utils/validateReservationFormInput";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";
import { isReservationFormInput } from "../utils/isReservationFormInput";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";

const handleReservationCreationError = (
  error: unknown
): ReservationFormActionResult => {
  if (
    error instanceof Error &&
    (error.message.includes(
      RESERVATION_SERVICE_OPERATION.UNIT_UNAVAILABLE
    ) ||
      error.message.includes(
        RESERVATION_SERVICE_OPERATION.UNIT_CONFLICT
      ))
  ) {
    return {
      ok: false,
      errors: {
        [RESERVATION_FORM_FIELD.UNIT_ID]:
          RESERVATION_FORM_UI_COPY.UNIT_UNAVAILABLE,
      },
      unitUnavailable: true,
    };
  }

  throw error;
};

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

  try {
    const reservationId = await createRentalReservation(
      validation.value
    );
    return { ok: true, reservationId };
  } catch (error) {
    return handleReservationCreationError(error);
  }
};
