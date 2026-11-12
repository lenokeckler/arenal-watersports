import {
  ISO_DATE_PATTERN,
  ISO_DATE_UTC_MIDNIGHT_SUFFIX,
  TYPE_OF,
  UUID_PATTERN,
} from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import {
  INVENTORY_STOCK_ADJUSTMENT_COPY,
  INVENTORY_STOCK_ADJUSTMENT_REASON,
} from "../constants/InventoryStockAdjustment.constants";

const isRecord = (
  value: unknown
): value is Record<string, unknown> =>
  value !== null &&
  typeof value === TYPE_OF.OBJECT &&
  !Array.isArray(value);

const isNumber = (value: unknown): value is number =>
  typeof value === TYPE_OF.NUMBER;

const isValidQuantity = (quantity: unknown): boolean =>
  isNumber(quantity) &&
  Number.isSafeInteger(quantity) &&
  quantity >= 0;

const isString = (value: unknown): value is string =>
  typeof value === TYPE_OF.STRING;

const isValidReason = (reason: string): boolean =>
  Object.values(INVENTORY_STOCK_ADJUSTMENT_REASON).some(
    (allowedReason) => allowedReason === reason
  );

const isValidExpiryDate = (
  expiryDate: unknown
): boolean => {
  if (expiryDate === null || expiryDate === undefined) {
    return true;
  }

  if (
    !isString(expiryDate) ||
    !ISO_DATE_PATTERN.test(expiryDate)
  ) {
    return false;
  }

  const parsedDate = new Date(
    `${expiryDate}${ISO_DATE_UTC_MIDNIGHT_SUFFIX}`
  );

  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().startsWith(expiryDate)
  );
};

export const findInventoryStockAdjustmentError = (
  value: unknown
): NullableUndefined<string> => {
  if (!isRecord(value)) {
    return INVENTORY_STOCK_ADJUSTMENT_COPY.SAVE_FAILED_ERROR;
  }

  if (
    !isValidQuantity(value.available) ||
    !isValidQuantity(value.damaged) ||
    !isValidQuantity(value.inRepair)
  ) {
    return INVENTORY_STOCK_ADJUSTMENT_COPY.QUANTITY_INVALID_ERROR;
  }

  if (
    !isString(value.reason) ||
    !isValidReason(value.reason)
  ) {
    return INVENTORY_STOCK_ADJUSTMENT_COPY.REASON_INVALID_ERROR;
  }

  if (
    !isString(value.categoryId) ||
    !UUID_PATTERN.test(value.categoryId)
  ) {
    return INVENTORY_STOCK_ADJUSTMENT_COPY.CATEGORY_NOT_FOUND_ERROR;
  }

  if (!isValidExpiryDate(value.expiryDate)) {
    return INVENTORY_STOCK_ADJUSTMENT_COPY.EXPIRY_DATE_INVALID_ERROR;
  }

  return undefined;
};
