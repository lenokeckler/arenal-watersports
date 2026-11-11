import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";

export const TYPED_USD_TEXT = "150.5";
export const TYPED_USD_AMOUNT = 150.5;
export const INVALID_AMOUNT_TEXT = "abc";
export const INPUT_MODE_ATTRIBUTE = "inputmode";
export const PLACEHOLDER_ATTRIBUTE = "placeholder";
export const SUMMARY_TEXT_PATTERN =
  /total|equivalente|suma|tipo de cambio|convert|convers|convie/i;
export const DEPOSIT_FIELD_CURRENCY_ORDER = [
  CURRENCY_CODE.USD,
  CURRENCY_CODE.CRC,
];

export const COUNTERPART_CURRENCY: Record<
  CurrencyCode,
  CurrencyCode
> = {
  [CURRENCY_CODE.CRC]: CURRENCY_CODE.USD,
  [CURRENCY_CODE.USD]: CURRENCY_CODE.CRC,
};

export const DEPOSIT_FIELD_LABEL: Record<
  CurrencyCode,
  string
> = {
  [CURRENCY_CODE.CRC]:
    CATEGORY_CATALOG_COPY.DEPOSIT_CRC_FIELD_LABEL,
  [CURRENCY_CODE.USD]:
    CATEGORY_CATALOG_COPY.DEPOSIT_USD_FIELD_LABEL,
};
