import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

const ignoreCardAction = (): void => undefined;

export const DEFAULT_CATEGORY_CARD_VIEW_MODEL: CategoryCardViewModel =
  {
    category: DEFAULT_CATEGORY_LIST_ITEM,
    isInactive: false,
    trackingModeLabel:
      CATEGORY_CATALOG_COPY.TRACKING_MODE_MICRO_LABEL_BY_UNIT,
    actionState: CATEGORY_CARD_ACTION_STATE.DELETE,
    isActionLoading: false,
    onCancelClick: ignoreCardAction,
    onConfirmDeleteClick: ignoreCardAction,
    onDeleteClick: ignoreCardAction,
    onMarkInactiveClick: ignoreCardAction,
    onReactivateClick: ignoreCardAction,
  };
