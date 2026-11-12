import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "./CurrencyCode.constants";

export const CURRENCY_NAME_COPY: Record<
  CurrencyCode,
  string
> = {
  [CURRENCY_CODE.USD]: "Dólares",
  [CURRENCY_CODE.CRC]: "Colones",
};
