import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import type { CategoryCardActionState } from "../models/CategoryCardActionState.type";
import type { CategoryListItem } from "../models/CategoryListItem.interface";

export const resolveCategoryCardActionState = (
  category: CategoryListItem,
  isConfirmingThisCard: boolean
): CategoryCardActionState => {
  if (category.status === CATEGORY_STATUS.INACTIVE) {
    return CATEGORY_CARD_ACTION_STATE.REACTIVATE;
  }

  if (category.hasRecords) {
    return CATEGORY_CARD_ACTION_STATE.MARK_INACTIVE;
  }

  if (isConfirmingThisCard) {
    return CATEGORY_CARD_ACTION_STATE.CONFIRM_DELETE;
  }

  return CATEGORY_CARD_ACTION_STATE.DELETE;
};
