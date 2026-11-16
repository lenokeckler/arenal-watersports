import { isBrowserOffline } from "@/app/utils/network/isBrowserOffline";
import { recordReservationRefundAction } from "../actions/recordReservationRefundAction";
import { RESERVATION_REFUND_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationRefundFeedbackCopy.constants";
import type { ReservationRefundActionResult } from "../models/ReservationRefundActionResult.type";
import type { ReservationRefundInput } from "../models/ReservationRefundInput.interface";

const failure = (
  formError: string
): ReservationRefundActionResult => ({
  errors: {},
  formError,
  ok: false,
});

export const submitReservationRefund = async (
  input: ReservationRefundInput
): Promise<ReservationRefundActionResult> => {
  if (isBrowserOffline()) {
    return failure(FEEDBACK.OFFLINE);
  }
  try {
    return await recordReservationRefundAction(input);
  } catch {
    return failure(FEEDBACK.UNCONFIRMED);
  }
};
