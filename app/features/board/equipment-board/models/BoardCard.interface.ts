import type { BoardCategory } from "./BoardCategory.interface";

export interface BoardCard {
  categories: BoardCategory[];
  freeCount: number;
  id: string;
  inUseCount: number;
  isGrouped: boolean;
  label: string;
  totalCount: number;
}
