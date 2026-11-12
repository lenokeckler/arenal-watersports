import { LENGTH } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const fetchStockMovementCount = async (
  supabase: ServerSupabaseClient,
  categoryId: string
): Promise<number> => {
  const { count, error } = await supabase
    .from("equipment_stock_movements")
    .select("*", { count: "exact", head: true })
    .eq("category_id", categoryId);
  throwIfSupabaseError(error, "fetchStockMovementCount");

  return count ?? LENGTH.ZERO;
};
