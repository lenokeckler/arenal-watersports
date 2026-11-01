"use client";

import { useRouter } from "next/navigation";
import { PATHS } from "@/app/constants";
import { useToast } from "@/app/components/toast/utils/useToast";
import type { CategoryAlertFormSubmitOptions } from "../models/CategoryAlertFormSubmitOptions.interface";
import type { CategoryAlertFormSubmitViewModel } from "../models/CategoryAlertFormSubmitViewModel.interface";
import type { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";
import { reportCategoryAlertErrors } from "../utils/reportCategoryAlertErrors";
import { submitCategoryAlerts } from "../utils/submitCategoryAlerts";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";

export const useCategoryAlertFormSubmit = ({
  categoryId,
  values,
  onValidationErrors,
}: CategoryAlertFormSubmitOptions): CategoryAlertFormSubmitViewModel => {
  const router = useRouter();
  const { showToast } = useToast();
  const { isSubmitting, runLocked } = useSubmissionLock();

  const onSubmit = async (
    event: FormSubmitEvent
  ): Promise<void> => {
    event.preventDefault();

    if (
      reportCategoryAlertErrors(values, onValidationErrors)
    ) {
      return;
    }

    await runLocked(() =>
      submitCategoryAlerts({
        categoryId,
        values,
        showToast,
        onSaved: () =>
          router.push(PATHS.ADMINISTRATION.CATEGORIES),
      })
    );
  };

  return { isSubmitting, onSubmit };
};
