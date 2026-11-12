import { POSTGRES_ERROR_CODE } from "@/app/constants";
import type { NullableUndefined } from "@/app/types";
import {
  INVENTORY_STOCK_ADJUSTMENT_COPY,
  INVENTORY_STOCK_ADJUSTMENT_DATABASE_ERROR,
  INVENTORY_STOCK_ADJUSTMENT_STATUS,
} from "../constants/InventoryStockAdjustment.constants";
import type { InventoryStockAdjustmentDatabaseError } from "../models/InventoryStockAdjustmentDatabaseError.interface";
import type { InventoryStockAdjustmentResult } from "../models/InventoryStockAdjustmentResult.interface";

const DATABASE_ERROR_COPY: Record<string, string> = {
  [INVENTORY_STOCK_ADJUSTMENT_DATABASE_ERROR.NO_CHANGE]:
    INVENTORY_STOCK_ADJUSTMENT_COPY.ADJUSTMENT_UNCHANGED_ERROR,
  [INVENTORY_STOCK_ADJUSTMENT_DATABASE_ERROR.ALREADY_COUNTED]:
    INVENTORY_STOCK_ADJUSTMENT_COPY.ALREADY_COUNTED_ERROR,
  [INVENTORY_STOCK_ADJUSTMENT_DATABASE_ERROR.CATEGORY_NOT_BY_QUANTITY]:
    INVENTORY_STOCK_ADJUSTMENT_COPY.CATEGORY_NOT_BY_QUANTITY_ERROR,
  [INVENTORY_STOCK_ADJUSTMENT_DATABASE_ERROR.EXPIRY_NOT_APPLICABLE]:
    INVENTORY_STOCK_ADJUSTMENT_COPY.EXPIRY_NOT_APPLICABLE_ERROR,
  [INVENTORY_STOCK_ADJUSTMENT_DATABASE_ERROR.INVALID_QUANTITY]:
    INVENTORY_STOCK_ADJUSTMENT_COPY.QUANTITY_INVALID_ERROR,
  [INVENTORY_STOCK_ADJUSTMENT_DATABASE_ERROR.INVALID_REASON]:
    INVENTORY_STOCK_ADJUSTMENT_COPY.REASON_INVALID_ERROR,
  [INVENTORY_STOCK_ADJUSTMENT_DATABASE_ERROR.TOTAL_MUST_DECREASE]:
    INVENTORY_STOCK_ADJUSTMENT_COPY.REMOVAL_MUST_LOWER_TOTAL_ERROR,
  [INVENTORY_STOCK_ADJUSTMENT_DATABASE_ERROR.RESERVED_QUANTITY]:
    INVENTORY_STOCK_ADJUSTMENT_COPY.RESERVED_QUANTITY_ERROR,
};

const buildErrorResult = (
  message: string
): InventoryStockAdjustmentResult => ({
  message,
  status: INVENTORY_STOCK_ADJUSTMENT_STATUS.ERROR,
});

const resolveInvalidParameterError = (
  message: string
): NullableUndefined<InventoryStockAdjustmentResult> => {
  const userMessage = DATABASE_ERROR_COPY[message];

  return userMessage
    ? buildErrorResult(userMessage)
    : undefined;
};

export const resolveInventoryStockAdjustmentError = (
  error: InventoryStockAdjustmentDatabaseError
): NullableUndefined<InventoryStockAdjustmentResult> => {
  if (
    error.code ===
    POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE
  ) {
    return buildErrorResult(
      INVENTORY_STOCK_ADJUSTMENT_COPY.NOT_AUTHORIZED_ERROR
    );
  }

  if (error.code === POSTGRES_ERROR_CODE.NO_DATA_FOUND) {
    return buildErrorResult(
      INVENTORY_STOCK_ADJUSTMENT_COPY.CATEGORY_NOT_FOUND_ERROR
    );
  }

  if (
    error.code ===
    POSTGRES_ERROR_CODE.INVALID_PARAMETER_VALUE
  ) {
    return resolveInvalidParameterError(error.message);
  }

  return undefined;
};
