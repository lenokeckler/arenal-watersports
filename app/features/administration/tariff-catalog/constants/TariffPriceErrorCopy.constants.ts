import {
  CURRENCY_CODE,
  CURRENCY_NAME_COPY,
  MONEY_AMOUNT_ISSUE,
  type CurrencyCode,
} from "@/app/constants";
import type { TariffPriceIssueCopy } from "../models/TariffPriceIssueCopy.type";
import { TARIFF_PRICE_LIMITS } from "./TariffPriceLimits.constants";

const buildPriceIssueCopy = (
  currency: CurrencyCode
): TariffPriceIssueCopy => {
  const currencyName =
    CURRENCY_NAME_COPY[currency].toLowerCase();
  const { decimalPlaces, maxIntegerDigits } =
    TARIFF_PRICE_LIMITS[currency];

  return {
    [MONEY_AMOUNT_ISSUE.FORMAT]: `Ingrese el precio en ${currencyName} solo con números, usando punto o coma para los decimales.`,
    [MONEY_AMOUNT_ISSUE.NOT_POSITIVE]: `El precio en ${currencyName} debe ser mayor que cero.`,
    [MONEY_AMOUNT_ISSUE.PRECISION]: `Use hasta ${maxIntegerDigits} dígitos enteros y ${decimalPlaces} decimales en ${currencyName}.`,
  };
};

export const TARIFF_PRICE_ERROR_COPY: Record<
  CurrencyCode,
  TariffPriceIssueCopy
> = {
  [CURRENCY_CODE.CRC]: buildPriceIssueCopy(
    CURRENCY_CODE.CRC
  ),
  [CURRENCY_CODE.USD]: buildPriceIssueCopy(
    CURRENCY_CODE.USD
  ),
};
