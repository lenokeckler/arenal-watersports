import {
  ISO_DATE_PATTERN,
  UUID_PATTERN,
} from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import {
  INVENTORY_STOCK_ADJUSTMENT_COPY,
  INVENTORY_STOCK_ADJUSTMENT_REASON,
} from "../constants/InventoryStockAdjustment.constants";
import type { InventoryStockAdjustmentInput } from "../models/InventoryStockAdjustmentInput.interface";

const isValidQuantity = (quantity: number): boolean =>
  Number.isSafeInteger(quantity) && quantity >= 0;

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
    typeof expiryDate !== "string" ||
    !ISO_DATE_PATTERN.test(expiryDate)
  ) {
    return false;
  }

  const parsedDate = new Date(`${expiryDate}T00:00:00Z`);

  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().startsWith(expiryDate)
  );
};

export const findInventoryStockAdjustmentError = (
  value: unknown
): NullableUndefined<string> => {
  if (!value || typeof value !== "object") {
    return INVENTORY_STOCK_ADJUSTMENT_COPY.SAVE_FAILED_ERROR;
  }

  const input = value as InventoryStockAdjustmentInput;

  if (
    !isValidQuantity(input.available) ||
    !isValidQuantity(input.damaged) ||
    !isValidQuantity(input.inRepair)
  ) {
    return INVENTORY_STOCK_ADJUSTMENT_COPY.QUANTITY_INVALID_ERROR;
  }

  if (
    typeof input.reason !== "string" ||
    !isValidReason(input.reason)
  ) {
    return INVENTORY_STOCK_ADJUSTMENT_COPY.REASON_INVALID_ERROR;
  }

  if (
    typeof input.categoryId !== "string" ||
    !UUID_PATTERN.test(input.categoryId)
  ) {
    return INVENTORY_STOCK_ADJUSTMENT_COPY.CATEGORY_NOT_FOUND_ERROR;
  }

  if (!isValidExpiryDate(input.expiryDate)) {
    return INVENTORY_STOCK_ADJUSTMENT_COPY.EXPIRY_DATE_INVALID_ERROR;
  }

  return undefined;
};
