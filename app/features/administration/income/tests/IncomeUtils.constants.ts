import { CURRENCY_CODE } from "@/app/constants";
import type { CurrencyIncomeSummary } from "@/app/services/income-report";

export const POSITIVE_SUMMARY: CurrencyIncomeSummary = {
  currency: CURRENCY_CODE.USD,
  chargedCents: 12050,
  refundedCents: 2000,
  netCents: 10050,
};

export const NEGATIVE_SUMMARY: CurrencyIncomeSummary = {
  currency: CURRENCY_CODE.CRC,
  chargedCents: 100000,
  refundedCents: 300000,
  netCents: -200000,
};

export const BALANCED_SUMMARY: CurrencyIncomeSummary = {
  currency: CURRENCY_CODE.USD,
  chargedCents: 3000,
  refundedCents: 3000,
  netCents: 0,
};

export const REFUND_ONLY_SUMMARY: CurrencyIncomeSummary = {
  currency: CURRENCY_CODE.USD,
  chargedCents: 0,
  refundedCents: 500,
  netCents: -500,
};

export const IDLE_SUMMARY: CurrencyIncomeSummary = {
  currency: CURRENCY_CODE.CRC,
  chargedCents: 0,
  refundedCents: 0,
  netCents: 0,
};

export const POSITIVE_COLLECTED_AMOUNT = 120.5;
export const POSITIVE_REFUNDED_AMOUNT = 20;
export const POSITIVE_NET_AMOUNT = 100.5;
export const NEGATIVE_NET_MAGNITUDE = 2000;

export const INCOME_DATE = "2026-10-29";
export const EXPECTED_INCOME_DATE_TEXT =
  "jueves, 29 de octubre de 2026";
export const NEW_YEAR_DATE = "2027-01-01";
export const EXPECTED_NEW_YEAR_DATE_TEXT =
  "viernes, 1 de enero de 2027";

export const EXPECTED_DOLLAR_TITLE_ID = "income-usd-title";
