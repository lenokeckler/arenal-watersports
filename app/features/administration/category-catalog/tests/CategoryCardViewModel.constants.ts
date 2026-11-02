import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import { resolveCategorySubtitle } from "../utils/resolveCategorySubtitle";
import { DEFAULT_CATEGORY_LIST_ITEM } from "./CategoryListItem.constants";

const ignoreCardAction = (): void => undefined;

export const DEFAULT_CATEGORY_CARD_PANEL_ID =
  "category-card-panel-fake";

export const DEFAULT_CATEGORY_CARD_VIEW_MODEL: CategoryCardViewModel =
  {
    category: DEFAULT_CATEGORY_LIST_ITEM,
    isInactive: false,
    subtitle: resolveCategorySubtitle(
      DEFAULT_CATEGORY_LIST_ITEM
    ),
    isPanelOpen: true,
    panelId: DEFAULT_CATEGORY_CARD_PANEL_ID,
    onTogglePanelClick: ignoreCardAction,
    actionState: CATEGORY_CARD_ACTION_STATE.DELETE,
    isActionLoading: false,
    onCancelClick: ignoreCardAction,
    onConfirmDeleteClick: ignoreCardAction,
    onDeleteClick: ignoreCardAction,
    onMarkInactiveClick: ignoreCardAction,
    onReactivateClick: ignoreCardAction,
  };
