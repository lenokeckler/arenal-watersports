import type { BoardCategoryUnitRow } from "@/app/services/board";
import type { BoardCategoryIdentity } from "@/app/utils/board-categories/models/BoardCategoryIdentity.interface";

export interface CategoryUnitsContent {
  groupMembers: BoardCategoryIdentity[];
  rows: BoardCategoryUnitRow[];
}
