import {
  CURRENCY_CODE,
  type CurrencyCode,
} from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "./CategoryCatalogCopy.constants";

export const CATEGORY_DEPOSIT_FIELD_LABEL: Record<
  CurrencyCode,
  string
> = {
  [CURRENCY_CODE.CRC]:
    CATEGORY_CATALOG_COPY.DEPOSIT_CRC_FIELD_LABEL,
  [CURRENCY_CODE.USD]:
    CATEGORY_CATALOG_COPY.DEPOSIT_USD_FIELD_LABEL,
};
