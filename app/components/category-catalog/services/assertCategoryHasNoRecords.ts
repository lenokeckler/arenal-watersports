import type { ServiceRoleSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { LENGTH } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export class CategoryHasRecordsError extends Error {}

export const assertCategoryHasNoRecords = async (
  supabase: ServiceRoleSupabaseClient,
  categoryId: string
): Promise<void> => {
  const [unitsResult, stockResult] = await Promise.all([
    supabase
      .from("equipment_units")
      .select("id")
      .eq("category_id", categoryId),
    supabase
      .from("equipment_stock")
      .select("category_id")
      .eq("category_id", categoryId),
  ]);
  throwIfSupabaseError(
    unitsResult.error,
    "assertCategoryHasNoRecords.units"
  );
  throwIfSupabaseError(
    stockResult.error,
    "assertCategoryHasNoRecords.stock"
  );

  const hasUnits =
    (unitsResult.data ?? []).length > LENGTH.ZERO;
  const hasStock =
    (stockResult.data ?? []).length > LENGTH.ZERO;

  if (hasUnits || hasStock) {
    throw new CategoryHasRecordsError();
  }
};
