import type { PostgrestError } from "@supabase/supabase-js";
import { POSTGRES_ERROR_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { STOCK_CATALOG_COPY } from "../constants/StockCatalogCopy.constants";
import { STOCK_DATABASE_ERROR_COPY } from "../constants/StockDatabaseErrorCopy.constants";
import { STOCK_MUTATION_STATUS } from "../constants/StockMutationStatus.constants";
import type { StockMutationResult } from "../models/StockMutationResult.interface";

const buildErrorResult = (
  message: string
): StockMutationResult => ({
  message,
  status: STOCK_MUTATION_STATUS.ERROR,
});

export const mapStockWriteErrorToResult = (
  error: NullableRef<PostgrestError>
): NullableRef<StockMutationResult> => {
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INSUFFICIENT_PRIVILEGE
  ) {
    return buildErrorResult(
      STOCK_CATALOG_COPY.NOT_AUTHORIZED_ERROR
    );
  }
  if (error?.code === POSTGRES_ERROR_CODE.NO_DATA_FOUND) {
    return buildErrorResult(
      STOCK_CATALOG_COPY.CATEGORY_NOT_FOUND_ERROR
    );
  }
  const rejectionCopy =
    error?.code ===
    POSTGRES_ERROR_CODE.INVALID_PARAMETER_VALUE
      ? STOCK_DATABASE_ERROR_COPY[error.message]
      : undefined;

  return rejectionCopy
    ? buildErrorResult(rejectionCopy)
    : null;
};
