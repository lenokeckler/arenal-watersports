"use server";

import { revalidatePath } from "next/cache";
import { PATHS } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { RESERVATION_CHARGE_FEEDBACK_COPY } from "../constants/ReservationChargeFeedbackCopy.constants";
import type { ReservationChargeActionResult } from "../models/ReservationChargeActionResult.type";
import { recordReservationCharge } from "../services/recordReservationCharge";
import { buildReservationChargeCommand } from "../utils/buildReservationChargeCommand";
import { isReservationChargeInput } from "../utils/isReservationChargeInput";
import { mapReservationChargeError } from "../utils/mapReservationChargeError";
import { resolveReservationChargeErrors } from "../utils/resolveReservationChargeErrors";

export const recordReservationChargeAction = async (
  input: unknown
): Promise<ReservationChargeActionResult> => {
  if (!isReservationChargeInput(input)) {
    return {
      ok: false,
      errors: {},
      formError: RESERVATION_CHARGE_FEEDBACK_COPY.GENERIC,
    };
  }

  await assertReservationCalendarAccess();

  const errors = resolveReservationChargeErrors(input);

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  try {
    const recorded = await recordReservationCharge(
      buildReservationChargeCommand(input)
    );
    revalidatePath(
      PATHS.RESERVATIONS.DETAIL(input.reservationId)
    );
    revalidatePath(PATHS.RESERVATIONS.INCOME);
    return { ok: true, recorded };
  } catch (error) {
    return mapReservationChargeError(error);
  }
};
