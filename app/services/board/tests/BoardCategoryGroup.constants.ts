import type { BoardCategoryRow } from "../models/BoardCategoryRow.type";
import { BOARD_SERVICE_ROW } from "./BoardCategories.constants";

export const GROUP_CATEGORY_ID = {
  KAYAK_DOUBLE: "aaaaaaaa-0000-0000-0000-000000000011",
  KAYAK_INDIVIDUAL: "aaaaaaaa-0000-0000-0000-000000000012",
  KAYAK_TRIPLE: "aaaaaaaa-0000-0000-0000-000000000013",
  PADDLE_BOARD: "aaaaaaaa-0000-0000-0000-000000000014",
  TOUR: "aaaaaaaa-0000-0000-0000-000000000015",
} as const;

export const GROUP_INVALID_CATEGORY_ID =
  "not-a-category-id";

export const GROUP_UNKNOWN_CATEGORY_ID =
  "aaaaaaaa-0000-0000-0000-0000000000ff";

const buildGroupRow = (
  overrides: Partial<BoardCategoryRow>
): BoardCategoryRow => ({
  ...BOARD_SERVICE_ROW,
  ...overrides,
});

export const KAYAK_DOUBLE_ROW = buildGroupRow({
  category_id: GROUP_CATEGORY_ID.KAYAK_DOUBLE,
  category_name: "Kayak doble",
  group_name: "Kayak",
});

export const KAYAK_INDIVIDUAL_ROW = buildGroupRow({
  category_id: GROUP_CATEGORY_ID.KAYAK_INDIVIDUAL,
  category_name: "Kayak individual",
  group_name: "kayak",
});

export const KAYAK_TRIPLE_ROW = buildGroupRow({
  category_id: GROUP_CATEGORY_ID.KAYAK_TRIPLE,
  category_name: "Kayak triple",
  group_name: "KAYAK",
});

export const PADDLE_BOARD_ROW = buildGroupRow({
  category_id: GROUP_CATEGORY_ID.PADDLE_BOARD,
  category_name: "Paddleboard",
  group_name: "Paddle",
});

export const UNGROUPED_ROW = buildGroupRow({
  category_id: GROUP_CATEGORY_ID.TOUR,
  category_name: "Tour",
  group_name: null,
});

export const BLANK_GROUP_ROW = buildGroupRow({
  category_id: GROUP_CATEGORY_ID.TOUR,
  category_name: "Tour",
  group_name: "   ",
});

export const GROUP_BOARD_ROWS = [
  KAYAK_INDIVIDUAL_ROW,
  PADDLE_BOARD_ROW,
  KAYAK_TRIPLE_ROW,
  UNGROUPED_ROW,
  KAYAK_DOUBLE_ROW,
];

export const EXPECTED_KAYAK_MEMBERS = [
  {
    id: GROUP_CATEGORY_ID.KAYAK_DOUBLE,
    name: "Kayak doble",
  },
  {
    id: GROUP_CATEGORY_ID.KAYAK_INDIVIDUAL,
    name: "Kayak individual",
  },
  {
    id: GROUP_CATEGORY_ID.KAYAK_TRIPLE,
    name: "Kayak triple",
  },
];
