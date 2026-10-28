import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "./CurrencyCode.constants";

export const CURRENCY_NAME: Record<CurrencyCode, string> = {
  [CURRENCY_CODE.USD]: "Dólares",
  [CURRENCY_CODE.CRC]: "Colones",
};
