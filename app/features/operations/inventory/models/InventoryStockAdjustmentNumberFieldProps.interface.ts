import type { InventoryStockAdjustmentFormState } from "./InventoryStockAdjustmentFormState.interface";

export interface InventoryStockAdjustmentNumberFieldProps {
  field: keyof Pick<
    InventoryStockAdjustmentFormState,
    "available" | "damaged" | "inRepair"
  >;
  id: string;
  label: string;
  updateField: (
    field: keyof InventoryStockAdjustmentFormState,
    value: string
  ) => void;
  value: string;
}
