import type { InventoryStockAdjustmentResult } from "./InventoryStockAdjustmentResult.interface";
import type { InventoryStockAdjustmentFormState } from "./InventoryStockAdjustmentFormState.interface";

export interface InventoryStockAdjustmentPanelProps {
  formState: InventoryStockAdjustmentFormState;
  isPending: boolean;
  result: InventoryStockAdjustmentResult | undefined;
  submit: () => void;
  updateField: (
    field: keyof InventoryStockAdjustmentFormState,
    value: string
  ) => void;
}
