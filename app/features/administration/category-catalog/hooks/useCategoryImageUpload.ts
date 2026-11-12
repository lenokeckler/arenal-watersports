"use client";

import { STATUS } from "@/app/constants";
import { useToast } from "@/app/components/toast/utils/useToast";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import type { CategoryImageUploadViewModel } from "../models/CategoryImageUploadViewModel.interface";
import type { UseCategoryImageUploadOptions } from "../models/UseCategoryImageUploadOptions.interface";
import { saveCategoryImage } from "../utils/saveCategoryImage";
import { showCategoryImageOutcome } from "../utils/showCategoryImageOutcome";

export const useCategoryImageUpload = ({
  onSaved,
}: UseCategoryImageUploadOptions): CategoryImageUploadViewModel => {
  const { showToast } = useToast();
  const { isSubmitting, runLocked } = useSubmissionLock();

  const upload = async (
    categoryId: string,
    file: File
  ): Promise<boolean> => {
    let wasSaved = false;

    await runLocked(async () => {
      const outcome = await saveCategoryImage({
        categoryId,
        file,
      });
      showCategoryImageOutcome(showToast, outcome);
      wasSaved = outcome.status === STATUS.SUCCESS;
    });

    if (wasSaved) {
      onSaved();
    }

    return wasSaved;
  };

  return { isSubmitting, upload };
};
