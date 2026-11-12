import type { NullableUndefined } from "@/app/types";
import { STOCK_CATALOG_COPY } from "../constants/StockCatalogCopy.constants";
import { STOCK_EXPIRY_DATE_PATTERN } from "../constants/StockExpiryDate.constants";
import type { AdjustStockInput } from "../models/AdjustStockInput.interface";

const isRealCalendarDate = (value: string): boolean => {
  const parsedDate = new Date(value);

  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().startsWith(value)
  );
};

export const findStockExpiryError = (
  input: AdjustStockInput,
  hasExpiryAlert: boolean
): NullableUndefined<string> => {
  if (input.expiryDate === null) {
    return undefined;
  }
  if (!hasExpiryAlert) {
    return STOCK_CATALOG_COPY.EXPIRY_NOT_APPLICABLE_ERROR;
  }
  const isValidDate =
    STOCK_EXPIRY_DATE_PATTERN.test(input.expiryDate) &&
    isRealCalendarDate(input.expiryDate);

  return isValidDate
    ? undefined
    : STOCK_CATALOG_COPY.EXPIRY_DATE_INVALID_ERROR;
};
