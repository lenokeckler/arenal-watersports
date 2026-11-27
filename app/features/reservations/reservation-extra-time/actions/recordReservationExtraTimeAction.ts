"use server";

import { revalidatePath } from "next/cache";
import { PATHS } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { RESERVATION_EXTRA_TIME_FEEDBACK_COPY } from "../constants/ReservationExtraTimeFeedbackCopy.constants";
import type { ReservationExtraTimeActionResult } from "../models/ReservationExtraTimeActionResult.type";
import { recordReservationExtraTime } from "../services/recordReservationExtraTime";
import { buildReservationExtraTimeCommand } from "../utils/buildReservationExtraTimeCommand";
import { isReservationExtraTimeInput } from "../utils/isReservationExtraTimeInput";
import { mapReservationExtraTimeError } from "../utils/mapReservationExtraTimeError";
import { resolveReservationExtraTimeErrors } from "../utils/resolveReservationExtraTimeErrors";

export const recordReservationExtraTimeAction = async (
  input: unknown
): Promise<ReservationExtraTimeActionResult> => {
  if (!isReservationExtraTimeInput(input)) {
    return {
      ok: false,
      errors: {},
      formError:
        RESERVATION_EXTRA_TIME_FEEDBACK_COPY.REQUEST_REJECTED,
    };
  }

  await assertReservationCalendarAccess();

  const errors = resolveReservationExtraTimeErrors(input);

  if (
    Object.keys(errors).length > 0 ||
    input.outcome === null
  ) {
    return { ok: false, errors };
  }

  try {
    const recorded = await recordReservationExtraTime(
      buildReservationExtraTimeCommand(input, input.outcome)
    );
    revalidatePath(
      PATHS.RESERVATIONS.DETAIL(input.reservationId)
    );
    revalidatePath(PATHS.RESERVATIONS.INCOME);
    return { ok: true, recorded };
  } catch (error) {
    return mapReservationExtraTimeError(error);
  }
};
