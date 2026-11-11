import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";
import type { MoneyAmountLimits } from "@/app/utils/money/models/MoneyAmountLimits.interface";

const PRICE_DECIMAL_PLACES = 2;
const PRICE_CRC_MAX_INTEGER_DIGITS = 12;
const PRICE_USD_MAX_INTEGER_DIGITS = 10;

export const EXTRA_PRICE_LIMITS: Record<
  CurrencyCode,
  MoneyAmountLimits
> = {
  [CURRENCY_CODE.CRC]: {
    decimalPlaces: PRICE_DECIMAL_PLACES,
    maxIntegerDigits: PRICE_CRC_MAX_INTEGER_DIGITS,
  },
  [CURRENCY_CODE.USD]: {
    decimalPlaces: PRICE_DECIMAL_PLACES,
    maxIntegerDigits: PRICE_USD_MAX_INTEGER_DIGITS,
  },
};
