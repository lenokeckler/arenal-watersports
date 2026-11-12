import type { InventoryStockAdjustmentFieldsProps } from "./InventoryStockAdjustmentFieldsProps.interface";

export type InventoryStockAdjustmentQuantityFieldsProps =
  Pick<
    InventoryStockAdjustmentFieldsProps,
    "formState" | "updateField"
  >;
