import { CURRENCY_CODE } from "@/app/constants";
import type { Money } from "@/app/utils/money/models/Money.interface";

export const USD_CHARGE_ONE: Money = {
  amount: 100.5,
  currency: CURRENCY_CODE.USD,
};
export const USD_CHARGE_TWO: Money = {
  amount: 50,
  currency: CURRENCY_CODE.USD,
};
export const CRC_CHARGE: Money = {
  amount: 25000,
  currency: CURRENCY_CODE.CRC,
};
export const USD_REFUND: Money = {
  amount: 20.25,
  currency: CURRENCY_CODE.USD,
};
export const CRC_REFUND: Money = {
  amount: 5000,
  currency: CURRENCY_CODE.CRC,
};
export const LARGE_CRC_REFUND: Money = {
  amount: 30000,
  currency: CURRENCY_CODE.CRC,
};
export const USD_TEN_CENTS: Money = {
  amount: 0.1,
  currency: CURRENCY_CODE.USD,
};
export const USD_TWENTY_CENTS: Money = {
  amount: 0.2,
  currency: CURRENCY_CODE.USD,
};

export const CENTS_USD_CHARGED = 15050;
export const CENTS_USD_REFUNDED = 2025;
export const CENTS_USD_NET = 13025;
export const CENTS_CRC_CHARGED = 2500000;
export const CENTS_CRC_REFUNDED = 500000;
export const CENTS_CRC_NET = 2000000;
export const CENTS_CRC_NET_NEGATIVE = -500000;
export const CENTS_THIRTY = 30;
export const NO_CENTS = 0;
export const SUMMARY_COUNT = 2;
export const SUMMARY_KEYS = [
  "chargedCents",
  "currency",
  "netCents",
  "refundedCents",
];
