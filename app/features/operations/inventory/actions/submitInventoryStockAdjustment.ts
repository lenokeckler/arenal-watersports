"use server";

import { SUPABASE_RPC } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { requireInventoryAccess } from "@/app/services/operations/inventory/requireInventoryAccess";
import { INVENTORY_STOCK_ADJUSTMENT_STATUS } from "../constants/InventoryStockAdjustment.constants";
import type { InventoryStockAdjustmentInput } from "../models/InventoryStockAdjustmentInput.interface";
import type { InventoryStockAdjustmentResult } from "../models/InventoryStockAdjustmentResult.interface";
import { findInventoryStockAdjustmentError } from "../utils/findInventoryStockAdjustmentError";
import { resolveInventoryStockAdjustmentError } from "../utils/resolveInventoryStockAdjustmentError";

export const submitInventoryStockAdjustment = async (
  input: InventoryStockAdjustmentInput
): Promise<InventoryStockAdjustmentResult> => {
  const supabase = await requireInventoryAccess();
  const validationError =
    findInventoryStockAdjustmentError(input);

  if (validationError) {
    return {
      message: validationError,
      status: INVENTORY_STOCK_ADJUSTMENT_STATUS.ERROR,
    };
  }

  const { error } = await supabase.rpc(
    SUPABASE_RPC.ADJUST_EQUIPMENT_STOCK,
    {
      p_available: input.available,
      p_category_id: input.categoryId,
      p_damaged: input.damaged,
      p_expiry_date: input.expiryDate ?? undefined,
      p_in_repair: input.inRepair,
      p_reason: input.reason,
    }
  );
  const failure = error
    ? resolveInventoryStockAdjustmentError(error)
    : undefined;

  if (failure) {
    return failure;
  }

  throwIfSupabaseError(
    error,
    "submitInventoryStockAdjustment"
  );

  return {
    status: INVENTORY_STOCK_ADJUSTMENT_STATUS.SUCCESS,
  };
};
