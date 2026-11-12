"use server";

import { revalidatePath } from "next/cache";
import { PATHS } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { RESERVATION_POSTPONEMENT_FEEDBACK_COPY } from "../constants/ReservationPostponementFeedbackCopy.constants";
import type { ReservationPostponementActionResult } from "../models/ReservationPostponementActionResult.type";
import { postponeReservation } from "../services/postponeReservation";
import { isReservationPostponementInput } from "../utils/isReservationPostponementInput";
import { mapReservationPostponementError } from "../utils/mapReservationPostponementError";
import { validateReservationPostponementInput } from "../utils/validateReservationPostponementInput";

export const postponeReservationAction = async (
  input: unknown
): Promise<ReservationPostponementActionResult> => {
  if (!isReservationPostponementInput(input)) {
    return {
      ok: false,
      errors: { readings: {} },
      formError:
        RESERVATION_POSTPONEMENT_FEEDBACK_COPY.SUBMIT_ERROR,
    };
  }

  await assertReservationCalendarAccess();

  const errors =
    validateReservationPostponementInput(input);

  if (errors) {
    return { ok: false, errors };
  }

  try {
    const reservationId = await postponeReservation(input);
    revalidatePath(PATHS.RESERVATIONS.CALENDAR);
    return { ok: true, reservationId };
  } catch (error) {
    return mapReservationPostponementError(error);
  }
};
