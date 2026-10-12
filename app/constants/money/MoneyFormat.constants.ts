import type { MoneyFormatConfig } from "@/app/types";
import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "./CurrencyCode.constants";

const MAX_FRACTION_DIGITS = 2;

export const MONEY_FORMAT: Record<
  CurrencyCode,
  MoneyFormatConfig
> = {
  [CURRENCY_CODE.CRC]: {
    locale: "es-CR",
    options: {
      minimumFractionDigits: 0,
      maximumFractionDigits: MAX_FRACTION_DIGITS,
    },
  },
  [CURRENCY_CODE.USD]: {
    locale: "en-US",
    options: {
      minimumFractionDigits: MAX_FRACTION_DIGITS,
      maximumFractionDigits: MAX_FRACTION_DIGITS,
    },
  },
};
