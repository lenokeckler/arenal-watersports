import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { STOCK_EMPTY_LEVELS } from "../constants/StockEmptyLevels.constants";
import type { StockLevels } from "../models/StockLevels.interface";
import { mapStockLevelsRowToLevels } from "../utils/mapStockLevelsRowToLevels";

export const getStockLevels = async (
  categoryId: string
): Promise<StockLevels> => {
  const supabase = await createServerSupabaseClient();

  const { data: levelsRow, error } = await supabase
    .from("equipment_stock")
    .select(
      "quantity_available, quantity_damaged, quantity_in_repair, expiry_date"
    )
    .eq("category_id", categoryId)
    .maybeSingle();
  throwIfSupabaseError(error, "getStockLevels");

  return levelsRow
    ? mapStockLevelsRowToLevels(levelsRow)
    : STOCK_EMPTY_LEVELS;
};
