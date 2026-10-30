import type { CurrencyCode } from "@/app/constants";
import { CategoryFormFieldChangeHandler } from "./CategoryFormFieldChangeHandler.type";

export interface CategoryDepositAmountFieldProps {
  currency: CurrencyCode;
  value: string;
  error?: string;
  disabled: boolean;
  onChange: CategoryFormFieldChangeHandler;
}
