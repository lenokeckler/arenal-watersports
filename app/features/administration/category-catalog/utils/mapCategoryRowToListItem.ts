import { LENGTH, STRING } from "@/app/constants";
import { safeString } from "@/app/utils/safe-value/SafeValue";
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
  hasImage:
    safeString(categoryRow.image_path) !== STRING.Empty,
  isReservable: categoryRow.is_reservable,
  hasRecords: sources.categoryIdsWithRecords.has(
    categoryRow.id
  ),
});
