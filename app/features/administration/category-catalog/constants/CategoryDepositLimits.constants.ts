import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";
import type { MoneyAmountLimits } from "@/app/utils/money/models/MoneyAmountLimits.interface";

const DEPOSIT_DECIMAL_PLACES = 2;
const DEPOSIT_CRC_MAX_INTEGER_DIGITS = 12;
const DEPOSIT_USD_MAX_INTEGER_DIGITS = 10;

export const CATEGORY_DEPOSIT_LIMITS: Record<
  CurrencyCode,
  MoneyAmountLimits
> = {
  [CURRENCY_CODE.CRC]: {
    decimalPlaces: DEPOSIT_DECIMAL_PLACES,
    maxIntegerDigits: DEPOSIT_CRC_MAX_INTEGER_DIGITS,
  },
  [CURRENCY_CODE.USD]: {
    decimalPlaces: DEPOSIT_DECIMAL_PLACES,
    maxIntegerDigits: DEPOSIT_USD_MAX_INTEGER_DIGITS,
  },
};
