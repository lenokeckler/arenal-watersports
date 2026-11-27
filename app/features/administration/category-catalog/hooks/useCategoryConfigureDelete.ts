"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/toast/utils/useToast";
import { PATHS } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";
import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";
import type { CategoryConfigureDeleteProps } from "../models/CategoryConfigureDeleteProps.interface";
import type { CategoryMutationResult } from "../models/CategoryMutationResult.interface";
import { deleteCategoryAction } from "../services/deleteCategoryAction";
import { markCategoryInactiveAction } from "../services/markCategoryInactiveAction";
import { runCategoryCardMutation } from "../utils/runCategoryCardMutation";

export const useCategoryConfigureDelete = ({
  id,
  name,
  status,
  hasRecords,
}: CategoryConfiguration): NullableRef<CategoryConfigureDeleteProps> => {
  const router = useRouter();
  const { showToast } = useToast();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const runMutation = (
    mutate: (
      categoryId: string
    ) => Promise<CategoryMutationResult>,
    successMessage: string,
    onSuccess: () => void
  ): Promise<void> =>
    runCategoryCardMutation({
      categoryId: id,
      mutate,
      successMessage,
      showToast,
      onSuccess,
      setPendingCategoryId: (pendingCategoryId) =>
        setIsPending(pendingCategoryId !== null),
    });

  const onConfirm = (): Promise<void> =>
    runMutation(
      deleteCategoryAction,
      CATEGORY_CATALOG_COPY.DELETE_SUCCESS_TOAST,
      () => router.push(PATHS.ADMINISTRATION.CATEGORIES)
    );

  const onDeactivate = (): Promise<void> =>
    runMutation(
      markCategoryInactiveAction,
      CATEGORY_CATALOG_COPY.MARK_INACTIVE_SUCCESS_TOAST,
      () => {
        setIsSheetOpen(false);
        router.refresh();
      }
    );

  const onClose = (): void => {
    if (!isPending) {
      setIsSheetOpen(false);
    }
  };

  if (hasRecords) {
    return null;
  }

  return {
    name,
    isSheetOpen,
    isPending,
    canDeactivate: status === CATEGORY_STATUS.ACTIVE,
    onOpen: () => setIsSheetOpen(true),
    onClose,
    onConfirm,
    onDeactivate,
  };
};
