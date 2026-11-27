"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/toast/utils/useToast";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import type { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";
import type { ExtraCompatibilityUnitsSubmitOptions } from "../models/ExtraCompatibilityUnitsSubmitOptions.interface";
import type { ExtraCompatibilityUnitsSubmitViewModel } from "../models/ExtraCompatibilityUnitsSubmitViewModel.interface";
import { resolveExtraCompatibilityPath } from "../utils/resolveExtraCompatibilityPath";
import { submitExtraCompatibility } from "../utils/submitExtraCompatibility";

export const useExtraCompatibilityUnitsSubmit = ({
  hasChanges,
  input,
}: ExtraCompatibilityUnitsSubmitOptions): ExtraCompatibilityUnitsSubmitViewModel => {
  const router = useRouter();
  const { showToast } = useToast();
  const { isSubmitting, runLocked } = useSubmissionLock();

  const onSaved = (): void => {
    router.push(
      resolveExtraCompatibilityPath(input.extraId)
    );
    router.refresh();
  };

  const onSubmit = async (
    event: FormSubmitEvent
  ): Promise<void> => {
    event.preventDefault();

    if (!hasChanges) {
      return;
    }

    await runLocked(() =>
      submitExtraCompatibility({
        input,
        onSaved,
        showToast,
      })
    );
  };

  return { isSubmitting, onSubmit };
};
