import type { BoardCategoryRow } from "../models/BoardCategoryRow.type";

export const BOARD_SERVICE_USER = {
  id: "11111111-0000-0000-0000-000000000001",
};

export const BOARD_SERVICE_REDIRECT_SIGNAL =
  "Board test redirect signal.";

export const BOARD_SERVICE_ROW: BoardCategoryRow = {
  category_id: "aaaaaaaa-0000-0000-0000-000000000001",
  category_name: "Kayak doble",
  free_count: 2,
  group_name: "Kayak",
  in_use_count: 1,
  total_count: 4,
};

export const BOARD_SERVICE_RESULT = {
  data: [BOARD_SERVICE_ROW],
  error: null,
};

export const BOARD_SERVICE_EMPTY_RESULT = {
  data: null,
  error: null,
};

export const BOARD_SERVICE_POSTGREST_ERROR = {
  code: "42501",
  details: "",
  hint: "",
  message: "permission denied",
};
