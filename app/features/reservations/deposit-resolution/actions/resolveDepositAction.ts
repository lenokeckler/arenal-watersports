"use server";

import { assertReservationCalendarAccess } from "@/app/services/reservations/assertReservationCalendarAccess";
import { DEPOSIT_RESOLUTION_FEEDBACK_COPY } from "../constants/DepositResolutionFeedbackCopy.constants";
import type { DepositResolutionActionResult } from "../models/DepositResolutionActionResult.type";
import type { DepositResolutionRecorded } from "../models/DepositResolutionRecorded.interface";
import { recordDepositResolution } from "../services/recordDepositResolution";
import { buildDepositResolutionCommand } from "../utils/buildDepositResolutionCommand";
import { isDepositResolutionInput } from "../utils/isDepositResolutionInput";
import { mapDepositResolutionError } from "../utils/mapDepositResolutionError";
import { resolveDepositResolutionInputErrors } from "../utils/resolveDepositResolutionInputErrors";
import { revalidateDepositResolutionPaths } from "../utils/revalidateDepositResolutionPaths";

export const resolveDepositAction = async (
  input: unknown
): Promise<DepositResolutionActionResult> => {
  if (!isDepositResolutionInput(input)) {
    return {
      ok: false,
      errors: {},
      formError:
        DEPOSIT_RESOLUTION_FEEDBACK_COPY.REQUEST_REJECTED,
    };
  }

  await assertReservationCalendarAccess();

  const errors = resolveDepositResolutionInputErrors(input);

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  let recorded: DepositResolutionRecorded;

  try {
    recorded = await recordDepositResolution(
      buildDepositResolutionCommand(input)
    );
  } catch (error) {
    return mapDepositResolutionError(error);
  }

  revalidateDepositResolutionPaths();
  return { ok: true, recorded };
};
