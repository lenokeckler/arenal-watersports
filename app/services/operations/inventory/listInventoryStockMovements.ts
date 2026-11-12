import { PAGINATION, SUPABASE_RPC } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { InventoryStockMovementPage } from "./models/InventoryStockMovementPage.interface";

export const listInventoryStockMovements = async (
  supabase: Awaited<
    ReturnType<typeof createServerSupabaseClient>
  >,
  categoryId: string,
  pageIndex: number
): Promise<InventoryStockMovementPage> => {
  const { data, error } = await supabase.rpc(
    SUPABASE_RPC.LIST_OPERATIONS_STOCK_MOVEMENTS,
    {
      p_category_id: categoryId,
      p_page_index: pageIndex,
      p_page_size: PAGINATION.DEFAULT_PAGE_SIZE,
    }
  );

  throwIfSupabaseError(
    error,
    "listInventoryStockMovements"
  );

  const rows = data ?? [];
  const firstRow = rows[0];
  const totalCount =
    firstRow?.total_count ?? PAGINATION.ZERO_RESULTS;

  return {
    items: rows.map((row) => ({
      actorName: row.actor_name,
      availableFrom: row.from_available,
      availableTo: row.to_available,
      createdAt: row.moved_at,
      damagedFrom: row.from_damaged,
      damagedTo: row.to_damaged,
      id: row.movement_id,
      inRepairFrom: row.from_in_repair,
      inRepairTo: row.to_in_repair,
      reason: row.reason,
    })),
    pageIndex:
      firstRow?.page_index ?? PAGINATION.DEFAULT_PAGE,
    pageCount: Math.max(
      PAGINATION.ONE_PAGE,
      Math.ceil(totalCount / PAGINATION.DEFAULT_PAGE_SIZE)
    ),
    totalCount,
  };
};
