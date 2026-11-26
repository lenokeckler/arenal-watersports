import type { NullableRef } from "@/app/types";
import type { BoardCategory } from "./BoardCategory.interface";

export interface BoardCard {
  categories: BoardCategory[];
  damagedCount: number;
  freeCount: number;
  id: string;
  imagePath: NullableRef<string>;
  inUseCount: number;
  isGrouped: boolean;
  label: string;
  maintenanceCount: number;
  targetCategoryId: string;
  totalCount: number;
}
