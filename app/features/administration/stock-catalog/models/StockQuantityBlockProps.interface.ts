import type { StockQuantityField } from "../constants/StockQuantityField.constants";
import type { StockFieldHandlers } from "./StockFieldHandlers.interface";
import type { StockFormFieldChangeHandler } from "./StockFormFieldChangeHandler.type";

export interface StockQuantityBlockProps {
  changeText: string;
  disabled: boolean;
  error?: string;
  field: StockQuantityField;
  id: string;
  label: string;
  onChange: StockFormFieldChangeHandler;
  onQuantityStep: StockFieldHandlers["onQuantityStep"];
  value: string;
}
