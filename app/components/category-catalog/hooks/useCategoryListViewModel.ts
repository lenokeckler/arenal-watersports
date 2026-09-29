"use client";

import { useRouter } from "next/navigation";
import { LENGTH } from "@/app/constants";
import type { Nullable } from "@/app/types";
import { CATEGORY_LIST_VIEW_STATE } from "../constants/CategoryListViewState.constants";
import { useCategoryCardActions } from "./useCategoryCardActions";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import type { CategoryListItem } from "../models/CategoryListItem.interface";
import type { CategoryListViewModel } from "../models/CategoryListViewModel.interface";
import type { CategoryListViewProps } from "../models/CategoryListViewProps.interface";
import type { CategoryListViewState } from "../models/CategoryListViewState.type";
import { resolveCategoryCardActionState } from "../utils/resolveCategoryCardActionState";

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
  category: CategoryListItem,
  pendingCategoryId: Nullable<string>,
  onMarkInactiveClick: (
    categoryId: string
  ) => () => Promise<void>
): CategoryCardViewModel => ({
  category,
  actionState: resolveCategoryCardActionState(
    category,
    false
  ),
  isActionLoading: category.id === pendingCategoryId,
  onCancelClick: ignoreCardAction,
  onConfirmDeleteClick: ignoreCardAction,
  onDeleteClick: ignoreCardAction,
  onMarkInactiveClick: onMarkInactiveClick(category.id),
});

export const useCategoryListViewModel = ({
  categories,
  fetchFailed,
}: CategoryListViewProps): CategoryListViewModel => {
  const router = useRouter();
  const { pendingCategoryId, onMarkInactiveClick } =
    useCategoryCardActions();

  const onRetry = (): void => {
    router.refresh();
  };

  return {
    cards: categories.map((category) =>
      buildCategoryCardViewModel(
        category,
        pendingCategoryId,
        onMarkInactiveClick
      )
    ),
    onRetry,
    viewState: resolveCategoryListViewState(
      fetchFailed,
      categories.length
    ),
  };
};
