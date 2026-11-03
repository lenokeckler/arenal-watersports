import { UUID_PATTERN } from "@/app/constants";
import { compareBoardCategories } from "@/app/utils/board-categories/compareBoardCategories";
import type { BoardCategoryIdentity } from "@/app/utils/board-categories/models/BoardCategoryIdentity.interface";
import { resolveBoardGroupKey } from "@/app/utils/board-categories/resolveBoardGroupKey";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { BoardCategoryRow } from "./models/BoardCategoryRow.type";
import { readBoardCategories } from "./readBoardCategories";

const toBoardCategoryIdentity = (
  row: BoardCategoryRow
): BoardCategoryIdentity => ({
  id: safeString(row.category_id),
  name: safeString(row.category_name),
});

export const readBoardCategoryGroup = async (
  categoryId: string
): Promise<BoardCategoryIdentity[]> => {
  if (!UUID_PATTERN.test(categoryId)) {
    return [];
  }

  const rows = await readBoardCategories();
  const current = rows.find(
    (row) => row.category_id === categoryId
  );

  if (!current) {
    return [];
  }

  const groupKey = resolveBoardGroupKey(current.group_name);

  if (!groupKey) {
    return [];
  }

  return rows
    .filter(
      (row) =>
        resolveBoardGroupKey(row.group_name) === groupKey
    )
    .map(toBoardCategoryIdentity)
    .sort(compareBoardCategories);
};
