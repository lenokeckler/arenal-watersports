import { isBrowserOffline } from "@/app/utils/network/isBrowserOffline";
import { recordReservationRefundAction } from "../actions/recordReservationRefundAction";
import { RESERVATION_REFUND_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationRefundFeedbackCopy.constants";
import type { ReservationRefundInput } from "../models/ReservationRefundInput.interface";
import type { ReservationRefundSubmitOutcome } from "../models/ReservationRefundSubmitOutcome.interface";

const unsent = (
  formError: string
): ReservationRefundSubmitOutcome => ({
  mayBeRecorded: false,
  result: { errors: {}, formError, ok: false },
});

export const submitReservationRefund = async (
  input: ReservationRefundInput
): Promise<ReservationRefundSubmitOutcome> => {
  if (isBrowserOffline()) {
    return unsent(FEEDBACK.OFFLINE);
  }
  try {
    return {
      mayBeRecorded: false,
      result: await recordReservationRefundAction(input),
    };
  } catch {
    return {
      ...unsent(FEEDBACK.UNCONFIRMED),
      mayBeRecorded: true,
    };
  }
};
