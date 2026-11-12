import type { StockQuantityField } from "../constants/StockQuantityField.constants";
import type { StockFormFieldChangeHandler } from "./StockFormFieldChangeHandler.type";

export interface StockFieldHandlers {
  onAvailableChange: StockFormFieldChangeHandler;
  onDamagedChange: StockFormFieldChangeHandler;
  onExpiryDateChange: StockFormFieldChangeHandler;
  onInRepairChange: StockFormFieldChangeHandler;
  onQuantityStep: (
    field: StockQuantityField,
    step: number
  ) => void;
  onReasonChange: StockFormFieldChangeHandler;
}
