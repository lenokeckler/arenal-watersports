import { isBrowserOffline } from "@/app/utils/network/isBrowserOffline";
import { recordReservationExtraTimeAction } from "../actions/recordReservationExtraTimeAction";
import { RESERVATION_EXTRA_TIME_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationExtraTimeFeedbackCopy.constants";
import type { ReservationExtraTimeActionResult } from "../models/ReservationExtraTimeActionResult.type";
import type { ReservationExtraTimeInput } from "../models/ReservationExtraTimeInput.interface";

const failure = (
  formError: string
): ReservationExtraTimeActionResult => ({
  errors: {},
  formError,
  ok: false,
});

export const submitReservationExtraTime = async (
  input: ReservationExtraTimeInput
): Promise<ReservationExtraTimeActionResult> => {
  if (isBrowserOffline()) {
    return failure(FEEDBACK.OFFLINE);
  }
  try {
    return await recordReservationExtraTimeAction(input);
  } catch {
    return failure(FEEDBACK.UNCONFIRMED);
  }
};
