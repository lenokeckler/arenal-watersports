"use client";

import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import { INVENTORY_DOM_ID } from "../constants/InventoryDomId.constants";
import { INVENTORY_STOCK_ADJUSTMENT_FIELD } from "../models/InventoryStockAdjustmentFormState.interface";
import type { InventoryStockAdjustmentFieldsProps } from "../models/InventoryStockAdjustmentFieldsProps.interface";
import type { InventoryStockAdjustmentQuantityFieldsProps } from "../models/InventoryStockAdjustmentQuantityFieldsProps.type";
import InventoryStockAdjustmentMessage from "./InventoryStockAdjustmentMessage";
import InventoryStockAdjustmentNumberField from "./InventoryStockAdjustmentNumberField";
import InventoryStockAdjustmentReasonField from "./InventoryStockAdjustmentReasonField";

const createQuantityFieldProps = ({
  formState,
  updateField,
}: InventoryStockAdjustmentQuantityFieldsProps) => [
  {
    field: INVENTORY_STOCK_ADJUSTMENT_FIELD.AVAILABLE,
    id: INVENTORY_DOM_ID.STOCK_ADJUSTMENT_AVAILABLE,
    label: INVENTORY_COPY.ADJUSTMENT_AVAILABLE,
    updateField,
    value:
      formState[INVENTORY_STOCK_ADJUSTMENT_FIELD.AVAILABLE],
  },
  {
    field: INVENTORY_STOCK_ADJUSTMENT_FIELD.DAMAGED,
    id: INVENTORY_DOM_ID.STOCK_ADJUSTMENT_DAMAGED,
    label: INVENTORY_COPY.ADJUSTMENT_DAMAGED,
    updateField,
    value:
      formState[INVENTORY_STOCK_ADJUSTMENT_FIELD.DAMAGED],
  },
  {
    field: INVENTORY_STOCK_ADJUSTMENT_FIELD.IN_REPAIR,
    id: INVENTORY_DOM_ID.STOCK_ADJUSTMENT_REPAIR,
    label: INVENTORY_COPY.ADJUSTMENT_REPAIR,
    updateField,
    value:
      formState[INVENTORY_STOCK_ADJUSTMENT_FIELD.IN_REPAIR],
  },
];

const InventoryStockAdjustmentFields = ({
  formState,
  result,
  updateField,
}: InventoryStockAdjustmentFieldsProps): React.JSX.Element => {
  const quantityFields = createQuantityFieldProps({
    formState,
    updateField,
  });

  return (
    <>
      {quantityFields.map((field) => (
        <InventoryStockAdjustmentNumberField
          key={field.field}
          {...field}
        />
      ))}
      <InventoryStockAdjustmentReasonField
        reason={
          formState[INVENTORY_STOCK_ADJUSTMENT_FIELD.REASON]
        }
        updateField={updateField}
        validationError={result?.message}
      />
      <InventoryStockAdjustmentMessage result={result} />
    </>
  );
};

export default InventoryStockAdjustmentFields;
