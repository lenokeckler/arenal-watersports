"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/toast/utils/useToast";
import { PATHS } from "@/app/constants";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import type { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";
import type { ExtraFormSubmitOptions } from "../models/ExtraFormSubmitOptions.type";
import type { ExtraFormSubmitViewModel } from "../models/ExtraFormSubmitViewModel.interface";
import { submitExtraForm } from "../utils/submitExtraForm";
import { validateExtraName } from "../utils/validateExtraName";

export const useExtraFormSubmit = ({
  setNameError,
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

    const nameError = validateExtraName(
      saveOptions.values.name
    );
    if (nameError) {
      setNameError(nameError);
      return;
    }

    await runLocked(() =>
      submitExtraForm({
        ...saveOptions,
        setNameError,
        showToast,
        onSaved,
      })
    );
  };

  return { isSubmitting, onSubmit };
};
