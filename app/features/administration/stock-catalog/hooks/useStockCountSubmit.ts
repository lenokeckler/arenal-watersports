"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/app/components/toast/utils/useToast";
import { useSubmissionLock } from "@/app/utils/form-submit/hooks/useSubmissionLock";
import type { FormSubmitEvent } from "@/app/utils/form-submit/models/FormSubmitEvent.type";
import type { StockCountSubmitOptions } from "../models/StockCountSubmitOptions.interface";
import type { StockCountSubmitViewModel } from "../models/StockCountSubmitViewModel.interface";
import { mapStockFormValuesToInput } from "../utils/mapStockFormValuesToInput";
import { submitStockCount } from "../utils/submitStockCount";
import { validateStockFormValues } from "../utils/validateStockFormValues";

export const useStockCountSubmit = ({
  categoryId,
  context,
  onSaved,
  onValidationErrors,
  values,
}: StockCountSubmitOptions): StockCountSubmitViewModel => {
  const router = useRouter();
  const { showToast } = useToast();
  const { isSubmitting, runLocked } = useSubmissionLock();

  const handleSaved = (): void => {
    onSaved();
    router.refresh();
  };

  const onSubmit = async (
    event: FormSubmitEvent
  ): Promise<void> => {
    event.preventDefault();

    const errors = validateStockFormValues(
      values,
      categoryId,
      context
    );
    onValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    await runLocked(() =>
      submitStockCount({
        input: mapStockFormValuesToInput(
          values,
          categoryId
        ),
        onSaved: handleSaved,
        showToast,
      })
    );
  };

  return { isSubmitting, onSubmit };
};
