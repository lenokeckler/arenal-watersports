import { isBrowserOffline } from "@/app/utils/network/isBrowserOffline";
import { recordReservationDepositAction } from "../actions/recordReservationDepositAction";
import { RESERVATION_DEPOSIT_FEEDBACK_COPY as FEEDBACK } from "../constants/ReservationDepositFeedbackCopy.constants";
import type { ReservationDepositInput } from "../models/ReservationDepositInput.interface";
import type { ReservationDepositSubmitOutcome } from "../models/ReservationDepositSubmitOutcome.interface";

const unsent = (
  formError: string
): ReservationDepositSubmitOutcome => ({
  mayBeRecorded: false,
  result: { errors: {}, formError, ok: false },
});

export const submitReservationDeposit = async (
  input: ReservationDepositInput
): Promise<ReservationDepositSubmitOutcome> => {
  if (isBrowserOffline()) {
    return unsent(FEEDBACK.OFFLINE);
  }
  try {
    return {
      mayBeRecorded: false,
      result: await recordReservationDepositAction(input),
    };
  } catch {
    return {
      ...unsent(FEEDBACK.UNCONFIRMED),
      mayBeRecorded: true,
    };
  }
};
