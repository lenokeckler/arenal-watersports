import type { StockFormFieldChangeHandler } from "./StockFormFieldChangeHandler.type";

export interface StockExpiryFieldProps {
  disabled: boolean;
  error?: string;
  onChange: StockFormFieldChangeHandler;
  value: string;
}
