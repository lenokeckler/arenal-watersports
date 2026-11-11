import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";

export const EXTRA_INPUT_FIELD = {
  NAME: "name",
  PRICE_CRC: "priceCrc",
  PRICE_USD: "priceUsd",
} as const;

export type ExtraInputField =
  (typeof EXTRA_INPUT_FIELD)[keyof typeof EXTRA_INPUT_FIELD];

export const EXTRA_PRICE_INPUT_FIELD: Record<
  CurrencyCode,
  ExtraInputField
> = {
  [CURRENCY_CODE.CRC]: EXTRA_INPUT_FIELD.PRICE_CRC,
  [CURRENCY_CODE.USD]: EXTRA_INPUT_FIELD.PRICE_USD,
};
