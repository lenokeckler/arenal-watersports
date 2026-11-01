"use server";

import { revalidatePath } from "next/cache";
import { resolveReservationEditPath } from "@/app/utils/reservations/resolveReservationEditPath";
import { RESERVATION_EDIT_COPY } from "../constants/ReservationEditCopy.constants";
import type { ReservationFormActionResult } from "../models/ReservationFormActionResult.type";
import { getAuthorizedReservationFormClient } from "../services/getAuthorizedReservationFormClient";
import { updateReservation } from "../services/updateReservation";
import { isReservationEditInput } from "../utils/isReservationEditInput";
import { mapReservationEditError } from "../utils/mapReservationEditError";
import { validateReservationFormInput } from "../utils/validateReservationFormInput";

export const updateReservationAction = async (
  input: unknown
): Promise<ReservationFormActionResult> => {
  if (!isReservationEditInput(input)) {
    return {
      ok: false,
      errors: {},
      formError: RESERVATION_EDIT_COPY.SUBMIT_ERROR,
    };
  }

  await getAuthorizedReservationFormClient();

  const validation = validateReservationFormInput(input);

  if (!validation.value) {
    return { ok: false, errors: validation.errors };
  }

  try {
    const reservationId = await updateReservation({
      ...validation.value,
      expectedUpdatedAt: input.expectedUpdatedAt,
      reservationId: input.reservationId,
    });
    revalidatePath(
      resolveReservationEditPath(reservationId)
    );
    return { ok: true, reservationId };
  } catch (error) {
    return mapReservationEditError(error);
  }
};
