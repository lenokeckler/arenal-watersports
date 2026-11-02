import { CURRENCY_CODE } from "@/app/constants";
import type { Money } from "@/app/utils/money/models/Money.interface";

export const USD_PRICE_WITH_CENTS: Money = {
  amount: 19.99,
  currency: CURRENCY_CODE.USD,
};
export const REPEAT_COUNT = 1000;
export const CENTS_REPEATED_PRICE = 1_999_000;

export const LARGE_CRC_CHARGE: Money = {
  amount: 9_999_999_999.99,
  currency: CURRENCY_CODE.CRC,
};
export const CENTS_LARGE_CRC = 999_999_999_999;

export const USD_ONLY_REFUND: Money = {
  amount: 12.5,
  currency: CURRENCY_CODE.USD,
};
export const CENTS_USD_ONLY_REFUND = 1250;
export const CENTS_USD_ONLY_REFUND_NET = -1250;

export const UNKNOWN_CURRENCY_CHARGE = {
  amount: 77,
  currency: "EUR",
} as unknown as Money;

export const NO_CENTS = 0;
