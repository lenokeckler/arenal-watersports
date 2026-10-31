import type { CategoryListItem } from "../models/CategoryListItem.interface";
import type { EquipmentCategoryRow } from "../models/EquipmentCategoryRow.type";

export const mapCategoryRowToListItem = (
  categoryRow: EquipmentCategoryRow,
  categoryIdsWithRecords: Set<string>
): CategoryListItem => ({
  id: categoryRow.id,
  name: categoryRow.name,
  status: categoryRow.status,
  trackingMode: categoryRow.tracking_mode,
  groupName: categoryRow.group_name,
  hasRecords: categoryIdsWithRecords.has(categoryRow.id),
});
