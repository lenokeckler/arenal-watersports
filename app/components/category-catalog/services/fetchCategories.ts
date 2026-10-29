import { LENGTH } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { CategoryListPageRange } from "../models/CategoryListPageRange.interface";
import type { CategoryRowsPage } from "../models/CategoryRowsPage.interface";

export const fetchCategories = async (
  supabase: ServerSupabaseClient,
  range: CategoryListPageRange
): Promise<CategoryRowsPage> => {
  const {
    data: categoryRows,
    error: categoryRowsError,
    count,
  } = await supabase
    .from("equipment_categories")
    .select("*", { count: "exact" })
    .order("name", { ascending: true })
    .range(range.from, range.to);
  throwIfSupabaseError(
    categoryRowsError,
    "fetchCategories"
  );

  return {
    rows: categoryRows ?? [],
    totalCount: count ?? LENGTH.ZERO,
  };
};
