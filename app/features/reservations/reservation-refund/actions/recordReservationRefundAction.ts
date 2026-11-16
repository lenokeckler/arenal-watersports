"use server";

import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { RESERVATION_REFUND_FEEDBACK_COPY } from "../constants/ReservationRefundFeedbackCopy.constants";
import type { ReservationRefundActionResult } from "../models/ReservationRefundActionResult.type";
import type { ReservationRefundRecorded } from "../models/ReservationRefundRecorded.interface";
import { recordReservationRefund } from "../services/recordReservationRefund";
import { buildReservationRefundCommand } from "../utils/buildReservationRefundCommand";
import { isReservationRefundInput } from "../utils/isReservationRefundInput";
import { mapReservationRefundError } from "../utils/mapReservationRefundError";
import { resolveReservationRefundErrors } from "../utils/resolveReservationRefundErrors";
import { revalidateReservationRefundPaths } from "../utils/revalidateReservationRefundPaths";

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

  let recorded: ReservationRefundRecorded;

  try {
    recorded = await recordReservationRefund(
      buildReservationRefundCommand(input)
    );
  } catch (error) {
    return mapReservationRefundError(error, input.reason);
  }

  revalidateReservationRefundPaths(input.reservationId);
  return { ok: true, recorded };
};
