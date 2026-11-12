import { EXTRA_CARD_ACTION_STATE } from "../constants/ExtraCardActionState.constants";
import { EXTRA_STATUS } from "../constants/ExtraStatus.constants";
import type { Extra } from "../models/Extra.interface";
import type { ExtraCardActionState } from "../models/ExtraCardActionState.type";

export const resolveExtraCardActionState = (
  extra: Extra,
  isConfirmingThisCard: boolean
): ExtraCardActionState => {
  if (extra.status === EXTRA_STATUS.INACTIVE) {
    return EXTRA_CARD_ACTION_STATE.REACTIVATE;
  }

  if (isConfirmingThisCard) {
    return EXTRA_CARD_ACTION_STATE.CONFIRM_REMOVAL;
  }

  return EXTRA_CARD_ACTION_STATE.REMOVE;
};
