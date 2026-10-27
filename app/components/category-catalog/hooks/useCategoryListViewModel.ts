"use client";

import { useRouter } from "next/navigation";
import { LENGTH } from "@/app/constants";
import { CATEGORY_CARD_ACTION_STATE } from "../constants/CategoryCardActionState.constants";
import { CATEGORY_LIST_VIEW_STATE } from "../constants/CategoryListViewState.constants";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import type { CategoryListItem } from "../models/CategoryListItem.interface";
import type { CategoryListViewModel } from "../models/CategoryListViewModel.interface";
import type { CategoryListViewProps } from "../models/CategoryListViewProps.interface";
import type { CategoryListViewState } from "../models/CategoryListViewState.type";
import { isCategoryInactive } from "../utils/isCategoryInactive";
import { resolveCategoryTrackingModeLabel } from "../utils/resolveCategoryTrackingModeLabel";

const ignoreCardAction = (): void => undefined;

const resolveCategoryListViewState = (
  fetchFailed: boolean,
  categoryCount: number
): CategoryListViewState => {
  if (fetchFailed) {
    return CATEGORY_LIST_VIEW_STATE.ERROR;
  }

  if (categoryCount === LENGTH.ZERO) {
    return CATEGORY_LIST_VIEW_STATE.EMPTY;
  }

  return CATEGORY_LIST_VIEW_STATE.READY;
};

const buildCategoryCardViewModel = (
  category: CategoryListItem
): CategoryCardViewModel => ({
  category,
  isInactive: isCategoryInactive(category),
  trackingModeLabel:
    resolveCategoryTrackingModeLabel(category),
  actionState: CATEGORY_CARD_ACTION_STATE.NONE,
  isActionLoading: false,
  onCancelClick: ignoreCardAction,
  onConfirmDeleteClick: ignoreCardAction,
  onDeleteClick: ignoreCardAction,
  onMarkInactiveClick: ignoreCardAction,
});

export const useCategoryListViewModel = ({
  categories,
  fetchFailed,
}: CategoryListViewProps): CategoryListViewModel => {
  const router = useRouter();

  const onRetry = (): void => {
    router.refresh();
  };

  return {
    cards: categories.map(buildCategoryCardViewModel),
    onRetry,
    viewState: resolveCategoryListViewState(
      fetchFailed,
      categories.length
    ),
  };
};
