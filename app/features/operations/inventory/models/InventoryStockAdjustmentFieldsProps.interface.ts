import type { InventoryStockAdjustmentResult } from "./InventoryStockAdjustmentResult.interface";
import type { InventoryStockAdjustmentFormState } from "./InventoryStockAdjustmentFormState.interface";

export interface InventoryStockAdjustmentFieldsProps {
  formState: InventoryStockAdjustmentFormState;
  result: InventoryStockAdjustmentResult | undefined;
  updateField: (
    field: keyof InventoryStockAdjustmentFormState,
    value: string
  ) => void;
}
