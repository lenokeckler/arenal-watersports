import { recordReservationChargeAction } from "../actions/recordReservationChargeAction";
import { RESERVATION_CHARGE_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationChargeFeedbackCopy.constants";
import type { ReservationChargeActionResult } from "../models/ReservationChargeActionResult.type";
import type { ReservationChargeInput } from "../models/ReservationChargeInput.interface";
import { isBrowserOffline } from "./isBrowserOffline";

const failure = (
  formError: string
): ReservationChargeActionResult => ({
  errors: {},
  formError,
  ok: false,
});

export const submitReservationCharge = async (
  input: ReservationChargeInput
): Promise<ReservationChargeActionResult> => {
  if (isBrowserOffline()) {
    return failure(FEEDBACK.OFFLINE);
  }
  try {
    return await recordReservationChargeAction(input);
  } catch {
    return failure(FEEDBACK.UNCONFIRMED);
  }
};
