import {
  BOARD_CATEGORY_DETAIL_OPERATION,
  BOARD_CATEGORY_QUERY,
  UUID_PATTERN,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { BoardCategoryRow } from "./models/BoardCategoryRow.type";
import { requireBoardSupabase } from "./requireBoardSupabase";

export const readBoardCategory = async (
  categoryId: string
): Promise<NullableRef<BoardCategoryRow>> => {
  if (!UUID_PATTERN.test(categoryId)) {
    return null;
  }

  const supabase = await requireBoardSupabase();

  const { data, error } = await supabase
    .from(BOARD_CATEGORY_QUERY.VIEW)
    .select(BOARD_CATEGORY_QUERY.PROJECTION)
    .eq(BOARD_CATEGORY_QUERY.CATEGORY_ID_COLUMN, categoryId)
    .maybeSingle();

  throwIfSupabaseError(
    error,
    BOARD_CATEGORY_DETAIL_OPERATION
  );

  return data;
};
