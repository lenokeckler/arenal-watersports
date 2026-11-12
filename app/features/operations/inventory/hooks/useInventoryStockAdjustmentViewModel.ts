"use client";

import type { InventoryCategorySummary } from "../models/InventoryCategorySummary.interface";
import type { InventoryStockAdjustmentFormState } from "../models/InventoryStockAdjustmentFormState.interface";
import { useInventoryStockAdjustmentFormState } from "./useInventoryStockAdjustmentFormState";
import { useInventoryStockAdjustmentSubmission } from "./useInventoryStockAdjustmentSubmission";

export const useInventoryStockAdjustmentViewModel = (
  category: InventoryCategorySummary
) => {
  const { formState, updateField: updateFormField } =
    useInventoryStockAdjustmentFormState(category);
  const submission = useInventoryStockAdjustmentSubmission({
    categoryId: category.id,
    formState,
  });

  const updateField = (
    field: keyof InventoryStockAdjustmentFormState,
    value: string
  ) => {
    updateFormField(field, value);
    submission.clearResult();
  };

  return { ...submission, formState, updateField };
};
