import type { MoneyAmountLimits } from "@/app/utils/money/models/MoneyAmountLimits.interface";

const USAGE_DECIMAL_PLACES = 2;
const USAGE_MAX_INTEGER_DIGITS = 10;

export const UNIT_FORM_LIMITS = {
  CODE_MAX_LENGTH: 40,
  FUEL_LEVEL_MIN: 0,
  FUEL_MAX_DEFAULT: 4,
  FUEL_MAX_MAX: 20,
  FUEL_MAX_MIN: 1,
  REASON_MAX_LENGTH: 300,
} as const;

export const UNIT_USAGE_LIMITS: MoneyAmountLimits = {
  decimalPlaces: USAGE_DECIMAL_PLACES,
  maxIntegerDigits: USAGE_MAX_INTEGER_DIGITS,
};

export const UNIT_INTEGER_PATTERN = /^\d+$/;
