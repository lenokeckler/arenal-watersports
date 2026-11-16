"use server";

import { revalidatePath } from "next/cache";
import { PATHS } from "@/app/constants";
import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { RESERVATION_REFUND_FEEDBACK_COPY } from "../constants/ReservationRefundFeedbackCopy.constants";
import type { ReservationRefundActionResult } from "../models/ReservationRefundActionResult.type";
import { recordReservationRefund } from "../services/recordReservationRefund";
import { buildReservationRefundCommand } from "../utils/buildReservationRefundCommand";
import { isReservationRefundInput } from "../utils/isReservationRefundInput";
import { mapReservationRefundError } from "../utils/mapReservationRefundError";
import { resolveReservationRefundErrors } from "../utils/resolveReservationRefundErrors";

export const recordReservationRefundAction = async (
  input: unknown
): Promise<ReservationRefundActionResult> => {
  if (!isReservationRefundInput(input)) {
    return {
      ok: false,
      errors: {},
      formError:
        RESERVATION_REFUND_FEEDBACK_COPY.REQUEST_REJECTED,
    };
  }

  await assertReservationCalendarAccess();

  const errors = resolveReservationRefundErrors(input);

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  try {
    const recorded = await recordReservationRefund(
      buildReservationRefundCommand(input)
    );
    revalidatePath(
      PATHS.RESERVATIONS.DETAIL(input.reservationId)
    );
    revalidatePath(PATHS.RESERVATIONS.INCOME);
    return { ok: true, recorded };
  } catch (error) {
    return mapReservationRefundError(error, input.reason);
  }
};
