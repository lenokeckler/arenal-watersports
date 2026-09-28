import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

const ignoreCardAction = (): void => undefined;

export const DEFAULT_CATEGORY_CARD_VIEW_MODEL: CategoryCardViewModel =
  {
    category: DEFAULT_CATEGORY_LIST_ITEM,
    actionState: CATEGORY_CARD_ACTION_STATE.DELETE,
    isActionLoading: false,
    onCancelClick: ignoreCardAction,
    onConfirmDeleteClick: ignoreCardAction,
    onDeleteClick: ignoreCardAction,
    onMarkInactiveClick: ignoreCardAction,
  };
