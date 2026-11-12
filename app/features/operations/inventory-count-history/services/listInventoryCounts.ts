import { SUPABASE_RPC } from "@/app/constants";
import { requireInventoryAccess } from "@/app/services/operations/inventory/requireInventoryAccess";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { INVENTORY_COUNT_HISTORY_QUERY } from "../constants/InventoryCountHistory.constants";
import type { InventoryCountSummary } from "../models/InventoryCountSummary.interface";
import { mapInventoryCountSummary } from "../utils/mapInventoryCountSummary";

export const listInventoryCounts = async (): Promise<
  InventoryCountSummary[]
> => {
  const supabase = await requireInventoryAccess();
  const { data, error } = await supabase.rpc(
    SUPABASE_RPC.LIST_INVENTORY_COUNTS
  );

  throwIfSupabaseError(
    error,
    INVENTORY_COUNT_HISTORY_QUERY.COUNTS
  );

  return (data ?? []).map(mapInventoryCountSummary);
};
