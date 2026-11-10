"use server";

import { revalidatePath } from "next/cache";
import { PATHS } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { RESERVATION_SPLIT_FEEDBACK_COPY } from "../constants/ReservationSplitFeedbackCopy.constants";
import type { ReservationSplitActionResult } from "../models/ReservationSplitActionResult.type";
import { splitReservation } from "../services/splitReservation";
import { isReservationSplitInput } from "../utils/isReservationSplitInput";
import { mapReservationSplitError } from "../utils/mapReservationSplitError";
import { validateReservationSplitInput } from "../utils/validateReservationSplitInput";

export const splitReservationAction = async (
  input: unknown
): Promise<ReservationSplitActionResult> => {
  if (!isReservationSplitInput(input)) {
    return {
      ok: false,
      errors: { departures: [] },
      formError:
        RESERVATION_SPLIT_FEEDBACK_COPY.SUBMIT_ERROR,
    };
  }

  await assertReservationCalendarAccess();

  const errors = validateReservationSplitInput(input);

  if (errors) {
    return { ok: false, errors };
  }

  try {
    const departures = await splitReservation(input);
    revalidatePath(PATHS.RESERVATIONS.CALENDAR);
    return { ok: true, departures };
  } catch (error) {
    return mapReservationSplitError(
      error,
      input.departures.length
    );
  }
};
