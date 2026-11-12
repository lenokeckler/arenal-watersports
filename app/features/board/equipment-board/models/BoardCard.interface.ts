import type { NullableRef } from "@/app/types";
import type { BoardCategory } from "./BoardCategory.interface";

export interface BoardCard {
  categories: BoardCategory[];
  freeCount: number;
  id: string;
  imagePath: NullableRef<string>;
  inUseCount: number;
  isGrouped: boolean;
  label: string;
  targetCategoryId: string;
  totalCount: number;
}
