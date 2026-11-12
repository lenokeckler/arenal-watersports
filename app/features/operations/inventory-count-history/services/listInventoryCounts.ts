import { SUPABASE_RPC } from "@/app/constants";
import { requireInventoryAccess } from "@/app/services/operations/inventory/requireInventoryAccess";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { INVENTORY_COUNT_HISTORY_QUERY } from "../constants/InventoryCountHistory.constants";
import type { InventoryCountsPage } from "../models/InventoryCountsPage.interface";
import type { InventoryCountsRequest } from "../models/InventoryCountsRequest.interface";
import { mapInventoryCountSummary } from "../utils/mapInventoryCountSummary";

export const listInventoryCounts = async ({
  limit,
  offset,
  onlyCount,
}: InventoryCountsRequest): Promise<InventoryCountsPage> => {
  const supabase = await requireInventoryAccess();
  const { data, error } = await supabase.rpc(
    SUPABASE_RPC.LIST_INVENTORY_COUNTS,
    {
      only_count: onlyCount,
      page_limit: limit,
      page_offset: offset,
    }
  );

  throwIfSupabaseError(
    error,
    INVENTORY_COUNT_HISTORY_QUERY.COUNTS
  );

  const rows = data ?? [];

  return {
    counts: rows.map(mapInventoryCountSummary),
    totalCount: rows[0]?.total_count ?? 0,
  };
};
