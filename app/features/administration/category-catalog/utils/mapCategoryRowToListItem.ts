import { LENGTH } from "@/app/constants";
import type { CategoryListItem } from "../models/CategoryListItem.interface";
import type { CategoryListSources } from "../models/CategoryListSources.interface";
import type { EquipmentCategoryRow } from "../models/EquipmentCategoryRow.type";

export const mapCategoryRowToListItem = (
  categoryRow: EquipmentCategoryRow,
  sources: CategoryListSources
): CategoryListItem => ({
  id: categoryRow.id,
  name: categoryRow.name,
  status: categoryRow.status,
  trackingMode: categoryRow.tracking_mode,
  groupName: categoryRow.group_name,
  currentQuantity:
    sources.quantityByCategoryId.get(categoryRow.id) ??
    LENGTH.ZERO,
  hasRecords: sources.categoryIdsWithRecords.has(
    categoryRow.id
  ),
});
