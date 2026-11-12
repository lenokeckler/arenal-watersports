import { LENGTH } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const fetchUnitCount = async (
  supabase: ServerSupabaseClient,
  categoryId: string
): Promise<number> => {
  const { count, error } = await supabase
    .from("equipment_units")
    .select("*", { count: "exact", head: true })
    .eq("category_id", categoryId);
  throwIfSupabaseError(error, "fetchUnitCount");

  return count ?? LENGTH.ZERO;
};
