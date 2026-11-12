import { LENGTH } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const fetchCategoryQuantities = async (
  supabase: ServerSupabaseClient,
  categoryIds: string[]
): Promise<Map<string, number>> => {
  const quantityByCategoryId = new Map<string, number>();

  if (categoryIds.length === LENGTH.ZERO) {
    return quantityByCategoryId;
  }

  const { data: quantityRows, error: quantityRowsError } =
    await supabase
      .from("category_current_quantity")
      .select("category_id, current_quantity")
      .in("category_id", categoryIds);
  throwIfSupabaseError(
    quantityRowsError,
    "fetchCategoryQuantities"
  );

  for (const quantityRow of quantityRows ?? []) {
    if (quantityRow.category_id !== null) {
      quantityByCategoryId.set(
        quantityRow.category_id,
        quantityRow.current_quantity ?? LENGTH.ZERO
      );
    }
  }

  return quantityByCategoryId;
};
