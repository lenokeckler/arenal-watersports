import {
  BOARD_CATEGORY_UNITS_OPERATION,
  BOARD_CATEGORY_UNITS_QUERY,
} from "@/app/constants";
import { resolveListPageRange } from "@/app/utils/list-pagination/resolveListPageRange";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { BoardCategoryUnitRow } from "./models/BoardCategoryUnitRow.type";
import { requireBoardSupabase } from "./requireBoardSupabase";

export const readBoardCategoryUnits = async (
  categoryId: string,
  page: number
): Promise<BoardCategoryUnitRow[]> => {
  const supabase = await requireBoardSupabase();
  const { from, to } = resolveListPageRange(page);

  const { data, error } = await supabase
    .from(BOARD_CATEGORY_UNITS_QUERY.VIEW)
    .select(BOARD_CATEGORY_UNITS_QUERY.PROJECTION)
    .eq(
      BOARD_CATEGORY_UNITS_QUERY.CATEGORY_COLUMN,
      categoryId
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
