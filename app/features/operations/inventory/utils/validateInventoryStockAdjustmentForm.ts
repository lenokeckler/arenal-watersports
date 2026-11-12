import { STRING } from "@/app/constants";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import {
  INVENTORY_STOCK_ADJUSTMENT_COPY,
  INVENTORY_STOCK_ADJUSTMENT_REASON,
} from "../constants/InventoryStockAdjustment.constants";
import {
  INVENTORY_STOCK_ADJUSTMENT_FIELD,
  type InventoryStockAdjustmentFormState,
} from "../models/InventoryStockAdjustmentFormState.interface";
import type { InventoryStockAdjustmentFormValidation } from "../models/InventoryStockAdjustmentFormValidation.type";

export const validateInventoryStockAdjustmentForm = (
  formState: InventoryStockAdjustmentFormState
): InventoryStockAdjustmentFormValidation => {
  if (
    formState[INVENTORY_STOCK_ADJUSTMENT_FIELD.REASON] ===
    STRING.Empty
  ) {
    return {
      error: INVENTORY_COPY.ADJUSTMENT_REASON_REQUIRED,
      isValid: false,
    };
  }

  if (
    formState[
      INVENTORY_STOCK_ADJUSTMENT_FIELD.AVAILABLE
    ] === STRING.Empty ||
    formState[INVENTORY_STOCK_ADJUSTMENT_FIELD.DAMAGED] ===
      STRING.Empty ||
    formState[
      INVENTORY_STOCK_ADJUSTMENT_FIELD.IN_REPAIR
    ] === STRING.Empty
  ) {
    return {
      error:
        INVENTORY_STOCK_ADJUSTMENT_COPY.QUANTITY_INVALID_ERROR,
      isValid: false,
    };
  }

  const reason = Object.values(
    INVENTORY_STOCK_ADJUSTMENT_REASON
  ).find(
    (allowedReason) =>
      allowedReason ===
      formState[INVENTORY_STOCK_ADJUSTMENT_FIELD.REASON]
  );

  if (!reason) {
    return {
      error:
        INVENTORY_STOCK_ADJUSTMENT_COPY.REASON_INVALID_ERROR,
      isValid: false,
    };
  }

  return { isValid: true, reason };
};
