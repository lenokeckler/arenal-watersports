import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";
import type { MoneyAmountLimits } from "@/app/utils/money/models/MoneyAmountLimits.interface";

const AMOUNT_DECIMAL_PLACES = 2;

export const RESERVATION_CHARGE_LIMITS = {
  AMOUNT: {
    [CURRENCY_CODE.CRC]: {
      decimalPlaces: AMOUNT_DECIMAL_PLACES,
      maxIntegerDigits: 12,
    },
    [CURRENCY_CODE.USD]: {
      decimalPlaces: AMOUNT_DECIMAL_PLACES,
      maxIntegerDigits: 10,
    },
  } satisfies Record<CurrencyCode, MoneyAmountLimits>,
  PAYMENT_METHOD_MAX_LENGTH: 60,
} as const;
