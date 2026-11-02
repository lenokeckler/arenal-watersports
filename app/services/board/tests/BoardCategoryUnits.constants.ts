import { resolveListPageRange } from "@/app/utils/list-pagination/resolveListPageRange";
import type { BoardCategoryUnitRow } from "../models/BoardCategoryUnitRow.type";

export const BOARD_UNITS_CATEGORY_ID =
  "aaaaaaaa-0000-0000-0000-000000000001";

export const BOARD_UNITS_INVALID_CATEGORY_ID =
  "not-a-category-id";

export const BOARD_UNITS_SECOND_PAGE = 2;

export const BOARD_UNITS_SECOND_PAGE_RANGE =
  resolveListPageRange(BOARD_UNITS_SECOND_PAGE);

export const BOARD_UNITS_ROW: BoardCategoryUnitRow = {
  category_id: BOARD_UNITS_CATEGORY_ID,
  customer_name: "Ana Mora",
  effective_status: "occupied",
  reservation_code: "R-000123",
  reservation_ends_at: "2026-11-01T16:00:00+00:00",
  reservation_id: "cccccccc-0000-0000-0000-000000000001",
  reservation_starts_at: "2026-11-01T14:00:00+00:00",
  returns_at: "2026-11-01T16:00:00+00:00",
  unit_code: "JS-01",
  unit_id: "bbbbbbbb-0000-0000-0000-000000000001",
};

export const BOARD_UNITS_RESULT = {
  data: [BOARD_UNITS_ROW],
  error: null,
};

export const BOARD_UNITS_EMPTY_RESULT = {
  data: null,
  error: null,
};
