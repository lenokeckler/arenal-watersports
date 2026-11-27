"use client";

import { useRouter } from "next/navigation";
import { LENGTH } from "@/app/constants";
import { CATEGORY_LIST_VIEW_STATE } from "../constants/CategoryListViewState.constants";
import type { CategoryCardViewModel } from "../models/CategoryCardViewModel.interface";
import type { CategoryListItem } from "../models/CategoryListItem.interface";
import type { CategoryListViewModel } from "../models/CategoryListViewModel.interface";
import type { CategoryListViewModelProps } from "../models/CategoryListViewModelProps.interface";
import type { CategoryListViewState } from "../models/CategoryListViewState.type";
import { isCategoryInactive } from "../utils/isCategoryInactive";
import { resolveCategorySubtitle } from "../utils/resolveCategorySubtitle";

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
  subtitle: resolveCategorySubtitle(category),
});

export const useCategoryListViewModel = ({
  categories,
  fetchFailed,
}: CategoryListViewModelProps): CategoryListViewModel => {
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
