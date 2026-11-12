"use client";

import { FormField } from "@/app/components";
import { INPUT_TYPES } from "@/app/constants";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import { INVENTORY_DOM_ID } from "../constants/InventoryDomId.constants";
import { INVENTORY_STOCK_ADJUSTMENT_REASON_OPTIONS } from "../constants/InventoryStockAdjustmentOptions.constants";
import { INVENTORY_STOCK_ADJUSTMENT_FIELD } from "../models/InventoryStockAdjustmentFormState.interface";
import type { InventoryStockAdjustmentReasonFieldProps } from "../models/InventoryStockAdjustmentReasonFieldProps.interface";

const InventoryStockAdjustmentReasonField = ({
  reason,
  updateField,
  validationError,
}: InventoryStockAdjustmentReasonFieldProps): React.JSX.Element => (
  <FormField
    id={INVENTORY_DOM_ID.STOCK_ADJUSTMENT_REASON}
    name={INVENTORY_STOCK_ADJUSTMENT_FIELD.REASON}
    label={INVENTORY_COPY.ADJUSTMENT_REASON_LABEL}
    type={INPUT_TYPES.SELECT}
    value={reason}
    placeholder={
      INVENTORY_COPY.ADJUSTMENT_REASON_PLACEHOLDER
    }
    options={[...INVENTORY_STOCK_ADJUSTMENT_REASON_OPTIONS]}
    error={validationError}
    onChange={(event) =>
      updateField(
        INVENTORY_STOCK_ADJUSTMENT_FIELD.REASON,
        event.currentTarget.value
      )
    }
  />
);

export default InventoryStockAdjustmentReasonField;
