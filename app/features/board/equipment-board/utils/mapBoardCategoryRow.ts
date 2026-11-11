import type { BoardCategoryRow } from "@/app/services/board";
import {
  safeNumber,
  safeString,
} from "@/app/utils/safe-value/SafeValue";
import type { BoardCategory } from "../models/BoardCategory.interface";

export const mapBoardCategoryRow = (
  row: BoardCategoryRow
): BoardCategory => ({
  freeCount: safeNumber(row.free_count),
  groupName: row.group_name,
  id: safeString(row.category_id),
  inUseCount: safeNumber(row.in_use_count),
  name: safeString(row.category_name),
  totalCount: safeNumber(row.total_count),
});
