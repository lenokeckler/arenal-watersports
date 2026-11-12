export interface InventoryCountCategoryRow {
  id: string;
  name: string;
  stock: {
    quantity_available: number;
    quantity_damaged: number;
    quantity_in_repair: number;
  } | null;
  tracking_mode: string;
  units: { code: string; id: string; status: string }[];
}
