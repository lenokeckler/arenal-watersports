import type { InventoryCountQuantityField } from "../constants/InventoryCount.constants";

export interface InventoryCountDraft {
  notes: string;
  quantities: Record<
    string,
    Record<InventoryCountQuantityField, string>
  >;
  unitStatuses: Record<string, string>;
}
