"use client";

import { FormField } from "@/app/components";
import { INPUT_TYPES } from "@/app/constants";
import type { InventoryStockAdjustmentNumberFieldProps } from "../models/InventoryStockAdjustmentNumberFieldProps.interface";

const InventoryStockAdjustmentNumberField = ({
  field,
  id,
  label,
  updateField,
  value,
}: InventoryStockAdjustmentNumberFieldProps): React.JSX.Element => (
  <FormField
    id={id}
    name={field}
    label={label}
    type={INPUT_TYPES.NUMBER}
    value={value}
    onChange={(event) =>
      updateField(field, event.currentTarget.value)
    }
  />
);

export default InventoryStockAdjustmentNumberField;
