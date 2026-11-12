"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { INVENTORY_STOCK_ADJUSTMENT_STATUS } from "../constants/InventoryStockAdjustment.constants";
import { INVENTORY_STOCK_ADJUSTMENT_COPY } from "../constants/InventoryStockAdjustment.constants";
import type { InventoryStockAdjustmentInput } from "../models/InventoryStockAdjustmentInput.interface";
import type { InventoryStockAdjustmentResult } from "../models/InventoryStockAdjustmentResult.interface";
import type { InventoryStockAdjustmentSubmissionProps } from "../models/InventoryStockAdjustmentSubmissionProps.interface";
import { INVENTORY_STOCK_ADJUSTMENT_FIELD } from "../models/InventoryStockAdjustmentFormState.interface";
import { submitInventoryStockAdjustment } from "../actions/submitInventoryStockAdjustment";
import { validateInventoryStockAdjustmentForm } from "../utils/validateInventoryStockAdjustmentForm";

const buildAdjustmentInput = (
  categoryId: string,
  formState: InventoryStockAdjustmentSubmissionProps["formState"],
  reason: InventoryStockAdjustmentInput["reason"]
): InventoryStockAdjustmentInput => ({
  available: Number(
    formState[INVENTORY_STOCK_ADJUSTMENT_FIELD.AVAILABLE]
  ),
  categoryId,
  damaged: Number(
    formState[INVENTORY_STOCK_ADJUSTMENT_FIELD.DAMAGED]
  ),
  expiryDate: null,
  inRepair: Number(
    formState[INVENTORY_STOCK_ADJUSTMENT_FIELD.IN_REPAIR]
  ),
  reason,
});

const persistAdjustment = async (
  input: InventoryStockAdjustmentInput,
  setResult: React.Dispatch<
    React.SetStateAction<
      InventoryStockAdjustmentResult | undefined
    >
  >,
  refresh: () => void
): Promise<void> => {
  try {
    const result =
      await submitInventoryStockAdjustment(input);
    setResult(result);

    if (
      result.status ===
      INVENTORY_STOCK_ADJUSTMENT_STATUS.SUCCESS
    ) {
      refresh();
    }
  } catch {
    setResult({
      message:
        INVENTORY_STOCK_ADJUSTMENT_COPY.SAVE_FAILED_ERROR,
      status: INVENTORY_STOCK_ADJUSTMENT_STATUS.ERROR,
    });
  }
};

export const useInventoryStockAdjustmentSubmission = ({
  categoryId,
  formState,
}: InventoryStockAdjustmentSubmissionProps) => {
  const router = useRouter();
  const [result, setResult] =
    useState<InventoryStockAdjustmentResult>();
  const [isPending, startTransition] = useTransition();

  const clearResult = () => setResult(undefined);

  const submit = () => {
    if (isPending) {
      return;
    }

    const validation =
      validateInventoryStockAdjustmentForm(formState);
    if (!validation.isValid) {
      setResult({
        message: validation.error,
        status: INVENTORY_STOCK_ADJUSTMENT_STATUS.ERROR,
      });
      return;
    }

    const input = buildAdjustmentInput(
      categoryId,
      formState,
      validation.reason
    );
    setResult(undefined);
    startTransition(async () => {
      await persistAdjustment(input, setResult, () =>
        router.refresh()
      );
    });
  };

  return { clearResult, isPending, result, submit };
};
