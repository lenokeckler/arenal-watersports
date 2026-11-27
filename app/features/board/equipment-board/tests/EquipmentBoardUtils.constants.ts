import type { BoardCategoryRow } from "@/app/services/board";
import type { BoardCategory } from "../models/BoardCategory.interface";

export const DEFAULT_BOARD_CATEGORY: BoardCategory = {
  freeCount: 2,
  groupName: null,
  id: "category-default",
  imagePath: null,
  inUseCount: 1,
  maintenanceCount: 0,
  damagedCount: 0,
  name: "Jet ski",
  totalCount: 4,
};

export const BOARD_GROUP_NAME = {
  BLANK: "   ",
  KAYAK: "Kayak",
  KAYAK_LOWER: "kayak",
  PADDLE: "Paddle",
} as const;

export const BOARD_CATEGORY_NAME = {
  KAYAK_INDIVIDUAL: "Kayak individual",
  KAYAK_DOUBLE: "Kayak doble",
  PADDLE_BOARD: "Paddle board",
  TOUR: "Tour",
} as const;

export const NULL_BOARD_CATEGORY_ROW = {
  category_id: null,
  category_name: null,
  free_count: null,
  group_name: null,
  image_path: null,
  in_use_count: null,
  maintenance_count: null,
  damaged_count: null,
  total_count: null,
} as unknown as BoardCategoryRow;

export const FILLED_BOARD_CATEGORY_ROW: BoardCategoryRow = {
  category_id: "category-filled",
  category_name: BOARD_CATEGORY_NAME.KAYAK_DOUBLE,
  free_count: 3,
  group_name: BOARD_GROUP_NAME.KAYAK,
  image_path: null,
  in_use_count: 2,
  maintenance_count: 0,
  damaged_count: 0,
  total_count: 6,
};

export const FREE_OF_TOTAL_CASES = [
  { expected: "0 / 4 libres", freeCount: 0, totalCount: 4 },
  { expected: "1 / 4 libre", freeCount: 1, totalCount: 4 },
  { expected: "9 / 9 libres", freeCount: 9, totalCount: 9 },
] as const;
