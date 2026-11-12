import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { StockCategory } from "../models/StockCategory.interface";
import { mapStockCategoryRowToCategory } from "../utils/mapStockCategoryRowToCategory";

export const getStockCategory = async (
  categoryId: string
): Promise<NullableRef<StockCategory>> => {
  const supabase = await createServerSupabaseClient();

  const { data: categoryRow, error } = await supabase
    .from("equipment_categories")
    .select("id, name, tracking_mode, alert_expiry_days")
    .eq("id", categoryId)
    .maybeSingle();
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ) {
    return null;
  }
  throwIfSupabaseError(error, "getStockCategory");

  return categoryRow
    ? mapStockCategoryRowToCategory(categoryRow)
    : null;
};
