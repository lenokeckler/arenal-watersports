import {
  DISPATCH_CATEGORY_IMAGE_QUERY,
  DISPATCH_SHEET_ERROR,
} from "@/app/components/dispatch-board/constants/DispatchSheet.constants";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { PendingDispatchSupabaseClient } from "./models/PendingDispatchSupabaseClient.type";

export const readDispatchCategoryImages = async (
  supabase: PendingDispatchSupabaseClient,
  categoryIds: string[]
): Promise<Map<string, NullableRef<string>>> => {
  if (categoryIds.length === 0) {
    return new Map();
  }

  const { data, error } = await supabase
    .from(DISPATCH_CATEGORY_IMAGE_QUERY.TABLE)
    .select(DISPATCH_CATEGORY_IMAGE_QUERY.PROJECTION)
    .in(
      DISPATCH_CATEGORY_IMAGE_QUERY.ID_COLUMN,
      categoryIds
    );
  throwIfSupabaseError(
    error,
    DISPATCH_SHEET_ERROR.LOAD_IMAGES
  );

  const imagePaths = new Map<string, NullableRef<string>>();

  for (const row of data ?? []) {
    if (row.category_id !== null) {
      imagePaths.set(row.category_id, row.image_path);
    }
  }

  return imagePaths;
};
