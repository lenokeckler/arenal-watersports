"use client";

import { useRouter } from "next/navigation";
import { LENGTH } from "@/app/constants";
import { CATEGORY_LIST_VIEW_STATE } from "../constants/CategoryListViewState.constants";
import { useCategoryCardActions } from "./useCategoryCardActions";
import type { CategoryCardActionsViewModel } from "../models/CategoryCardActionsViewModel.interface";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import type { CategoryListItem } from "../models/CategoryListItem.interface";
import type { CategoryListViewModel } from "../models/CategoryListViewModel.interface";
import type { CategoryListViewProps } from "../models/CategoryListViewProps.interface";
import type { CategoryListViewState } from "../models/CategoryListViewState.type";
import { resolveCategoryCardActionState } from "../utils/resolveCategoryCardActionState";

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
  category: CategoryListItem,
  cardActions: CategoryCardActionsViewModel
): CategoryCardViewModel => ({
  category,
  actionState: resolveCategoryCardActionState(
    category,
    category.id === cardActions.confirmingCategoryId
  ),
  isActionLoading:
    category.id === cardActions.pendingCategoryId,
  onCancelClick: cardActions.onCancelClick(category.id),
  onConfirmDeleteClick: cardActions.onConfirmDeleteClick(
    category.id
  ),
  onDeleteClick: cardActions.onDeleteClick(category.id),
  onMarkInactiveClick: cardActions.onMarkInactiveClick(
    category.id
  ),
});

export const useCategoryListViewModel = ({
  categories,
  fetchFailed,
}: CategoryListViewProps): CategoryListViewModel => {
  const router = useRouter();
  const cardActions = useCategoryCardActions();

  const onRetry = (): void => {
    router.refresh();
  };

  return {
    cards: categories.map((category) =>
      buildCategoryCardViewModel(category, cardActions)
    ),
    onRetry,
    viewState: resolveCategoryListViewState(
      fetchFailed,
      categories.length
    ),
  };
};
