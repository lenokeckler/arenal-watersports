import {
  BOARD_CATEGORY_OPERATION,
  BOARD_CATEGORY_QUERY,
} from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { BoardCategoryRow } from "./models/BoardCategoryRow.type";
import { requireBoardSupabase } from "./requireBoardSupabase";

export const readBoardCategories = async (): Promise<
  BoardCategoryRow[]
> => {
  const supabase = await requireBoardSupabase();

  const { data, error } = await supabase
    .from(BOARD_CATEGORY_QUERY.VIEW)
    .select(BOARD_CATEGORY_QUERY.PROJECTION)
    .order(BOARD_CATEGORY_QUERY.ORDER_BY, {
      ascending: true,
    });

  throwIfSupabaseError(error, BOARD_CATEGORY_OPERATION);

  return data ?? [];
};
