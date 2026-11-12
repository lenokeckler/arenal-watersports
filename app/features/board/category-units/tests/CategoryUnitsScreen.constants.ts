import { PAGINATION, PATHS } from "@/app/constants";
import type { BoardCategoryRow } from "@/app/services/board";
import { LIST_PAGINATION } from "@/app/utils/list-pagination/constants/ListPagination.constants";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";
import { CATEGORY_NAME } from "./CategoryUnits.constants";

export const CATEGORY_ID =
  "aaaaaaaa-0000-0000-0000-000000000001";

export const CATEGORY_PATH = `${PATHS.BOARD_CATEGORIES}/${CATEGORY_ID}`;

export const DEFAULT_BOARD_CATEGORY_ROW: BoardCategoryRow =
  {
    category_id: CATEGORY_ID,
    category_name: CATEGORY_NAME,
    free_count: 1,
    group_name: null,
    image_path: null,
    in_use_count: 1,
    total_count: 2,
  };

export const buildBoardCategoryRow = (
  overrides: Partial<BoardCategoryRow> = {}
): BoardCategoryRow => ({
  ...DEFAULT_BOARD_CATEGORY_ROW,
  ...overrides,
});

export const PAGE_COUNT = {
  EMPTY: 0,
  MANY: 3,
  ONE: 1,
} as const;

export const TOTAL_COUNT = {
  EMPTY: 0,
  ONE_UNIT: 1,
  SEVERAL_PAGES:
    LIST_PAGINATION.PAGE_SIZE * (PAGE_COUNT.MANY - 1) + 1,
  TWO_UNITS: 2,
} as const;

export const PAGE = {
  FIRST: 1,
  PAST_THE_END: 9,
  SECOND: 2,
} as const;

export const PAGE_PARAM = {
  ARRAY: ["2", "3"],
  INVALID: "abc",
  SECOND: "2",
} as const;

export const SECOND_PAGE_HREF = `${CATEGORY_PATH}?${PAGINATION.QUERY_PARAMS.PAGE}=${PAGE.SECOND}`;

export const FIRST_PAGE_HREF = CATEGORY_PATH;

export const LAST_PAGE_HREF = `${CATEGORY_PATH}?${PAGINATION.QUERY_PARAMS.PAGE}=${PAGE_COUNT.MANY}`;

export const PAGE_STATUS = {
  FIRST_OF_MANY: CATEGORY_UNITS_COPY.PAGINATION_PAGE_OF(
    PAGE.FIRST,
    PAGE_COUNT.MANY
  ),
  SECOND_OF_MANY: CATEGORY_UNITS_COPY.PAGINATION_PAGE_OF(
    PAGE.SECOND,
    PAGE_COUNT.MANY
  ),
} as const;

export const HEADING_LEVEL_ONE = 1;

export const NAVIGATION_SIGNAL = {
  NOT_FOUND: "NEXT_NOT_FOUND",
  REDIRECT: "NEXT_REDIRECT",
} as const;

export const READ_FAILURE_MESSAGE = "read failed";

export const TAP_TARGET_CLASS = "min-h-11 min-w-11";
