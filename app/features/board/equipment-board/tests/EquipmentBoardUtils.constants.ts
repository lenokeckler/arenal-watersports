import type { BoardCategoryRow } from "@/app/services/board";
import { EQUIPMENT_BOARD_PERCENT } from "../constants/EquipmentBoard.constants";
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
  category_name: BOARD_CATEGORY_NAME.KAYAK_DOUBLE,
  free_count: 3,
  group_name: BOARD_GROUP_NAME.KAYAK,
  in_use_count: 2,
  total_count: 6,
};

export const FREE_PERCENT_CASES = {
  CLAMPED_ABOVE: { freeCount: 9, totalCount: 4 },
  CLAMPED_BELOW: { freeCount: -3, totalCount: 4 },
  FULL: { freeCount: 4, totalCount: 4 },
  ROUNDED_DOWN: { freeCount: 1, totalCount: 3 },
  ROUNDED_UP: { freeCount: 2, totalCount: 3 },
  ZERO_TOTAL: { freeCount: 2, totalCount: 0 },
} as const;

export const FREE_PERCENT_EXPECTED = {
  EMPTY: 0,
  FULL: EQUIPMENT_BOARD_PERCENT.MAX,
  ROUNDED_DOWN: 33,
  ROUNDED_UP: 67,
} as const;

export const FREE_OF_TOTAL_CASES = [
  { expected: "0 / 4 libres", freeCount: 0, totalCount: 4 },
  { expected: "1 / 4 libre", freeCount: 1, totalCount: 4 },
  { expected: "9 / 9 libres", freeCount: 9, totalCount: 9 },
] as const;
