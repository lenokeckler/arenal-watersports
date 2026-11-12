"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/toast/utils/useToast";
import { PATHS } from "@/app/constants";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import type { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";
import type { ExtraFormSubmitOptions } from "../models/ExtraFormSubmitOptions.type";
import type { ExtraFormSubmitViewModel } from "../models/ExtraFormSubmitViewModel.interface";
import { hasExtraFormErrors } from "../utils/hasExtraFormErrors";
import { submitExtraForm } from "../utils/submitExtraForm";
import { validateExtraInput } from "../utils/validateExtraInput";

export const useExtraFormSubmit = ({
  showErrors,
  ...saveOptions
}: ExtraFormSubmitOptions): ExtraFormSubmitViewModel => {
  const router = useRouter();
  const { showToast } = useToast();
  const { isSubmitting, runLocked } = useSubmissionLock();

  const onSaved = (): void => {
    router.push(PATHS.ADMINISTRATION.EXTRAS);
    router.refresh();
  };

  const onSubmit = async (
    event: FormSubmitEvent
  ): Promise<void> => {
    event.preventDefault();

    const errors = validateExtraInput(saveOptions.values);
    if (hasExtraFormErrors(errors)) {
      showErrors(errors);
      return;
    }

    await runLocked(() =>
      submitExtraForm({
        ...saveOptions,
        showErrors,
        showToast,
        onSaved,
      })
    );
  };

  return { isSubmitting, onSubmit };
};
