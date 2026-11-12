"use client";

import { useState } from "react";
import { STATUS } from "@/app/constants";
import { useToast } from "@/app/components/toast/utils/useToast";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import type { CategoryImageRemovalViewModel } from "../models/CategoryImageRemovalViewModel.interface";
import type { UseCategoryImageRemovalOptions } from "../models/UseCategoryImageRemovalOptions.interface";
import { removeCategoryImage } from "../utils/removeCategoryImage";
import { showCategoryImageOutcome } from "../utils/showCategoryImageOutcome";

export const useCategoryImageRemoval = ({
  categoryId,
  onRemoved,
}: UseCategoryImageRemovalOptions): CategoryImageRemovalViewModel => {
  const { showToast } = useToast();
  const { isSubmitting, runLocked } = useSubmissionLock();
  const [isConfirmingRemoval, setIsConfirmingRemoval] =
    useState(false);

  const requestRemoval = (): void => {
    setIsConfirmingRemoval(true);
  };

  const cancelRemoval = (): void => {
    setIsConfirmingRemoval(false);
  };

  const confirmRemoval = (): Promise<void> =>
    runLocked(async () => {
      const outcome = await removeCategoryImage(categoryId);
      showCategoryImageOutcome(showToast, outcome);
      setIsConfirmingRemoval(false);

      if (outcome.status === STATUS.SUCCESS) {
        onRemoved();
      }
    });

  return {
    cancelRemoval,
    confirmRemoval,
    isConfirmingRemoval,
    isRemoving: isSubmitting,
    requestRemoval,
  };
};
