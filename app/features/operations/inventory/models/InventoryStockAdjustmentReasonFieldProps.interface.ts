import type { InventoryStockAdjustmentFormState } from "./InventoryStockAdjustmentFormState.interface";

export interface InventoryStockAdjustmentReasonFieldProps {
  reason: string;
  updateField: (
    field: keyof InventoryStockAdjustmentFormState,
    value: string
  ) => void;
  validationError: string | undefined;
}
