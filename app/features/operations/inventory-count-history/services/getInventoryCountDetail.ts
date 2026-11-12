import { UUID_PATTERN } from "@/app/constants";
import { requireInventoryAccess } from "@/app/services/operations/inventory/requireInventoryAccess";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  INVENTORY_COUNT_HISTORY_QUERY,
  INVENTORY_COUNT_LINES_SELECT,
} from "../constants/InventoryCountHistory.constants";
import type { InventoryCountDetail } from "../models/InventoryCountDetail.interface";
import { buildInventoryCountContent } from "../utils/buildInventoryCountContent";
import { buildInventoryCountDifferences } from "../utils/buildInventoryCountDifferences";
import { listInventoryCounts } from "./listInventoryCounts";

export const getInventoryCountDetail = async (
  countId: string
): Promise<InventoryCountDetail | null> => {
  if (!UUID_PATTERN.test(countId)) {
    return null;
  }

  const [summary] = (
    await listInventoryCounts({
      limit: 1,
      offset: 0,
      onlyCount: countId,
    })
  ).counts;

  if (!summary) {
    return null;
  }

  const supabase = await requireInventoryAccess();
  const { data, error } = await supabase
    .from("inventory_count_lines")
    .select(INVENTORY_COUNT_LINES_SELECT)
    .eq("count_id", countId);

  throwIfSupabaseError(
    error,
    INVENTORY_COUNT_HISTORY_QUERY.LINES
  );

  return {
    ...buildInventoryCountDifferences(data ?? []),
    categories: buildInventoryCountContent(data ?? []),
    summary,
  };
};
