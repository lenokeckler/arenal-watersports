import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "./CurrencyCode.constants";

export const CURRENCY_SYMBOL: Record<CurrencyCode, string> =
  {
    [CURRENCY_CODE.CRC]: "₡",
    [CURRENCY_CODE.USD]: "US$",
  };

export const CURRENCY_SYMBOL_SEPARATOR = "\u00A0";
