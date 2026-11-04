import { LENGTH } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const fetchCategoryCount = async (
  supabase: ServerSupabaseClient
): Promise<number> => {
  const { count, error } = await supabase
    .from("equipment_categories")
    .select("*", { count: "exact", head: true });
  throwIfSupabaseError(error, "fetchCategoryCount");

  return count ?? LENGTH.ZERO;
};
