"use server";

import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { RESERVATION_DEPOSIT_FEEDBACK_COPY } from "../constants/ReservationDepositFeedbackCopy.constants";
import type { ReservationDepositActionResult } from "../models/ReservationDepositActionResult.type";
import type { ReservationDepositRecorded } from "../models/ReservationDepositRecorded.interface";
import { recordReservationDeposit } from "../services/recordReservationDeposit";
import { buildReservationDepositCommand } from "../utils/buildReservationDepositCommand";
import { isReservationDepositInput } from "../utils/isReservationDepositInput";
import { mapReservationDepositError } from "../utils/mapReservationDepositError";
import { resolveReservationDepositErrors } from "../utils/resolveReservationDepositErrors";
import { revalidateReservationDepositPaths } from "../utils/revalidateReservationDepositPaths";

export const recordReservationDepositAction = async (
  input: unknown
): Promise<ReservationDepositActionResult> => {
  if (!isReservationDepositInput(input)) {
    return {
      ok: false,
      errors: {},
      formError:
        RESERVATION_DEPOSIT_FEEDBACK_COPY.REQUEST_REJECTED,
    };
  }

  await assertReservationCalendarAccess();

  const errors = resolveReservationDepositErrors(input);

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  let recorded: ReservationDepositRecorded;

  try {
    recorded = await recordReservationDeposit(
      buildReservationDepositCommand(input)
    );
  } catch (error) {
    return mapReservationDepositError(error);
  }

  revalidateReservationDepositPaths(input.reservationId);
  return { ok: true, recorded };
};
