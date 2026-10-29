export const CURRENCY_CODE = {
  CRC: "CRC",
  USD: "USD",
} as const;
export type CurrencyCode =
  (typeof CURRENCY_CODE)[keyof typeof CURRENCY_CODE];
