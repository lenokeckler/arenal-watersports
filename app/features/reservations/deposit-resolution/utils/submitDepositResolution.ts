import { isBrowserOffline } from "@/app/utils/network/isBrowserOffline";
import { resolveDepositAction } from "../actions/resolveDepositAction";
import { DEPOSIT_RESOLUTION_FEEDBACK_COPY as FEEDBACK } from "../constants/DepositResolutionFeedbackCopy.constants";
import type { DepositResolutionInput } from "../models/DepositResolutionInput.interface";
import type { DepositResolutionSubmitOutcome } from "../models/DepositResolutionSubmitOutcome.interface";

const unsent = (
  formError: string
): DepositResolutionSubmitOutcome => ({
  mayBeRecorded: false,
  result: { errors: {}, formError, ok: false },
});

export const submitDepositResolution = async (
  input: DepositResolutionInput
): Promise<DepositResolutionSubmitOutcome> => {
  if (isBrowserOffline()) {
    return unsent(FEEDBACK.OFFLINE);
  }
  try {
    return {
      mayBeRecorded: false,
      result: await resolveDepositAction(input),
    };
  } catch {
    return {
      ...unsent(FEEDBACK.UNCONFIRMED),
      mayBeRecorded: true,
    };
  }
};
