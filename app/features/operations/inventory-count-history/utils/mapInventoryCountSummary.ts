import type { InventoryCountSummary } from "../models/InventoryCountSummary.interface";
import type { InventoryCountSummaryRow } from "../models/InventoryCountSummaryRow.interface";

export const mapInventoryCountSummary = (
  row: InventoryCountSummaryRow
): InventoryCountSummary => ({
  categoryCount: row.category_count,
  countedAt: row.counted_at,
  countedBy: row.counted_by,
  differenceCount: row.difference_count,
  id: row.count_id,
  notes: row.notes,
  unitCount: row.unit_count,
});
