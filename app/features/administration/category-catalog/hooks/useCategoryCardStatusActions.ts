"use client";

import { useRouter } from "next/navigation";
import type { Nullable } from "@/app/types";
import { useToast } from "@/app/components/toast/utils/useToast";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryCardStatusActionsViewModel } from "../models/CategoryCardStatusActionsViewModel.interface";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import { markCategoryInactiveAction } from "../services/markCategoryInactiveAction";
import { reactivateCategoryAction } from "../services/reactivateCategoryAction";
import { runCategoryCardMutation } from "../utils/runCategoryCardMutation";

export const useCategoryCardStatusActions = (
  setPendingCategoryId: (
    categoryId: Nullable<string>
  ) => void
): CategoryCardStatusActionsViewModel => {
  const router = useRouter();
  const { showToast } = useToast();

  const changeStatus =
    (
      mutate: (
        categoryId: string
      ) => Promise<CategoryMutationResult>,
      successMessage: string
    ) =>
    (categoryId: string) =>
    (): Promise<void> =>
      runCategoryCardMutation({
        categoryId,
        mutate,
        successMessage,
        showToast,
        onSuccess: () => router.refresh(),
        setPendingCategoryId,
      });

  return {
    onMarkInactiveClick: changeStatus(
      markCategoryInactiveAction,
      CATEGORY_CATALOG_COPY.MARK_INACTIVE_SUCCESS_TOAST
    ),
    onReactivateClick: changeStatus(
      reactivateCategoryAction,
      CATEGORY_CATALOG_COPY.REACTIVATE_SUCCESS_TOAST
    ),
  };
};
