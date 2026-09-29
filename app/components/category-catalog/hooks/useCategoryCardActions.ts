"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STATUS } from "@/app/constants";
import type { Nullable } from "@/app/types";
import { useToast } from "@/app/components/toast/utils/useToast";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalog.copy";
import type { CategoryCardActionsViewModel } from "../models/CategoryCardActionsViewModel.interface";
import { markCategoryInactiveAction } from "../services/markCategoryInactiveAction";

export const useCategoryCardActions =
  (): CategoryCardActionsViewModel => {
    const router = useRouter();
    const { showToast } = useToast();
    const [pendingCategoryId, setPendingCategoryId] =
      useState<Nullable<string>>(null);

    const onMarkInactiveClick =
      (categoryId: string) => async (): Promise<void> => {
        setPendingCategoryId(categoryId);

        try {
          await markCategoryInactiveAction(categoryId);
          showToast(
            STATUS.SUCCESS,
            CATEGORY_CATALOG_COPY.MARK_INACTIVE_SUCCESS_TOAST
          );
          router.refresh();
        } catch {
          showToast(
            STATUS.ERROR,
            CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR
          );
        } finally {
          setPendingCategoryId(null);
        }
      };

    return { pendingCategoryId, onMarkInactiveClick };
  };
