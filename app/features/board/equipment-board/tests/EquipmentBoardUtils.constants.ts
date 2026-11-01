import type { BoardCategoryRow } from "@/app/services/board";
import type { BoardCategory } from "../models/BoardCategory.interface";

export const DEFAULT_BOARD_CATEGORY: BoardCategory = {
  freeCount: 2,
  groupName: null,
  id: "category-default",
  inUseCount: 1,
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

export const NULL_BOARD_CATEGORY_ROW: BoardCategoryRow = {
  category_id: null,
  category_name: null,
  free_count: null,
  group_name: null,
  in_use_count: null,
  total_count: null,
};

export const FILLED_BOARD_CATEGORY_ROW: BoardCategoryRow = {
  category_id: "category-filled",
  category_name: "Kayak doble",
  free_count: 3,
  group_name: "Kayak",
  in_use_count: 2,
  total_count: 6,
};

export const OCCUPANCY_CASES = {
  CLAMPED_ABOVE: { inUse: 9, total: 4 },
  CLAMPED_BELOW: { inUse: -3, total: 4 },
  FULL: { inUse: 4, total: 4 },
  ROUNDED_DOWN: { inUse: 1, total: 3 },
  ROUNDED_UP: { inUse: 2, total: 3 },
  ZERO_TOTAL: { inUse: 2, total: 0 },
} as const;

export const OCCUPANCY_EXPECTED = {
  EMPTY: 0,
  FULL: 100,
  ROUNDED_DOWN: 33,
  ROUNDED_UP: 67,
} as const;
