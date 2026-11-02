import type { StockFormFieldChangeHandler } from "./StockFormFieldChangeHandler.type";

export interface StockFieldHandlers {
  onAvailableChange: StockFormFieldChangeHandler;
  onDamagedChange: StockFormFieldChangeHandler;
  onExpiryDateChange: StockFormFieldChangeHandler;
  onInRepairChange: StockFormFieldChangeHandler;
  onReasonChange: StockFormFieldChangeHandler;
}
