import type { BoardCategoryRow } from "@/app/services/board";
import {
  safeNumber,
  safeString,
} from "@/app/utils/safe-value/SafeValue";
import type { BoardCategory } from "../models/BoardCategory.interface";

export const mapBoardCategoryRow = (
  row: BoardCategoryRow
): BoardCategory => ({
  damagedCount: safeNumber(row.damaged_count),
  freeCount: safeNumber(row.free_count),
  groupName: row.group_name,
  id: safeString(row.category_id),
  imagePath: row.image_path,
  inUseCount: safeNumber(row.in_use_count),
  maintenanceCount: safeNumber(row.maintenance_count),
  name: safeString(row.category_name),
  totalCount: safeNumber(row.total_count),
});
