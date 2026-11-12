export interface InventoryCountSummaryRow {
  count_id: string;
  counted_at: string;
  counted_by: string;
  difference_count: number;
  notes: string | null;
  total_count: number;
}
