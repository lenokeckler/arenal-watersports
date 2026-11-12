"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Nullable } from "@/app/types";
import { useToast } from "@/app/components/toast/utils/useToast";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryCardDeleteActionsViewModel } from "../models/CategoryCardDeleteActionsViewModel.interface";
import { deleteCategoryAction } from "../services/deleteCategoryAction";
import { resolveConfirmingCategoryAfterCancel } from "../utils/resolveConfirmingCategoryAfterCancel";
import { runCategoryCardMutation } from "../utils/runCategoryCardMutation";

export const useCategoryCardDeleteActions = (
  setPendingCategoryId: (
    categoryId: Nullable<string>
  ) => void
): CategoryCardDeleteActionsViewModel => {
  const router = useRouter();
  const { showToast } = useToast();
  const [confirmingCategoryId, setConfirmingCategoryId] =
    useState<Nullable<string>>(null);

  const onDeleteClick = (categoryId: string) => (): void =>
    setConfirmingCategoryId(categoryId);

  const onCancelClick =
    (categoryId: string) => (): void => {
      setConfirmingCategoryId((current) =>
        resolveConfirmingCategoryAfterCancel(
          current,
          categoryId
        )
      );
    };

  const onConfirmDeleteClick =
    (categoryId: string) => (): Promise<void> =>
      runCategoryCardMutation({
        categoryId,
        mutate: deleteCategoryAction,
        successMessage:
          CATEGORY_CATALOG_COPY.DELETE_SUCCESS_TOAST,
        showToast,
        onSuccess: () => router.refresh(),
        setPendingCategoryId,
        onSettled: () => setConfirmingCategoryId(null),
      });

  return {
    confirmingCategoryId,
    onCancelClick,
    onConfirmDeleteClick,
    onDeleteClick,
  };
};
