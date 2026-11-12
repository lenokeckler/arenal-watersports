"use client";

import { useState } from "react";
import { STRING } from "@/app/constants";
import type { InventoryCategorySummary } from "../models/InventoryCategorySummary.interface";
import {
  INVENTORY_STOCK_ADJUSTMENT_FIELD,
  type InventoryStockAdjustmentFormState,
} from "../models/InventoryStockAdjustmentFormState.interface";

const createInitialState = (
  category: InventoryCategorySummary
): InventoryStockAdjustmentFormState => ({
  [INVENTORY_STOCK_ADJUSTMENT_FIELD.AVAILABLE]: String(
    category.available
  ),
  [INVENTORY_STOCK_ADJUSTMENT_FIELD.DAMAGED]: String(
    category.damaged
  ),
  [INVENTORY_STOCK_ADJUSTMENT_FIELD.IN_REPAIR]: String(
    category.inRepair
  ),
  [INVENTORY_STOCK_ADJUSTMENT_FIELD.REASON]: STRING.Empty,
});

export const useInventoryStockAdjustmentFormState = (
  category: InventoryCategorySummary
) => {
  const [formState, setFormState] = useState(() =>
    createInitialState(category)
  );

  const updateField = (
    field: keyof InventoryStockAdjustmentFormState,
    value: string
  ) =>
    setFormState((currentState) => ({
      ...currentState,
      [field]: value,
    }));

  return { formState, updateField };
};
