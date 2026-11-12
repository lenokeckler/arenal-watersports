import {
  CURRENCY_ORDER,
  type CurrencyCode,
} from "@/app/constants";

export const isCurrencyCode = (
  value: unknown
): value is CurrencyCode =>
  CURRENCY_ORDER.some((currency) => currency === value);
