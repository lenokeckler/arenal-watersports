"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STATUS } from "@/app/constants";
import type { Nullable } from "@/app/types";
import { useToast } from "@/app/components/toast/utils/useToast";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalog.copy";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryCardActionsViewModel } from "../models/CategoryCardActionsViewModel.interface";
import { deleteCategoryAction } from "../services/deleteCategoryAction";
import { markCategoryInactiveAction } from "../services/markCategoryInactiveAction";

export const useCategoryCardActions =
  (): CategoryCardActionsViewModel => {
    const router = useRouter();
    const { showToast } = useToast();
    const [pendingCategoryId, setPendingCategoryId] =
      useState<Nullable<string>>(null);
    const [confirmingCategoryId, setConfirmingCategoryId] =
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

    const onDeleteClick =
      (categoryId: string) => (): void => {
        setConfirmingCategoryId(categoryId);
      };

    const onCancelClick =
      (categoryId: string) => (): void => {
        setConfirmingCategoryId(
          (currentConfirmingCategoryId) =>
            currentConfirmingCategoryId === categoryId
              ? null
              : currentConfirmingCategoryId
        );
      };

    const onConfirmDeleteClick =
      (categoryId: string) => async (): Promise<void> => {
        setPendingCategoryId(categoryId);

        try {
          const result =
            await deleteCategoryAction(categoryId);

          if (
            result.status === CATEGORY_MUTATION_STATUS.ERROR
          ) {
            showToast(
              STATUS.ERROR,
              result.message ??
                CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR
            );
            return;
          }

          showToast(
            STATUS.SUCCESS,
            CATEGORY_CATALOG_COPY.DELETE_SUCCESS_TOAST
          );
          router.refresh();
        } catch {
          showToast(
            STATUS.ERROR,
            CATEGORY_CATALOG_COPY.GENERIC_MUTATION_ERROR
          );
        } finally {
          setPendingCategoryId(null);
          setConfirmingCategoryId(null);
        }
      };

    return {
      confirmingCategoryId,
      pendingCategoryId,
      onCancelClick,
      onConfirmDeleteClick,
      onDeleteClick,
      onMarkInactiveClick,
    };
  };
