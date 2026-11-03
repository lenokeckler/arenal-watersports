import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import type { ListPageRange } from "@/app/utils/list-pagination/models/ListPageRange.interface";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { STOCK_MOVEMENT_ORDER } from "../constants/StockMovementOrder.constants";
import type { StockMovementRow } from "../models/StockMovementRow.type";

export const fetchStockMovements = async (
  supabase: ServerSupabaseClient,
  categoryId: string,
  range: ListPageRange
): Promise<StockMovementRow[]> => {
  const { data: movementRows, error } = await supabase
    .from("equipment_stock_movements")
    .select(
      "id, created_at, reason, from_available, to_available, from_damaged, to_damaged, from_in_repair, to_in_repair"
    )
    .eq("category_id", categoryId)
    .order(STOCK_MOVEMENT_ORDER.CREATED_AT_COLUMN, {
      ascending: false,
    })
    .order(STOCK_MOVEMENT_ORDER.ID_COLUMN, {
      ascending: false,
    })
    .range(range.from, range.to);
  throwIfSupabaseError(error, "fetchStockMovements");

  return movementRows ?? [];
};
