import { createServerSupabaseClient } from "@/app/services/supabase";
import { resolveListPageCount } from "@/app/utils/list-pagination/resolveListPageCount";
import { resolveListPageRange } from "@/app/utils/list-pagination/resolveListPageRange";
import type { StockMovementPage } from "../models/StockMovementPage.interface";
import { mapStockMovementRowToItem } from "../utils/mapStockMovementRowToItem";
import { fetchStockMovementCount } from "./fetchStockMovementCount";
import { fetchStockMovements } from "./fetchStockMovements";

export const listStockMovements = async (
  categoryId: string,
  page: number
): Promise<StockMovementPage> => {
  const supabase = await createServerSupabaseClient();

  const pageCount = resolveListPageCount(
    await fetchStockMovementCount(supabase, categoryId)
  );

  if (page > pageCount) {
    return { movements: [], pageCount };
  }

  const movementRows = await fetchStockMovements(
    supabase,
    categoryId,
    resolveListPageRange(page)
  );

  return {
    movements: movementRows.map(mapStockMovementRowToItem),
    pageCount,
  };
};
