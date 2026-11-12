import type { BoardCategoryIdentity } from "@/app/utils/board-categories/models/BoardCategoryIdentity.interface";

export interface CategoryGroupSwitchProps {
  currentCategoryId: string;
  members: BoardCategoryIdentity[];
}
