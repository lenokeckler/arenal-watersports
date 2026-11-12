"use server";

import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { PredefinedComboReservationActionResult } from "../models/PredefinedComboReservationActionResult.type";
import { createPredefinedComboReservation } from "../services/createPredefinedComboReservation";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { isPredefinedComboReservationInput } from "../utils/isPredefinedComboReservationInput";
import { validatePredefinedComboReservationInput } from "../utils/validatePredefinedComboReservationInput";

export const createPredefinedComboReservationAction =
  async (
    input: unknown
  ): Promise<PredefinedComboReservationActionResult> => {
    if (!isPredefinedComboReservationInput(input)) {
      return {
        ok: false,
        errors: {},
        formError: RESERVATION_FORM_UI_COPY.SUBMIT_ERROR,
      };
    }

    await getAuthorizedReservationFormClient();

    const validation =
      validatePredefinedComboReservationInput(input);

    if (!validation.value) {
      return { ok: false, errors: validation.errors };
    }

    const reservationId =
      await createPredefinedComboReservation(
        validation.value
      );

    return { ok: true, reservationId };
  };
