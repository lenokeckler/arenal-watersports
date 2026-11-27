import type { CurrencyCode } from "@/app/constants";

export interface ComboPriceField {
  currency: CurrencyCode;
  label: string;
  placeholder: string;
}
