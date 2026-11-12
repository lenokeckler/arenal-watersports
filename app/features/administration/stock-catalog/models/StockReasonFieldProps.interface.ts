import type { StockAdjustmentReason } from "../constants/StockAdjustmentReason.constants";
import type { StockFormFieldChangeHandler } from "./StockFormFieldChangeHandler.type";

export interface StockReasonFieldProps {
  disabled: boolean;
  onChange: StockFormFieldChangeHandler;
  value: StockAdjustmentReason;
}
