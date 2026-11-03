import type { StockFormFieldChangeHandler } from "./StockFormFieldChangeHandler.type";

export interface StockNumberFieldProps {
  disabled: boolean;
  error?: string;
  id: string;
  label: string;
  onChange: StockFormFieldChangeHandler;
  value: string;
}
