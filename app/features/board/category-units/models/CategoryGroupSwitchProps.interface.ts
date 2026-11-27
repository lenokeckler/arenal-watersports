import type { BoardUnitFilter } from "@/app/constants";
import type { BoardCategoryIdentity } from "@/app/utils/board-categories/models/BoardCategoryIdentity.interface";

export interface CategoryGroupSwitchProps {
  currentCategoryId: string;
  filter: BoardUnitFilter;
  members: BoardCategoryIdentity[];
}
