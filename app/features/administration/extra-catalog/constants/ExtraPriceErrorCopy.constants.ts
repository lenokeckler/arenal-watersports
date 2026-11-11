import {
  CURRENCY_CODE,
  MONEY_AMOUNT_ISSUE,
  type CurrencyCode,
} from "@/app/constants";
import type { ExtraPriceIssue } from "../models/ExtraPriceIssue.type";
import { EXTRA_CATALOG_COPY } from "./ExtraCatalogCopy.constants";
import { EXTRA_PRICE_LIMITS } from "./ExtraPriceLimits.constants";

const buildPrecisionError = (
  currency: CurrencyCode
): string => {
  const { decimalPlaces, maxIntegerDigits } =
    EXTRA_PRICE_LIMITS[currency];
  return `Use hasta ${maxIntegerDigits} dígitos enteros y ${decimalPlaces} decimales.`;
};

export const EXTRA_PRICE_ERROR_COPY: Record<
  CurrencyCode,
  Record<ExtraPriceIssue, string>
> = {
  [CURRENCY_CODE.CRC]: {
    [MONEY_AMOUNT_ISSUE.FORMAT]:
      EXTRA_CATALOG_COPY.PRICE_FORMAT_ERROR,
    [MONEY_AMOUNT_ISSUE.PRECISION]: buildPrecisionError(
      CURRENCY_CODE.CRC
    ),
  },
  [CURRENCY_CODE.USD]: {
    [MONEY_AMOUNT_ISSUE.FORMAT]:
      EXTRA_CATALOG_COPY.PRICE_FORMAT_ERROR,
    [MONEY_AMOUNT_ISSUE.PRECISION]: buildPrecisionError(
      CURRENCY_CODE.USD
    ),
  },
};
