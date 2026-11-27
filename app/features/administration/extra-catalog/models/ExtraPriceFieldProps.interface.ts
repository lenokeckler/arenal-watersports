import type { CurrencyCode } from "@/app/constants";
import type { ExtraFormFieldChangeHandler } from "./ExtraFormFieldChangeHandler.type";

export interface ExtraPriceFieldProps {
  id: string;
  label: string;
  symbol: string;
  currency: CurrencyCode;
  value: string;
  error?: string;
  disabled: boolean;
  onChange: ExtraFormFieldChangeHandler;
}
