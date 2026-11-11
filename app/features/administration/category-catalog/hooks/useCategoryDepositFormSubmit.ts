"use client";

import { useRouter } from "next/navigation";
import { PATHS } from "@/app/constants";
import { useToast } from "@/app/components/toast/utils/useToast";
import type { CategoryDepositFormSubmitOptions } from "../models/CategoryDepositFormSubmitOptions.interface";
import type { CategoryDepositFormSubmitViewModel } from "../models/CategoryDepositFormSubmitViewModel.interface";
import type { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";
import { reportCategoryDepositErrors } from "../utils/reportCategoryDepositErrors";
import { submitCategoryDeposit } from "../utils/submitCategoryDeposit";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";

export const useCategoryDepositFormSubmit = ({
  categoryId,
  values,
  onValidationErrors,
}: CategoryDepositFormSubmitOptions): CategoryDepositFormSubmitViewModel => {
  const router = useRouter();
  const { showToast } = useToast();
  const { isSubmitting, runLocked } = useSubmissionLock();

  const onSubmit = async (
    event: FormSubmitEvent
  ): Promise<void> => {
    event.preventDefault();

    if (
      reportCategoryDepositErrors(
        values,
        onValidationErrors
      )
    ) {
      return;
    }

    await runLocked(() =>
      submitCategoryDeposit({
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
