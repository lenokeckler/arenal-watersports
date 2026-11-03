"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { STOCK_CATALOG_COPY } from "../constants/StockCatalogCopy.constants";
import { STOCK_CATEGORY_TRACKING_MODE } from "../constants/StockCategoryTrackingMode.constants";
import { STOCK_MUTATION_STATUS } from "../constants/StockMutationStatus.constants";
import type { AdjustStockInput } from "../models/AdjustStockInput.interface";
import type { StockMutationResult } from "../models/StockMutationResult.interface";
import { mapAdjustStockInputToRpcArgs } from "../utils/mapAdjustStockInputToRpcArgs";
import { mapStockWriteErrorToResult } from "../utils/mapStockWriteErrorToResult";
import { validateStockAdjustment } from "../utils/validateStockAdjustment";
import { getStockCategory } from "./getStockCategory";
import { getStockLevels } from "./getStockLevels";

const buildErrorResult = (
  message: string
): StockMutationResult => ({
  message,
  status: STOCK_MUTATION_STATUS.ERROR,
});

export const adjustStockAction = async (
  input: AdjustStockInput
): Promise<StockMutationResult> => {
  const supabase = await createServerSupabaseClient();
  await assertIsAdminWorker(supabase);

  const category = await getStockCategory(input.categoryId);
  if (!category) {
    return buildErrorResult(
      STOCK_CATALOG_COPY.CATEGORY_NOT_FOUND_ERROR
    );
  }
  if (
    category.trackingMode !==
    STOCK_CATEGORY_TRACKING_MODE.BY_QUANTITY
  ) {
    return buildErrorResult(
      STOCK_CATALOG_COPY.CATEGORY_NOT_BY_QUANTITY_ERROR
    );
  }

  const validationError = validateStockAdjustment(input, {
    currentLevels: await getStockLevels(input.categoryId),
    hasExpiryAlert: category.hasExpiryAlert,
  });
  if (validationError) {
    return buildErrorResult(validationError);
  }

  const { error } = await supabase.rpc(
    "adjust_equipment_stock",
    mapAdjustStockInputToRpcArgs(input)
  );
  const failure = mapStockWriteErrorToResult(error);
  if (failure) {
    return failure;
  }
  throwIfSupabaseError(error, "adjustStockAction");

  return { status: STOCK_MUTATION_STATUS.SUCCESS };
};
