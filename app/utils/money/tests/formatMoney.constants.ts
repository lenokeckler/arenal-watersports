import { CURRENCY_CODE } from "@/app/constants";
import type { Money } from "../models/Money.interface";

export const USD_INTEGER: Money = {
  amount: 50,
  currency: CURRENCY_CODE.USD,
};
export const USD_WITH_CENTS: Money = {
  amount: 1250.5,
  currency: CURRENCY_CODE.USD,
};
export const USD_THOUSANDS: Money = {
  amount: 1250,
  currency: CURRENCY_CODE.USD,
};
export const CRC_INTEGER: Money = {
  amount: 500,
  currency: CURRENCY_CODE.CRC,
};
export const CRC_THOUSANDS: Money = {
  amount: 25000,
  currency: CURRENCY_CODE.CRC,
};
export const CRC_MILLIONS: Money = {
  amount: 1250000,
  currency: CURRENCY_CODE.CRC,
};
export const CRC_WITH_CENTS: Money = {
  amount: 25000.75,
  currency: CURRENCY_CODE.CRC,
};
export const CRC_ONE_DECIMAL: Money = {
  amount: 25000.5,
  currency: CURRENCY_CODE.CRC,
};
export const USD_ZERO: Money = {
  amount: 0,
  currency: CURRENCY_CODE.USD,
};
export const CRC_ZERO: Money = {
  amount: 0,
  currency: CURRENCY_CODE.CRC,
};
export const CRC_FOUR_DIGITS: Money = {
  amount: 2500,
  currency: CURRENCY_CODE.CRC,
};
export const USD_NAN: Money = {
  amount: Number.NaN,
  currency: CURRENCY_CODE.USD,
};
export const CRC_POSITIVE_INFINITY: Money = {
  amount: Number.POSITIVE_INFINITY,
  currency: CURRENCY_CODE.CRC,
};
export const USD_NEGATIVE_INFINITY: Money = {
  amount: Number.NEGATIVE_INFINITY,
  currency: CURRENCY_CODE.USD,
};

export const EXPECTED_USD_INTEGER = "US$\u00A050.00";
export const EXPECTED_USD_WITH_CENTS = "US$\u00A01,250.50";
export const EXPECTED_USD_THOUSANDS = "US$\u00A01,250.00";
export const EXPECTED_CRC_INTEGER = "₡\u00A0500";
export const EXPECTED_CRC_THOUSANDS = "₡\u00A025\u00A0000";
export const EXPECTED_CRC_MILLIONS =
  "₡\u00A01\u00A0250\u00A0000";
export const EXPECTED_CRC_WITH_CENTS =
  "₡\u00A025\u00A0000,75";
export const EXPECTED_CRC_ONE_DECIMAL =
  "₡\u00A025\u00A0000,50";
export const EXPECTED_USD_ZERO = "US$\u00A00.00";
export const EXPECTED_CRC_ZERO = "₡\u00A00";
export const EXPECTED_CRC_FOUR_DIGITS = "₡\u00A02\u00A0500";
