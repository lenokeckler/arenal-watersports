"use client";

import { Button } from "@/app/components";
import { INVENTORY_COPY } from "../constants/InventoryCopy.constants";
import type { InventoryStockAdjustmentPanelProps } from "../models/InventoryStockAdjustmentPanelProps.interface";
import {
  INVENTORY_STOCK_FORM_ACTION_CLASS,
  INVENTORY_STOCK_FORM_CLASS,
} from "../styles/InventoryCategory.styles";
import InventoryStockAdjustmentFields from "./InventoryStockAdjustmentFields";

const InventoryStockAdjustmentPanel = ({
  formState,
  isPending,
  result,
  submit,
  updateField,
}: InventoryStockAdjustmentPanelProps): React.JSX.Element => (
  <form
    className={INVENTORY_STOCK_FORM_CLASS}
    onSubmit={(event) => {
      event.preventDefault();
      submit();
    }}
  >
    <InventoryStockAdjustmentFields
      formState={formState}
      result={result}
      updateField={updateField}
    />
    <Button
      type="submit"
      disabled={isPending}
      className={INVENTORY_STOCK_FORM_ACTION_CLASS}
    >
      {isPending
        ? INVENTORY_COPY.ADJUSTMENT_PENDING
        : INVENTORY_COPY.ADJUSTMENT_SUBMIT}
    </Button>
  </form>
);

export default InventoryStockAdjustmentPanel;
