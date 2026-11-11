"use server";

import { revalidatePath } from "next/cache";
import { PATHS } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { RESERVATION_CANCELLATION_FEEDBACK_COPY } from "../constants/ReservationCancellationFeedbackCopy.constants";
import type { ReservationCancellationActionResult } from "../models/ReservationCancellationActionResult.type";
import { cancelReservation } from "../services/cancelReservation";
import { isReservationCancellationInput } from "../utils/isReservationCancellationInput";
import { mapReservationCancellationError } from "../utils/mapReservationCancellationError";
import { resolveReservationCancellationReasonError } from "../utils/resolveReservationCancellationReasonError";

export const cancelReservationAction = async (
  input: unknown
): Promise<ReservationCancellationActionResult> => {
  if (!isReservationCancellationInput(input)) {
    return {
      ok: false,
      errors: {},
      formError:
        RESERVATION_CANCELLATION_FEEDBACK_COPY.SUBMIT_ERROR,
    };
  }

  await assertReservationCalendarAccess();

  const reason = resolveReservationCancellationReasonError(
    input.reason
  );

  if (reason) {
    return { ok: false, errors: { reason } };
  }

  try {
    const reservationId = await cancelReservation(input);
    revalidatePath(PATHS.RESERVATIONS.CALENDAR);
    return { ok: true, reservationId };
  } catch (error) {
    return mapReservationCancellationError(error);
  }
};
