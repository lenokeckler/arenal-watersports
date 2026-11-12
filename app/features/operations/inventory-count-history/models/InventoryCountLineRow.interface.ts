export interface InventoryCountLineRow {
  category: { name: string } | null;
  confirmed_status: string | null;
  quantity_available: number | null;
  quantity_damaged: number | null;
  quantity_in_repair: number | null;
  system_quantity_available: number | null;
  system_quantity_damaged: number | null;
  system_quantity_in_repair: number | null;
  system_status: string | null;
  unit: { code: string } | null;
  unit_id: string | null;
}
