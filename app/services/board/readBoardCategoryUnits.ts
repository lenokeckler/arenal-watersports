import {
  BOARD_CATEGORY_UNITS_OPERATION,
  BOARD_CATEGORY_UNITS_QUERY,
  BOARD_UNIT_FILTER,
  BOARD_UNIT_FILTER_STATUSES,
  LENGTH,
  type BoardUnitFilter,
} from "@/app/constants";
import { resolveListPageRange } from "@/app/utils/list-pagination/resolveListPageRange";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { BoardCategoryUnitRow } from "./models/BoardCategoryUnitRow.type";
import { requireBoardSupabase } from "./requireBoardSupabase";

export const readBoardCategoryUnits = async (
  categoryId: string,
  page: number,
  filter: BoardUnitFilter = BOARD_UNIT_FILTER.ALL
): Promise<BoardCategoryUnitRow[]> => {
  const supabase = await requireBoardSupabase();
  const { from, to } = resolveListPageRange(page);
  const statuses = BOARD_UNIT_FILTER_STATUSES[filter];

  const query = supabase
    .from(BOARD_CATEGORY_UNITS_QUERY.VIEW)
    .select(BOARD_CATEGORY_UNITS_QUERY.PROJECTION)
    .eq(
      BOARD_CATEGORY_UNITS_QUERY.CATEGORY_COLUMN,
      categoryId
    );

  const { data, error } = await (
    statuses.length > LENGTH.ZERO
      ? query.in(BOARD_CATEGORY_UNITS_QUERY.STATUS_COLUMN, [
          ...statuses,
        ])
      : query
  )
    .order(BOARD_CATEGORY_UNITS_QUERY.ORDER_BY_CODE, {
      ascending: true,
    })
    .order(BOARD_CATEGORY_UNITS_QUERY.ORDER_BY_ID, {
      ascending: true,
    })
    .range(from, to);

  throwIfSupabaseError(
    error,
    BOARD_CATEGORY_UNITS_OPERATION
  );

  return data ?? [];
};
