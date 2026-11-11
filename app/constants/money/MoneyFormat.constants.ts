import type { MoneyFormatConfig } from "@/app/types";
import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "./CurrencyCode.constants";

const NO_FRACTION_DIGITS = 0;
const CENTS_FRACTION_DIGITS = 2;

const WITHOUT_FRACTION: Intl.NumberFormatOptions = {
  minimumFractionDigits: NO_FRACTION_DIGITS,
  maximumFractionDigits: NO_FRACTION_DIGITS,
};

const WITH_CENTS: Intl.NumberFormatOptions = {
  minimumFractionDigits: CENTS_FRACTION_DIGITS,
  maximumFractionDigits: CENTS_FRACTION_DIGITS,
};

export const MONEY_FORMAT: Record<
  CurrencyCode,
  MoneyFormatConfig
> = {
  [CURRENCY_CODE.CRC]: {
    locale: "es-CR",
    wholeAmountOptions: WITHOUT_FRACTION,
    fractionalAmountOptions: WITH_CENTS,
  },
  [CURRENCY_CODE.USD]: {
    locale: "en-US",
    wholeAmountOptions: WITH_CENTS,
    fractionalAmountOptions: WITH_CENTS,
  },
};
