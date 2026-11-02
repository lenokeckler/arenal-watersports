import { redirect } from "next/navigation";
import {
  BOARD_CATEGORY_OPERATION,
  BOARD_CATEGORY_QUERY,
  PATHS,
} from "@/app/constants";
import { readSignedInUserId } from "@/app/services/authentication/readSignedInUserId";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { BoardCategoryRow } from "./models/BoardCategoryRow.type";

export const readBoardCategories = async (): Promise<
  BoardCategoryRow[]
> => {
  const supabase = await createServerSupabaseClient();
  const userId = await readSignedInUserId(supabase);

  if (!userId) {
    redirect(PATHS.ACCESS.LOGIN);
  }

  const { data, error } = await supabase
    .from(BOARD_CATEGORY_QUERY.VIEW)
    .select(BOARD_CATEGORY_QUERY.PROJECTION)
    .order(BOARD_CATEGORY_QUERY.ORDER_BY, {
      ascending: true,
    });

  throwIfSupabaseError(error, BOARD_CATEGORY_OPERATION);

  return data ?? [];
};
