import {
  CURRENCY_NAME_COPY,
  MONEY_AMOUNT_ISSUE,
  type CurrencyCode,
} from "@/app/constants";
import type { ComboAudience } from "../models/ComboAudience.type";
import type { ComboPriceErrorCopy } from "../models/ComboPriceErrorCopy.interface";
import { COMBO_AUDIENCE } from "./ComboAudience.constants";
import { COMBO_AUDIENCE_CURRENCY } from "./ComboAudienceCurrency.constants";
import { COMBO_PRICE_LIMITS } from "./ComboPriceLimits.constants";

const buildPriceErrorCopy = (
  currency: CurrencyCode
): ComboPriceErrorCopy => {
  const currencyName =
    CURRENCY_NAME_COPY[currency].toLowerCase();
  const { decimalPlaces, maxIntegerDigits } =
    COMBO_PRICE_LIMITS[currency];

  return {
    issues: {
      [MONEY_AMOUNT_ISSUE.FORMAT]: `Ingrese el precio en ${currencyName} solo con números, usando punto o coma para los decimales.`,
      [MONEY_AMOUNT_ISSUE.NOT_POSITIVE]: `El precio en ${currencyName} debe ser mayor que cero.`,
      [MONEY_AMOUNT_ISSUE.PRECISION]: `Use hasta ${maxIntegerDigits} dígitos enteros y ${decimalPlaces} decimales en ${currencyName}.`,
    },
    required: `Ingrese el precio del combo en ${currencyName}.`,
  };
};

export const COMBO_PRICE_ERROR_COPY: Record<
  ComboAudience,
  ComboPriceErrorCopy
> = {
  [COMBO_AUDIENCE.FOREIGN]: buildPriceErrorCopy(
    COMBO_AUDIENCE_CURRENCY[COMBO_AUDIENCE.FOREIGN]
  ),
  [COMBO_AUDIENCE.NATIONAL]: buildPriceErrorCopy(
    COMBO_AUDIENCE_CURRENCY[COMBO_AUDIENCE.NATIONAL]
  ),
};
